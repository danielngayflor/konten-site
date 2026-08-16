export default function WorkCloser() {
  return (
    <section className="bg-konten-black text-white py-32 px-6 md:px-12 border-t border-border-gray">
      <div className="max-w-3xl mx-auto">
        <p className="font-body text-body-lg text-white/60 leading-[1.65] mb-8">
          Got a story like these waiting to be told properly?
        </p>
        <p className="font-display leading-[1.05] tracking-tight text-white mb-10" style={{ fontSize: 'clamp(2rem, 4.5vw, 5rem)' }}>
          Tell Your Story.
        </p>
        <a
          href="mailto:sales@konten.agency"
          className="inline-flex items-center px-8 py-3 bg-konten-blue text-white font-spartan font-700 text-[12px] uppercase tracking-widest rounded-full hover:bg-konten-blue transition-colors duration-200"
        >
          Start a conversation →
        </a>
      </div>
    </section>
  );
}
