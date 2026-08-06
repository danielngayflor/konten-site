import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { workPlaceholders } from '../data/workPlaceholders';
import Polaroid from '../components/ui/Polaroid';
import FilmMetadata from '../components/ui/FilmMetadata';
import Clapperboard from '../components/ui/Clapperboard';
import BookingModal from '../components/ui/BookingModal';

const EASE = [0.25, 0, 0, 1] as const;

export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = workPlaceholders.find((p) => p.slug === slug) || workPlaceholders[0];

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-konten-black text-white py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.span
            className="text-eyebrow text-mid-gray inline-flex items-center gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          >
            {project.serviceName} <Clapperboard size={14} />
          </motion.span>
          <motion.h1
            className="font-spartan font-black text-white uppercase leading-none tracking-tighter text-[clamp(2.5rem,8vw,9rem)] mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            {project.title}
          </motion.h1>
          <motion.p
            className="font-body text-body-lg leading-[1.65] text-white/60 max-w-[600px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          >
            {project.description}
          </motion.p>
        </div>
      </section>

      {/* ── Fact File ─────────────────────────────────────────────────── */}
      <section className="bg-charcoal border-y border-white/10 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-eyebrow text-konten-blue-bright mb-2">CLIENT</p>
            <p className="font-spartan font-black text-white text-[1.6rem] uppercase tracking-tight leading-tight">
              {project.client}
            </p>
          </div>
          <div>
            <p className="text-eyebrow text-konten-blue-bright mb-2">YEAR</p>
            <p className="font-spartan font-black text-white text-[1.6rem] uppercase tracking-tight leading-none">
              {project.year}
            </p>
          </div>
          <div>
            <p className="text-eyebrow text-konten-blue-bright mb-2">LOCATION</p>
            <p className="font-spartan font-black text-white text-[1.6rem] uppercase tracking-tight leading-tight">
              {project.location}
            </p>
          </div>
          <div>
            <p className="text-eyebrow text-konten-blue-bright mb-2">SERVICE</p>
            <Link
              to="/services"
              className="font-spartan font-black text-white text-[1.6rem] uppercase tracking-tight leading-tight hover:text-konten-blue-bright transition-colors block"
            >
              {project.serviceName}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Hero video ────────────────────────────────────────────────── */}
      {project.heroVideo && (
        <section className="bg-konten-black py-12 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="aspect-video w-full overflow-hidden rounded-2xl">
              <iframe
                src={project.heroVideo}
                title={project.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* ── The Brief ─────────────────────────────────────────────────── */}
      <section className="bg-konten-black text-white py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          <h2 className="font-spartan font-black text-white uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)]">
            THE
            <br />
            BRIEF.
          </h2>
          <div className="max-w-[600px] pt-4 space-y-6">
            {project.descriptionParagraphs.map((para, i) => (
              <p key={i} className="font-body text-body-lg leading-[1.65] text-white/70">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Did ───────────────────────────────────────────────── */}
      <section className="bg-charcoal text-white py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          <h2 className="font-spartan font-black text-white uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)]">
            WHAT
            <br />
            WE DID.
          </h2>
          <ul className="max-w-[600px] pt-4 space-y-5">
            {project.goals.map((goal, i) => (
              <li key={i} className="flex items-start gap-3">
                <Clapperboard size={15} className="mt-1 shrink-0 text-konten-blue-bright" />
                <span className="font-body text-body-lg leading-[1.65] text-white/80">
                  {goal}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Platform OR Gallery ───────────────────────────────────────── */}
      {project.siteUrl ? (
        <section className="bg-konten-black text-white pb-32 md:pb-40 pt-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-spartan font-black text-white uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)] mb-16 text-center">
              THE
              <br />
              PLATFORM.
            </h2>
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl mb-12 border border-white/10">
              <div className="bg-dark-gray px-4 py-3 flex items-center gap-3">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <span className="w-3 h-3 rounded-full bg-green-400/70" />
                </div>
                <div className="flex-1 bg-white/10 rounded-full px-4 py-1">
                  <p className="font-body text-[11px] text-white/50 truncate">{project.siteUrl}</p>
                </div>
              </div>
              {project.siteScreenshotUrl ? (
                <a href={project.siteUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src={project.siteScreenshotUrl}
                    alt={`${project.client} website screenshot`}
                    className="w-full object-cover object-top"
                    style={{ height: '600px' }}
                  />
                </a>
              ) : (
                <iframe
                  src={project.siteUrl}
                  title={`${project.client} website`}
                  className="w-full"
                  style={{ height: '600px', border: 'none' }}
                />
              )}
            </div>
            <div className="text-center">
              <a
                href={project.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 border border-white/25 text-white/70 font-spartan font-700 text-[12px] uppercase tracking-widest rounded-full hover:border-white/50 hover:text-white transition-colors duration-200"
              >
                Visit the live site →
              </a>
            </div>
          </div>
        </section>
      ) : project.galleryImages && project.galleryImages.length > 0 ? (
        <section className="bg-konten-black text-white pb-32 md:pb-40 pt-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-spartan font-black text-white uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)] mb-16 text-center">
              THE
              <br />
              GALLERY.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {project.galleryImages.map((img, i) => (
                <div key={i} className={i % 2 === 1 ? 'md:translate-y-12' : ''}>
                  <FilmMetadata text={img.metadata} className="mb-3 text-white/40" />
                  <Polaroid rotation={img.rotation}>
                    {img.embedUrl ? (
                      <iframe
                        src={img.embedUrl}
                        className="w-full h-full border-0"
                        allowFullScreen
                        scrolling="no"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      />
                    ) : img.src ? (
                      <img src={img.src} alt={img.alt ?? project.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-dark-gray" />
                    )}
                  </Polaroid>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── The Numbers ───────────────────────────────────────────────── */}
      {project.stats && project.stats.length > 0 && (
        <section className="bg-charcoal text-white py-32 md:py-40 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-spartan font-black text-white uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)] mb-16 text-center">
              THE
              <br />
              NUMBERS.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {project.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-spartan font-black text-white uppercase tracking-tighter leading-none text-[clamp(3rem,7vw,5rem)] mb-3">
                    {stat.value}
                  </p>
                  <p className="text-eyebrow text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ────────────────────────────────────────────────── */}
      <section className="bg-konten-black text-white py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-spartan font-black text-white uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)] mb-12">
            HAVE A STORY
            <br />
            WORTH TELLING?
          </h2>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center px-8 py-4 bg-konten-blue-bright text-white font-spartan font-700 text-[12px] uppercase tracking-widest rounded-full hover:bg-konten-blue-hover transition-colors duration-200 cursor-pointer"
          >
            Start a project →
          </button>
        </div>
      </section>

      {modalOpen && (
        <BookingModal
          serviceValue={project.serviceSlug}
          serviceName={project.serviceName}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
