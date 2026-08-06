import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ── Email templates ────────────────────────────────────────────────────────────

function contactEmail(d: Record<string, string>) {
  return {
    subject: `New enquiry from ${d.name}`,
    html: `
      <h2 style="font-family:sans-serif">New contact form submission</h2>
      <table style="font-family:sans-serif;border-collapse:collapse;width:100%;max-width:560px">
        <tr><td style="padding:8px 0;color:#666;width:160px">Name</td><td style="padding:8px 0"><strong>${d.name}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#666">Brand / Company</td><td style="padding:8px 0">${d.brandCompany || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${d.email}">${d.email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#666">Phone</td><td style="padding:8px 0">${d.phone || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Service interest</td><td style="padding:8px 0">${d.serviceInterest || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#666;vertical-align:top">Message</td><td style="padding:8px 0">${d.message}</td></tr>
      </table>
    `,
  };
}

function discoveryEmail(d: Record<string, string>) {
  return {
    subject: `New discovery request from ${d.fullName}`,
    html: `
      <h2 style="font-family:sans-serif">New discovery session request</h2>
      <table style="font-family:sans-serif;border-collapse:collapse;width:100%;max-width:560px">
        <tr><td style="padding:8px 0;color:#666;width:180px">Name</td><td style="padding:8px 0"><strong>${d.fullName}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#666">Organisation</td><td style="padding:8px 0">${d.organisation || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${d.email}">${d.email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#666">Phone</td><td style="padding:8px 0">${d.phone || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Service of interest</td><td style="padding:8px 0">${d.serviceOfInterest || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Project type</td><td style="padding:8px 0">${d.projectType || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Preferred date</td><td style="padding:8px 0">${d.preferredDate || '—'} ${d.timeOfDay ? `(${d.timeOfDay})` : ''}</td></tr>
        <tr><td style="padding:8px 0;color:#666;vertical-align:top">Project description</td><td style="padding:8px 0">${d.projectDescription}</td></tr>
      </table>
    `,
  };
}

function downloadEmail(d: Record<string, string>) {
  return {
    subject: `Template download — ${d.email}`,
    html: `
      <h2 style="font-family:sans-serif">Template download lead</h2>
      <table style="font-family:sans-serif;border-collapse:collapse;width:100%;max-width:560px">
        <tr><td style="padding:8px 0;color:#666;width:160px">Email</td><td style="padding:8px 0"><a href="mailto:${d.email}">${d.email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#666">Resource</td><td style="padding:8px 0">${d.resourceSlug || '—'}</td></tr>
      </table>
    `,
  };
}

// ── Table map ──────────────────────────────────────────────────────────────────

const TABLE: Record<string, string> = {
  contact: 'contact_submissions',
  discovery: 'discovery_requests',
  download: 'download_leads',
};

const EMAIL_FN: Record<string, (d: Record<string, string>) => { subject: string; html: string }> = {
  contact: contactEmail,
  discovery: discoveryEmail,
  download: downloadEmail,
};

// ── Handler ────────────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  try {
    const { type, data } = await req.json() as { type: string; data: Record<string, string> };

    if (!TABLE[type]) {
      return new Response(JSON.stringify({ error: 'Invalid form type' }), {
        status: 400,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    // Insert to Supabase (service role bypasses RLS)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    const { error: dbError } = await supabase.from(TABLE[type]).insert(data);
    if (dbError) throw dbError;

    // Send notification email via Resend
    const { subject, html } = EMAIL_FN[type](data);
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      },
      body: JSON.stringify({
        from: 'Konten Site <noreply@konten.agency>',
        to: ['sales@konten.agency'],
        subject,
        html,
      }),
    });
    if (!emailRes.ok) {
      console.error('Resend error:', await emailRes.text());
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
});
