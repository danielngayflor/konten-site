// About.tsx — Our Story page, Dynasty Africa style:
//   full-bleed hero image → text panels → image breaks → belief quote → CTA
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageSeo from '../components/seo/PageSeo';

const EASE = [0.25, 0, 0, 1] as const;

export default function About() {
  return (
    <div className="flex flex-col">
      <PageSeo
        title="Our Story"
        description="Konten LR was founded in Monrovia in 2023 with a simple mission: go find the real stories of Liberia, sit with them, and tell them right. We've worked across all 15 counties and three countries."
        canonical="/our-story"
        ogImage="https://konten.agency/images/about/team.jpg"
      />

      {/* ── 1. HERO — full-bleed BTS photo, headline overlaid ──────── */}
      <section className="relative w-full overflow-hidden" style={{ height: 'clamp(520px, 80vh, 900px)' }}>
        <img
          src="/images/about/team.jpg"
          alt="Konten team at work"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* gradient: dark bottom so text reads */}
        <div className="absolute inset-0 bg-gradient-to-t from-konten-black via-konten-black/50 to-konten-black/10" />

        <div className="relative h-full flex flex-col justify-end px-6 sm:px-10 pb-14 md:pb-20 max-w-[1400px] mx-auto">
          <motion.h1
            className="font-spartan font-black uppercase leading-none tracking-tighter text-white"
            style={{ fontSize: 'clamp(3rem, 9vw, 9rem)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            We Tell<br />Real Stories.
          </motion.h1>
        </div>
      </section>

      {/* ── 2. WHO WE ARE — dark text panel ───────────────────────── */}
      <section className="bg-konten-black text-white px-6 sm:px-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <p
            className="font-body text-white/80 leading-[1.7] mb-8"
            style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)' }}
          >
            Konten LR started in 2023, in Monrovia, with a simple observation:
            Liberia has no shortage of real stories. It has a shortage of people
            willing to go find them, sit with them, and tell them right.
          </p>
          <p
            className="font-body text-white/55 leading-[1.7]"
            style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)' }}
          >
            Founded by Daniel N. Gayflor, Konten has since worked in all 15
            counties of Liberia, and beyond: Sierra Leone, Cote d'Ivoire, for
            NGOs, embassies, development organisations, brands, and creators who
            have something true to say and need it said well.
          </p>
        </div>
      </section>

      {/* ── 3. DRONE FLIGHT IMAGE — full-width visual break ─────────── */}
      <div className="w-full overflow-hidden" style={{ height: 'clamp(300px, 50vh, 600px)' }}>
        <img
          src="/images/about/drone-flight.jpg"
          alt="DJI drone in flight over Liberia"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── 4. WHY WE EXIST — dark text panel ─────────────────────── */}
      <section className="bg-konten-black text-white px-6 sm:px-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <p
            className="font-body text-white/65 leading-[1.7] mb-8"
            style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)' }}
          >
            Making content has never been easier. A phone, an app, an afternoon.
            Anyone can put something out into the world now. That's not a problem.
            It's progress.
          </p>
          <p
            className="font-body text-white/80 leading-[1.7] mb-8"
            style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)' }}
          >
            But when everyone's putting something out, the question stops being
            "can you make this" and starts being "should this exist, and why." That's
            the part that doesn't come free with the tools. It comes from being in
            the room with the beneficiary, the board, the founder before a
            single frame is shot.
          </p>
          <p
            className="font-body text-white leading-[1.7]"
            style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)' }}
          >
            That's the work we do. We go first, we listen, and then we build
            something that moves a donor to fund, a board to approve, a customer
            to buy, an audience to trust.
          </p>
        </div>
      </section>

      {/* ── 5. DRONE CONTROLLER — image + pull quote side by side ───── */}
      <section className="bg-konten-black text-white px-6 sm:px-10 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-6 md:gap-10 items-stretch">

          {/* Image */}
          <div className="w-full overflow-hidden" style={{ minHeight: '340px' }}>
            <img
              src="/images/about/drone-controller.jpg"
              alt="Aerial shot on drone controller screen"
              className="w-full h-full object-cover"
              style={{ aspectRatio: '4/3' }}
            />
          </div>

          {/* Stat / quote panel */}
          <div className="flex flex-col justify-center bg-konten-blue px-8 py-12 md:py-14">
            <p
              className="font-spartan font-black uppercase leading-none tracking-tighter text-white mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              All 15<br />Counties.
            </p>
            <p
              className="font-body text-white/70 leading-[1.7]"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)' }}
            >
              We have executed projects in three countries and in all 15 counties
              across Liberia, sitting with beneficiaries, embassies, founders,
              and boards, understanding <em>why</em> before we ever picked up a camera.
            </p>
          </div>

        </div>
      </section>

      {/* ── 6. BELIEF — large centred quote on blue ──────────────────── */}
      <section className="bg-konten-blue text-white px-6 sm:px-10 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <blockquote
            className="font-spartan font-black uppercase leading-none tracking-tighter text-white"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            Stories, real ones, told well, have the power to move people to act.
          </blockquote>
        </div>
      </section>

      {/* ── 7. CTA CLOSER ────────────────────────────────────────────── */}
      <section className="bg-konten-black text-white px-6 sm:px-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <p
            className="font-body text-white/55 leading-[1.7] mb-12"
            style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)' }}
          >
            We're a small team, based in Monrovia, working across Liberia and West
            Africa. If you've got a story that's real and needs telling properly,
            that's exactly what we're built for.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/featured-projects"
              className="inline-flex items-center justify-center px-8 py-4 bg-konten-cream text-konten-black
                         font-spartan font-bold text-[12px] uppercase tracking-widest rounded-xl
                         hover:opacity-90 active:scale-[0.98] transition-all duration-200"
            >
              See our work →
            </Link>
            <a
              href="mailto:sales@konten.agency"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/25 text-white
                         font-spartan font-bold text-[12px] uppercase tracking-widest rounded-xl
                         hover:border-white/60 hover:text-white transition-all duration-200"
            >
              Start a conversation
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
