export default function WorkCloser() {
  return (
    <section className="bg-konten-blue text-white py-16 md:py-20 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2
          className="font-spartan font-black uppercase leading-none tracking-tighter text-white mb-10"
          style={{ fontSize: 'clamp(3rem, 9vw, 9rem)' }}
        >
          Got a story like these waiting to be told properly?
        </h2>
        <a
          href="mailto:sales@konten.agency"
          className="inline-flex items-center px-8 py-4 bg-konten-cream text-konten-black
                     font-spartan font-bold text-[12px] uppercase tracking-widest rounded-xl
                     hover:opacity-90 active:scale-[0.98] transition-all duration-200"
        >
          Start a conversation →
        </a>
      </div>
    </section>
  );
}
