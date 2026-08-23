// NewsletterSignup.tsx standalone floating panel, sits between ContactForm and footer
import { useState } from 'react';
import { submitForm } from '../../../lib/supabase';

export default function NewsletterSignup() {
  const [email, setEmail]       = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitForm('newsletter', { email });
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-konten-blue text-white px-6 sm:px-10 py-16 md:py-20 overflow-hidden">
      <div className="max-w-2xl">
        <h3
          className="font-spartan font-black uppercase text-white leading-none tracking-tighter mb-8"
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)' }}
        >
          Stories worth telling,<br />straight to your inbox.
        </h3>

        {submitted ? (
          <p className="font-body text-white/60 text-[15px]">
            You're on the list. We'll be in touch.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="flex-1 bg-transparent border-b-[1.5px] border-white/30 text-white
                         placeholder-white/30 font-body text-[15px] py-3
                         focus:outline-none focus:border-white/60 transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-konten-cream text-konten-black font-spartan font-bold
                         text-[11px] uppercase tracking-widest rounded-full
                         hover:opacity-90 transition-opacity whitespace-nowrap
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '…' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
