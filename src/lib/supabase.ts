import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Calls the `form-submit` Edge Function which inserts to the DB and sends a Resend email. */
export async function submitForm(
  type: 'contact' | 'discovery' | 'download',
  data: Record<string, string>
): Promise<void> {
  const { error } = await supabase.functions.invoke('form-submit', {
    body: { type, data },
  });
  if (error) throw error;
}
