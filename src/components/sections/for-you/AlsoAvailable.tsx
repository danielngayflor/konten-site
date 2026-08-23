// AlsoAvailable.tsx — matches WorkCloser style: blue bg, large headline, cream button
export default function AlsoAvailable() {
  return (
    <section className="bg-konten-blue text-white py-16 md:py-20 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2
          className="font-spartan font-black uppercase leading-none tracking-tighter text-white mb-10"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)' }}
        >
          Brand, Web &amp;<br />Training too.
        </h2>
        <p
          className="font-body text-white/60 leading-[1.7] max-w-2xl mx-auto mb-12"
          style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)' }}
        >
          We also work in brand identity and communications, web and digital design,
          and media training and capacity building. These aren't front-of-house services,
          but they're very much part of what we do.
        </p>
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
