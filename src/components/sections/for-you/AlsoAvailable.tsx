export default function AlsoAvailable() {
  return (
    <section className="bg-konten-black text-white py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="border-t border-border-gray pt-16">
          <p className="text-eyebrow text-mid-gray mb-10">Also Available, On Request</p>
          <p className="font-body text-body-lg text-white/60 leading-[1.65] mb-10">
            We also work in brand identity and communications, web and digital
            design, and media training and capacity building — for clients who
            need those specifically. These aren't front-of-house services, but
            they're very much part of what we do.
          </p>
          <a
            href="mailto:sales@konten.agency"
            className="inline-flex items-center gap-1 font-spartan font-700 text-[12px] uppercase tracking-widest text-konten-blue hover:text-white border-b border-konten-blue/40 hover:border-white/40 pb-0.5 transition-colors duration-200"
          >
            Ask us about Brand &amp; Comms, Web &amp; Digital, or Training &amp; Capacity →
          </a>
        </div>
      </div>
    </section>
  );
}
