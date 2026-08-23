export default function OurStoryCloser() {
  return (
    <section className="bg-konten-black text-white py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <p className="font-body text-body-lg text-white/70 leading-[1.7] mb-8">
          We're a small team, based in Monrovia, working across Liberia and West
          Africa. If you've got a story that's real and needs telling properly 
          that's exactly what we're built for.
        </p>
        <p className="font-display text-white leading-[1.05] tracking-tight mb-10" style={{ fontSize: 'clamp(2rem, 4.5vw, 5rem)' }}>
          Tell Your Story.
        </p>
        <a
          href="mailto:contact@konten.agency"
          className="inline-flex items-center px-8 py-3 bg-konten-blue text-white font-spartan font-700 text-[13px] uppercase tracking-widest rounded-full hover:bg-konten-blue transition-colors duration-200"
        >
          Get in touch →
        </a>
      </div>
    </section>
  );
}
