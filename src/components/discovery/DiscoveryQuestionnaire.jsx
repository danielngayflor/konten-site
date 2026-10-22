// Konten LR — Film Discovery Questionnaire
// Typeform-style: one question per screen, Enter to continue, letter keys for choices.
// Stack: React + Tailwind (v4). No other dependencies.
//
// Props:
//   endpoint  — where answers are POSTed as JSON (default "/api/discovery").
//               Pass null to run in preview mode (submit is simulated).
//   onExit    — optional; called from the thank-you screen's "Back to konten.agency" button.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WELCOME, THANKS, STEPS, PERSON_FIELDS, toSheetRow } from "./discoveryQuestions";

const DRAFT_KEY = "konten-discovery-draft-v1";
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const loadDraft = () => {
  try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || "null"); } catch { return null; }
};
const saveDraft = (d) => { try { localStorage.setItem(DRAFT_KEY, JSON.stringify(d)); } catch { /* storage unavailable */ } };
const clearDraft = () => { try { localStorage.removeItem(DRAFT_KEY); } catch { /* storage unavailable */ } };

export default function DiscoveryQuestionnaire({ endpoint = "/api/discovery", onExit }) {
  const draft = useMemo(loadDraft, []);
  const [answers, setAnswers] = useState(() => draft?.answers || { storyholders: [{}] });
  const [index, setIndex] = useState(-1); // -1 welcome · 0..n-1 steps · n thanks
  const [dir, setDir] = useState(1);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const stageRef = useRef(null);
  const autoTimer = useRef(null);

  const total = STEPS.length;
  const step = index >= 0 && index < total ? STEPS[index] : null;
  const isLast = index === total - 1;

  // Question numbers skip statement screens.
  const numbers = useMemo(() => {
    let n = 0;
    return STEPS.map((s) => (s.type === "statement" ? null : ++n));
  }, []);
  const questionCount = numbers.filter(Boolean).length;
  const progress = index < 0 ? 0 : index >= total ? 100 : Math.round(((numbers.slice(0, index + 1).filter(Boolean).length) / questionCount) * 100);

  useEffect(() => { if (index < total) saveDraft({ answers }); }, [answers, index, total]);

  const set = useCallback((id, value) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    setError("");
  }, []);

  // Focus the first field whenever the screen changes.
  useEffect(() => {
    const s = STEPS[index];
    const t = setTimeout(() => {
      // On choice screens, focus the screen itself so letter keys pick options.
      if (s && (s.type === "single" || s.type === "multi")) { stageRef.current?.focus({ preventScroll: true }); return; }
      const el = stageRef.current?.querySelector("[data-autofocus], input:not([type=hidden]):not([tabindex='-1']), textarea, button[data-primary]");
      el?.focus({ preventScroll: true });
    }, 360);
    return () => clearTimeout(t);
  }, [index]);

  const validate = (s) => {
    if (!s) return "";
    if (s.type === "group") {
      for (const f of s.fields) {
        const v = (answers[f.id] || "").trim();
        if (f.required && !v) return `Please add ${f.label.toLowerCase()}.`;
        if (f.type === "email" && v && !EMAIL_RE.test(v)) return "That email address doesn't look right.";
      }
      return "";
    }
    if (s.type === "email" && answers[s.id] && !EMAIL_RE.test(answers[s.id])) return "That email address doesn't look right.";
    if (s.required) {
      const v = answers[s.id];
      const empty = Array.isArray(v) ? v.length === 0 && !answers[s.id + "_other"] : !String(v || "").trim();
      if (empty) return "Please fill this in.";
    }
    return "";
  };

  const go = (to) => {
    clearTimeout(autoTimer.current);
    setDir(to > index ? 1 : -1);
    setError("");
    setIndex(Math.max(-1, Math.min(total, to)));
  };

  const next = async () => {
    if (index < 0) return go(0);
    const msg = validate(step);
    if (msg) {
      setError(msg);
      stageRef.current?.querySelector("input, textarea, select, [data-autofocus]")?.focus({ preventScroll: true });
      return;
    }
    if (!isLast) return go(index + 1);
    // Submit
    for (let i = 0; i < total; i++) {
      const m = validate(STEPS[i]);
      if (m) { go(i); setTimeout(() => setError(m), 0); return; }
    }
    setSending(true); setSendError("");
    try {
      const row = toSheetRow(answers);
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...row, website: honeypot }),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json.ok) throw new Error("send failed");
      } else {
        await new Promise((r) => setTimeout(r, 900));
      }
      clearDraft();
      go(total);
    } catch {
      setSendError("We couldn't send your answers. Check your connection and try again. If it keeps failing, email contact@konten.agency.");
    } finally {
      setSending(false);
    }
  };

  // Keyboard: Enter continues (Shift+Enter = new line), letters pick choices.
  useEffect(() => {
    const onKey = (e) => {
      if (index >= total || sending) return;
      const tag = e.target.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
      if (e.key === "Enter" && !e.shiftKey) {
        if (step?.type === "people" && (tag === "TEXTAREA" || tag === "SELECT")) return; // Enter adds a line / opens the list there
        const choiceStep = step && (step.type === "single" || step.type === "multi");
        if (tag === "BUTTON" && !e.target.dataset.primary && !choiceStep) return;
        e.preventDefault();
        next();
        return;
      }
      if (!typing && step && (step.type === "single" || step.type === "multi") && e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const i = LETTERS.indexOf(e.key.toUpperCase());
        if (i >= 0 && i < step.options.length) { e.preventDefault(); choose(step, step.options[i]); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const choose = (s, opt) => {
    if (s.type === "single") {
      set(s.id, opt);
      clearTimeout(autoTimer.current);
      autoTimer.current = setTimeout(() => { setDir(1); setIndex((i) => (i === STEPS.indexOf(s) && i < total - 1 ? i + 1 : i)); }, 420);
      return;
    }
    const cur = answers[s.id] || [];
    if (cur.includes(opt)) return set(s.id, cur.filter((o) => o !== opt));
    if (s.max && cur.length >= s.max) { setError(`Pick up to ${s.max}.`); return; }
    set(s.id, [...cur, opt]);
  };

  const firstName = (answers.contact_name || "").trim().split(/\s+/)[0];

  return (
    <div className="kd-root relative min-h-[100dvh] w-full overflow-hidden bg-konten-blue text-konten-cream font-spartan antialiased">
      <style>{KEYFRAMES}</style>

      {/* Progress */}
      <div className="fixed inset-x-0 top-0 z-20 h-1 bg-konten-cream/15" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label="Progress">
        <div className="h-full bg-konten-cream transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>

      {/* Header */}
      <header className="fixed inset-x-0 top-1 z-10 flex items-center justify-between px-5 py-4 sm:px-8">
        <span className="text-sm font-bold uppercase tracking-[0.18em]">Konten LR</span>
        {index >= 0 && index < total && (
          <span className="text-xs tabular-nums text-konten-cream/70">{progress}% complete</span>
        )}
      </header>

      {/* Stage */}
      <main className="flex min-h-[100dvh] items-center px-5 pb-28 pt-24 sm:px-8">
        <div
          key={index}
          ref={stageRef}
          tabIndex={-1}
          className={`mx-auto w-full max-w-2xl outline-none ${dir > 0 ? "kd-in-up" : "kd-in-down"}`}
        >
          {index < 0 && <Welcome hasDraft={!!draft?.answers?.org_name} onStart={next} />}
          {index >= total && <Thanks name={firstName} onExit={onExit} />}

          {step && step.type === "statement" && (
            <div className="space-y-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-konten-cream/70">Section {step.section}</p>
              <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight [text-wrap:balance] sm:text-6xl">{step.title}</h2>
              <p className="max-w-xl text-lg text-konten-cream/80 sm:text-xl">{step.body}</p>
              <OkButton onClick={next} label="Continue" />
            </div>
          )}

          {step && step.type !== "statement" && (
            <div className="space-y-6">
              <div className="flex gap-3">
                <span className="mt-1.5 flex shrink-0 items-center gap-1 text-base tabular-nums text-konten-cream/70 sm:text-lg">
                  {numbers[index]}<Arrow />
                </span>
                <div className="min-w-0 space-y-2">
                  <h2 id={`q-${index}`} className="text-2xl font-semibold leading-snug [text-wrap:balance] sm:text-3xl">
                    {step.title}
                    {step.required && <span className="text-konten-cream/60"> *</span>}
                  </h2>
                  {step.help && <p className="text-base text-konten-cream/70 sm:text-lg">{step.help}</p>}
                </div>
              </div>

              <div className="pl-0 sm:pl-10" role="group" aria-labelledby={`q-${index}`}>
                <Field step={step} answers={answers} set={set} choose={choose} />
              </div>

              <div className="space-y-3 sm:pl-10">
                {error && (
                  <p role="alert" className="inline-flex items-center gap-2 rounded bg-konten-cream px-3 py-1.5 text-sm font-medium text-[#8A1C1C]">
                    <span aria-hidden="true">!</span>{error}
                  </p>
                )}
                {sendError && isLast && (
                  <p role="alert" className="max-w-lg rounded bg-konten-cream px-3 py-2 text-sm font-medium text-[#8A1C1C]">{sendError}</p>
                )}
                <OkButton
                  onClick={next}
                  label={isLast ? (sending ? "Sending…" : "Submit") : "OK"}
                  disabled={sending}
                  hint={step.type === "long" ? "Shift ⇧ + Enter ↵ for a new line" : step.type === "people" ? null : "press Enter ↵"}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Honeypot (hidden from people, catches bots) */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="absolute -left-[9999px] h-px w-px opacity-0" aria-hidden="true" />

      {/* Up / down */}
      {index >= 0 && index < total && (
        <nav className="fixed bottom-5 right-5 z-10 flex overflow-hidden rounded-md shadow-lg sm:bottom-8 sm:right-8" aria-label="Question navigation">
          <button type="button" onClick={() => go(index - 1)} className="grid h-10 w-10 place-items-center bg-konten-cream text-konten-blue hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-konten-cream" aria-label="Previous question">
            <Chevron up />
          </button>
          <span className="w-px bg-konten-blue/20" />
          <button type="button" onClick={next} disabled={sending} className="grid h-10 w-10 place-items-center bg-konten-cream text-konten-blue hover:bg-white disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-konten-cream" aria-label="Next question">
            <Chevron />
          </button>
        </nav>
      )}
    </div>
  );
}

/* ---------- Screens ---------- */

function Welcome({ hasDraft, onStart }) {
  return (
    <div className="space-y-7">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-konten-cream/70">{WELCOME.eyebrow}</p>
      <h1 className="text-5xl font-extrabold leading-[1] tracking-tight [text-wrap:balance] sm:text-7xl">{WELCOME.title}</h1>
      <p className="max-w-xl text-lg leading-relaxed text-konten-cream/85 sm:text-xl">{WELCOME.body}</p>
      <div className="flex flex-wrap items-center gap-4">
        <OkButton onClick={onStart} label={hasDraft ? "Continue where you left off" : WELCOME.button} />
        <span className="flex items-center gap-2 text-sm text-konten-cream/70"><Clock />{WELCOME.meta}</span>
      </div>
    </div>
  );
}

function Thanks({ name, onExit }) {
  return (
    <div className="space-y-6">
      <h1 className="text-5xl font-extrabold leading-[1] tracking-tight sm:text-7xl">{THANKS.title(name)}</h1>
      <p className="max-w-xl text-lg leading-relaxed text-konten-cream/85 sm:text-xl">{THANKS.body}</p>
      <p className="text-sm text-konten-cream/70 select-all">{THANKS.contact}</p>
      <p className="pt-4 text-2xl font-bold">{THANKS.tagline}</p>
      {onExit && <OkButton onClick={onExit} label="Back to konten.agency" />}
    </div>
  );
}

/* ---------- Fields ---------- */

const lineInput =
  "w-full border-0 border-b-2 border-konten-cream/35 bg-transparent px-0 pb-2 pt-1 text-xl text-konten-cream placeholder:text-konten-cream/35 focus:border-konten-cream focus:outline-none focus:ring-0 sm:text-2xl [color-scheme:dark]";

function Field({ step, answers, set, choose }) {
  const v = answers[step.id];
  switch (step.type) {
    case "short":
    case "email":
    case "date":
      return (
        <input
          data-autofocus
          type={step.type === "short" ? "text" : step.type}
          value={v || ""}
          onChange={(e) => set(step.id, e.target.value)}
          placeholder={step.type === "date" ? "" : "Type your answer here…"}
          className={lineInput}
        />
      );
    case "long":
      return (
        <AutoTextarea data-autofocus value={v || ""} onChange={(val) => set(step.id, val)} placeholder="Type your answer here…" className={lineInput} />
      );
    case "single":
    case "multi":
      return <Choices step={step} answers={answers} set={set} choose={choose} />;
    case "group":
      return (
        <div className="grid gap-7">
          {step.fields.map((f, i) => (
            <label key={f.id} className="grid gap-1">
              <span className="text-sm font-medium text-konten-cream/75">
                {f.label}{f.required && " *"}
              </span>
              <input
                {...(i === 0 ? { "data-autofocus": true } : {})}
                type={f.type === "short" ? "text" : f.type}
                value={answers[f.id] || ""}
                onChange={(e) => set(f.id, e.target.value)}
                placeholder={f.placeholder || ""}
                autoComplete={{ contact_name: "name", contact_email: "email", contact_phone: "tel", contact_role: "organization-title" }[f.id]}
                className={lineInput}
              />
            </label>
          ))}
        </div>
      );
    case "people":
      return <People value={answers.storyholders || [{}]} onChange={(list) => set("storyholders", list)} />;
    default:
      return null;
  }
}

function Choices({ step, answers, set, choose }) {
  const v = answers[step.id];
  const selected = (o) => (step.type === "single" ? v === o : (v || []).includes(o));
  return (
    <div className="space-y-4">
      {step.type === "multi" && (
        <p className="text-sm text-konten-cream/70">{step.max ? `Choose up to ${step.max}` : "Choose as many as you like"}</p>
      )}
      <div className="grid max-w-md gap-2">
        {step.options.map((o, i) => (
          <button
            key={o}
            type="button"
            onClick={() => choose(step, o)}
            aria-pressed={selected(o)}
            className={`group flex items-center gap-3 rounded-md border px-3 py-2.5 text-left text-lg transition ${
              selected(o)
                ? "border-konten-cream bg-konten-cream/25"
                : "border-konten-cream/40 bg-konten-cream/10 hover:bg-konten-cream/20"
            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-konten-cream`}
          >
            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded border text-xs font-bold ${
              selected(o) ? "border-konten-cream bg-konten-cream text-konten-blue" : "border-konten-cream/50"
            }`}>{LETTERS[i]}</span>
            <span className="min-w-0 flex-1">{o}</span>
            {selected(o) && <Check />}
          </button>
        ))}
      </div>
      {step.other && (
        <input
          type="text"
          value={answers[step.id + "_other"] || ""}
          onChange={(e) => set(step.id + "_other", e.target.value)}
          placeholder="Something else? Type it here"
          aria-label="Other answer"
          className={`${lineInput} max-w-md !text-lg`}
        />
      )}
    </div>
  );
}

function People({ value, onChange }) {
  const list = value.length ? value : [{}];
  const update = (i, k, val) => onChange(list.map((p, j) => (j === i ? { ...p, [k]: val } : p)));
  const remove = (i) => onChange(list.length > 1 ? list.filter((_, j) => j !== i) : [{}]);
  return (
    <div className="space-y-4">
      {list.map((p, i) => (
        <div key={i} className="space-y-5 rounded-lg border border-konten-cream/30 bg-konten-cream/[0.07] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-[0.15em] text-konten-cream/80">Storyholder {i + 1}</span>
            <button type="button" onClick={() => remove(i)} className="text-sm text-konten-cream/70 underline underline-offset-4 hover:text-konten-cream">
              Remove
            </button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {PERSON_FIELDS.map((f, fi) => (
              <label key={f.id} className={`grid min-w-0 gap-1 ${f.multiline ? "sm:col-span-2" : ""}`}>
                <span className="text-sm font-medium text-konten-cream/75">{f.label}</span>
                {f.options ? (
                  <select
                    value={p[f.id] || ""}
                    onChange={(e) => update(i, f.id, e.target.value)}
                    className={`${lineInput} !text-lg [&>option]:text-black`}
                  >
                    <option value="">Choose one</option>
                    {f.options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : f.multiline ? (
                  <AutoTextarea value={p[f.id] || ""} onChange={(val) => update(i, f.id, val)} placeholder={f.placeholder || ""} className={`${lineInput} !text-lg`} />
                ) : (
                  <input
                    {...(i === 0 && fi === 0 ? { "data-autofocus": true } : {})}
                    type="text"
                    value={p[f.id] || ""}
                    onChange={(e) => update(i, f.id, e.target.value)}
                    placeholder={f.placeholder || ""}
                    className={`${lineInput} !text-lg`}
                  />
                )}
              </label>
            ))}
          </div>
        </div>
      ))}
      {list.length < 8 && (
        <button
          type="button"
          onClick={() => onChange([...list, {}])}
          className="rounded-md border border-dashed border-konten-cream/50 px-4 py-2.5 text-base font-medium hover:bg-konten-cream/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-konten-cream"
        >
          + Add another storyholder
        </button>
      )}
    </div>
  );
}

function AutoTextarea({ value, onChange, className, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 320) + "px";
  }, [value]);
  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${className} resize-none overflow-y-auto`}
      {...rest}
    />
  );
}

/* ---------- Bits ---------- */

function OkButton({ onClick, label, hint, disabled }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        data-primary="1"
        onClick={onClick}
        disabled={disabled}
        className="inline-flex items-center gap-2 rounded-md bg-konten-cream px-5 py-2.5 text-lg font-bold text-konten-blue shadow-md transition hover:bg-white disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-konten-cream"
      >
        {label}
        {label === "OK" && <Check />}
      </button>
      {hint && <span className="hidden text-xs text-konten-cream/70 sm:inline">{hint}</span>}
    </div>
  );
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const Check = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const Chevron = ({ up }) => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ transform: up ? "rotate(180deg)" : "none" }}><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const Clock = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 4.8V8l2.2 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
);

const KEYFRAMES = `
@keyframes kd-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
@keyframes kd-down { from { opacity: 0; transform: translateY(-40px); } to { opacity: 1; transform: none; } }
.kd-in-up { animation: kd-up .45s cubic-bezier(.2,.7,.2,1) both; }
.kd-in-down { animation: kd-down .45s cubic-bezier(.2,.7,.2,1) both; }
@media (prefers-reduced-motion: reduce) { .kd-in-up, .kd-in-down { animation: none; } }
`;
