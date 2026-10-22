// Vercel serverless function: POST /api/discovery
// Receives the Film Discovery Questionnaire and forwards it to the Google Apps Script
// web app that appends a row to the Konten "Film Discovery" Google Sheet.
//
// Environment variables (Vercel → Project konten-lr → Settings → Environment Variables):
//   DISCOVERY_SHEET_WEBHOOK_URL — the Apps Script web app URL (ends in /exec)
//   DISCOVERY_SHEET_SECRET      — the same secret string set in the Apps Script

const MAX_FIELD = 5000;
const REQUIRED = ["org_name", "contact_name", "idea_sentence", "one_message"];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const url = process.env.DISCOVERY_SHEET_WEBHOOK_URL;
  const secret = process.env.DISCOVERY_SHEET_SECRET;
  if (!url || !secret) {
    console.error("Discovery form: missing DISCOVERY_SHEET_WEBHOOK_URL or DISCOVERY_SHEET_SECRET");
    return res.status(500).json({ ok: false, error: "Form is not configured" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ ok: false, error: "Invalid JSON" }); }
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ ok: false, error: "Invalid body" });
  }

  // Honeypot: bots fill the hidden "website" field. Pretend success, store nothing.
  if (body.website) return res.status(200).json({ ok: true });
  delete body.website;

  for (const k of REQUIRED) {
    if (!String(body[k] ?? "").trim()) return res.status(400).json({ ok: false, error: `Missing ${k}` });
  }

  // Keep only plain values, trim very long text.
  const data = {};
  for (const [k, v] of Object.entries(body)) {
    if (!/^[a-z_]{1,40}$/.test(k)) continue;
    if (typeof v === "number" || typeof v === "boolean") data[k] = v;
    else if (typeof v === "string") data[k] = v.slice(0, MAX_FIELD);
  }
  data.submitted_at = new Date().toISOString();

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, data }),
      redirect: "follow",
    });
    const text = await r.text();
    let json = null;
    try { json = JSON.parse(text); } catch { /* not JSON */ }
    if (!r.ok || !json?.ok) {
      console.error("Discovery form: sheet rejected the row", r.status, text.slice(0, 300));
      return res.status(502).json({ ok: false, error: "Could not save" });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Discovery form: request to sheet failed", err);
    return res.status(502).json({ ok: false, error: "Could not save" });
  }
}
