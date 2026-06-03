/** POST form data to the Vercel API route which sends it via SMTP. */
export async function submitForm(
  type: 'contact' | 'discovery' | 'download' | 'newsletter',
  data: Record<string, string>
): Promise<void> {
  const res = await fetch('/api/submit-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, data }),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(json.error ?? 'Form submission failed');
  }
}
