export default function OurPhilosophy() {
  return (
    <section className="relative bg-konten-cream text-konten-black py-32 md:py-40 px-6 md:px-12 overflow-hidden">

      {/* Centred content */}
      <div className="relative w-full text-center">

        {/* Lead-in */}
        <p className="font-inter text-[clamp(0.625rem,2vw,2.25rem)] text-konten-black/70 mb-4">
          This is why we are
        </p>

        {/* Heading */}
        <h2 className="font-spartan font-black text-konten-black uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)] mb-12">
          ALWAYS ON.
          <br />
          ALWAYS CREATING.
        </h2>

        {/* Body — centred, directly under the heading */}
        <p className="font-inter text-[18px] md:text-[20px] leading-body text-konten-black max-w-[640px] mx-auto">
          This isn't just a tagline. It's how we work. The digital landscape
          doesn't sleep, and neither does the need for content that cuts
          through. We stay ahead — of trends, of tools, of what audiences
          actually want — so our clients don't have to. Every project we
          take on is an act of attention. We show up prepared, we stay
          curious, and we never treat a brief as just a task to complete.
          We treat it as a story waiting to be told.
        </p>

      </div>
    </section>
  );
}
