import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

const EASE = [0.25, 0, 0, 1] as const;
import { workPlaceholders } from '../data/workPlaceholders';
import Polaroid from '../components/ui/Polaroid';
import FilmMetadata from '../components/ui/FilmMetadata';
import Clapperboard from '../components/ui/Clapperboard';
import PillButton from '../components/ui/PillButton';
import CollageElement from '../components/ui/CollageElement';
import ServiceIcon from '../components/ui/ServiceIcon';

export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project =
    workPlaceholders.find((p) => p.slug === slug) || workPlaceholders[0];

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative bg-konten-blue text-konten-cream py-32 md:py-40 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <CollageElement
            type="film-strip"
            src="/stickers/take-01.png"
            position={{ top: '8%', right: '2%' }}
            rotation={-5}
            parallaxStrength={0.12}
            scale={1.0}
            size={150}
            delay={0}
            anim="float-slow"
          />
          <CollageElement
            type="studio-mic"
            src="/stickers/film-reel.png"
            position={{ bottom: '6%', left: '2%' }}
            rotation={9}
            parallaxStrength={0.16}
            scale={1.0}
            size={145}
            delay={0.8}
          />
        </div>
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
          <div>
            <motion.span
              className="text-eyebrow text-konten-cream inline-flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            >
              {project.serviceName} <Clapperboard size={14} />
            </motion.span>
            <motion.h1
              className="font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter text-[clamp(2.5rem,8vw,9rem)] mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            >
              {project.title}
            </motion.h1>
            <motion.p
              className="font-inter text-[18px] md:text-[20px] leading-body text-konten-cream/80 max-w-[480px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            >
              {project.description}
            </motion.p>
          </div>
          <motion.div
            className="max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            <FilmMetadata text={project.metadataStrip} className="mb-3 text-konten-cream/60" />
            <Polaroid rotation={2}>
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-konten-blue flex items-center justify-center">
                  <ServiceIcon slug={project.serviceSlug} size={120} className="text-konten-cream opacity-60" />
                </div>
              )}
            </Polaroid>
          </motion.div>
        </div>
      </section>

      {/* ── Fact File ─────────────────────────────────────────────────── */}
      <section className="bg-konten-black text-konten-cream border-y border-konten-cream/20 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-eyebrow text-konten-blue mb-2">CLIENT</p>
            <p className="font-spartan font-black text-[1.6rem] uppercase tracking-tight leading-tight">
              {project.client}
            </p>
          </div>
          <div>
            <p className="text-eyebrow text-konten-blue mb-2">YEAR</p>
            <p className="font-spartan font-black text-[1.6rem] uppercase tracking-tight leading-none">
              {project.year}
            </p>
          </div>
          <div>
            <p className="text-eyebrow text-konten-blue mb-2">LOCATION</p>
            <p className="font-spartan font-black text-[1.6rem] uppercase tracking-tight leading-tight">
              {project.location}
            </p>
          </div>
          <div>
            <p className="text-eyebrow text-konten-blue mb-2">SERVICE</p>
            <Link
              to="/services-for-you"
              className="font-spartan font-black text-[1.6rem] uppercase tracking-tight leading-tight hover:text-konten-blue transition-colors block"
            >
              {project.serviceName}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Hero video (shown only when a YouTube embed URL is provided) ─ */}
      {project.heroVideo && (
        <section className="bg-konten-black py-12 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="aspect-video w-full overflow-hidden">
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
      <section className="bg-konten-cream text-konten-black py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          <h2 className="font-spartan font-black text-konten-black uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)]">
            THE
            <br />
            BRIEF.
          </h2>
          <div className="max-w-[600px] pt-4 space-y-6">
            {project.descriptionParagraphs.map((para, i) => (
              <p
                key={i}
                className="font-inter text-[18px] md:text-[20px] leading-body text-konten-black"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Did ───────────────────────────────────────────────── */}
      <section className="bg-konten-black text-konten-cream py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          <h2 className="font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)]">
            WHAT
            <br />
            WE DID.
          </h2>
          <ul className="max-w-[600px] pt-4 space-y-5">
            {project.goals.map((goal, i) => (
              <li key={i} className="flex items-start gap-3">
                <Clapperboard size={15} className="mt-1 shrink-0" />
                <span className="font-inter text-[18px] md:text-[20px] leading-body text-konten-cream">
                  {goal}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Live Site (web projects) OR Media Gallery ─────────────────── */}
      {project.siteUrl ? (
        <section className="bg-konten-cream text-konten-black pb-32 md:pb-40 pt-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-spartan font-black text-konten-black uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)] mb-16 text-center">
              THE
              <br />
              PLATFORM.
            </h2>
            {/* Live site — screenshot image (when host blocks iframes) or live iframe */}
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl mb-12 border border-konten-black/10">
              <div className="bg-konten-black px-4 py-3 flex items-center gap-3">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <span className="w-3 h-3 rounded-full bg-green-400/70" />
                </div>
                <div className="flex-1 bg-white/10 rounded-full px-4 py-1">
                  <p className="font-inter text-[11px] text-konten-cream/60 truncate">{project.siteUrl}</p>
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
                className="inline-block px-8 py-[10px] text-[12px] bg-konten-black text-konten-cream font-inter font-500 uppercase rounded-full hover:opacity-85 transition-all duration-200"
              >
                Visit the live site →
              </a>
            </div>
          </div>
        </section>
      ) : project.galleryImages && project.galleryImages.length > 0 ? (
        <section className="bg-konten-cream text-konten-black pb-32 md:pb-40 pt-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-spartan font-black text-konten-black uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)] mb-16 text-center">
              THE
              <br />
              GALLERY.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {project.galleryImages.map((img, i) => (
                <div key={i} className={i % 2 === 1 ? 'md:translate-y-12' : ''}>
                  <FilmMetadata text={img.metadata} className="mb-3" />
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
                      <img
                        src={img.src}
                        alt={img.alt ?? project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-konten-blue/30 to-konten-black/30" />
                    )}
                  </Polaroid>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── The Numbers (only rendered when stats are available) ────────── */}
      {project.stats && project.stats.length > 0 && (
        <section className="bg-konten-black text-konten-cream py-32 md:py-40 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)] mb-16 text-center">
              THE
              <br />
              NUMBERS.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {project.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-spartan font-black text-konten-cream uppercase tracking-tighter leading-none text-[clamp(3rem,7vw,5rem)] mb-3">
                    {stat.value}
                  </p>
                  <p className="text-eyebrow text-konten-cream/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ────────────────────────────────────────────────── */}
      <section className="bg-konten-cream text-konten-black py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-spartan font-black text-konten-black uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)] mb-12">
            HAVE A STORY
            <br />
            WORTH TELLING?
          </h2>
          <Link to="/#contact">
            <PillButton variant="filled" tone="dark">
              Start a project →
            </PillButton>
          </Link>
        </div>
      </section>
    </>
  );
}
