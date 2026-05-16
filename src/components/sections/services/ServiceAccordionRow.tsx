import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import type { Service } from '../../../data/services';
import ServiceIcon from '../../ui/ServiceIcon';
import Clapperboard from '../../ui/Clapperboard';

interface ServiceAccordionRowProps {
  service: Service;
}

export default function ServiceAccordionRow({ service }: ServiceAccordionRowProps) {
  const { hash } = useLocation();

  // Pre-open if the URL hash targets this service (e.g. navigating from home "Learn more →")
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(() => hash === `#${service.slug}`);
  const isActive = hovered || pinned;

  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches) setHovered(true);
  };
  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) setHovered(false);
  };
  const handleClick = () => {
    if (!window.matchMedia('(hover: hover)').matches) {
      setPinned((p) => !p);
    }
  };

  const isCream      = service.sectionBg === 'cream';
  const bg           = isCream ? 'bg-konten-cream' : 'bg-konten-black';
  const text         = isCream ? 'text-konten-black' : 'text-konten-cream';
  const border       = isCream ? 'border-konten-black' : 'border-konten-cream';
  const accent       = isCream ? 'text-konten-blue'   : 'text-konten-cream';
  const iconCol      = isCream ? 'text-konten-blue'   : 'text-konten-cream';
  const muted        = isCream ? 'text-konten-black/55' : 'text-konten-cream/55';
  const rowHoverBg   = isCream ? 'hover:bg-konten-black/[0.03]' : 'hover:bg-konten-cream/[0.04]';
  const activeBg     = isCream ? 'bg-konten-black/[0.03]' : 'bg-konten-cream/[0.04]';
  const outlineBtn   = isCream
    ? 'border-konten-black text-konten-black hover:bg-konten-black hover:text-konten-cream'
    : 'border-konten-cream text-konten-cream hover:bg-konten-cream hover:text-konten-black';

  return (
    <section
      id={service.slug}
      className={`${bg} ${text} px-6 md:px-12`}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`border-t-[1.5px] ${border} cursor-pointer select-none transition-colors duration-200 ${
            isActive ? activeBg : rowHoverBg
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >

          {/* ── Collapsed header row ── */}
          <div className="flex items-center justify-between py-10 md:py-14">
            <h2 className={`font-spartan font-black uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)] ${text}`}>
              {service.name}
            </h2>
            <div className="flex items-center gap-4 flex-shrink-0 ml-4">
              <motion.span
                className={`font-inter text-[20px] hidden sm:block ${isCream ? 'text-konten-black/25' : 'text-konten-cream/25'}`}
                animate={{ rotate: isActive ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                ↓
              </motion.span>
              <div className={iconCol}>
                <ServiceIcon slug={service.iconSlug} size={56} />
              </div>
            </div>
          </div>

          {/* ── Expanded detail panel ── */}
          <AnimatePresence initial={false}>
            {isActive && (
              <motion.div
                key="expanded"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.25, 0, 0, 1] }}
                className="overflow-hidden"
              >
                <div className="pl-4 md:pl-8 pb-14">

                  {/* Tagline */}
                  <h3 className={`font-spartan font-black uppercase leading-none tracking-tighter text-[clamp(1.8rem,4vw,4rem)] mb-8 ${text}`}>
                    {service.taglineLines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < service.taglineLines.length - 1 && <br />}
                      </span>
                    ))}
                  </h3>

                  {/* Two-column: intro + metadata | whats included */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">

                    {/* Left: intro + who/how */}
                    <div>
                      <p className={`font-inter text-[15px] md:text-[17px] leading-body mb-8 ${text}`}>
                        {service.intro}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                          <h5 className={`text-eyebrow ${accent} mb-2 inline-flex items-center gap-2`}>
                            WHO IT'S FOR <Clapperboard size={11} />
                          </h5>
                          <p className={`font-inter text-[13px] leading-body ${text}`}>
                            {service.whoItsFor}
                          </p>
                        </div>
                        <div>
                          <h5 className={`text-eyebrow ${accent} mb-2 inline-flex items-center gap-2`}>
                            HOW WE ENGAGE <Clapperboard size={11} />
                          </h5>
                          <p className={`font-inter text-[13px] leading-body ${text}`}>
                            {service.howWeEngage}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: what's included */}
                    <div>
                      <h4 className={`font-spartan font-black uppercase text-[1.4rem] tracking-tight mb-5 inline-flex items-center gap-2 ${text}`}>
                        WHAT'S INCLUDED <Clapperboard size={16} className={iconCol} />
                      </h4>
                      <ul className="space-y-3">
                        {service.whatsIncluded.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.25 }}
                            className={`flex items-start gap-3 font-inter text-[14px] md:text-[15px] ${text}`}
                          >
                            <span className="w-[6px] h-[6px] rounded-full bg-konten-blue flex-shrink-0 mt-[6px]" />
                            <span>
                              <strong>{item.lead}</strong>
                              <span className={muted}> — {item.description}</span>
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-4" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="px-8 py-[12px] bg-konten-blue text-konten-cream font-inter font-500 text-[12px] uppercase tracking-wide rounded-full hover:opacity-85 transition-opacity"
                      onClick={() =>
                        document.getElementById('discovery')?.scrollIntoView({ behavior: 'smooth' })
                      }
                    >
                      Book this service →
                    </button>
                    <Link
                      to={`/work?service=${service.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className={`px-8 py-[12px] border-[1.5px] font-inter font-500 text-[12px] uppercase tracking-wide rounded-full transition-all inline-block ${outlineBtn}`}
                    >
                      See example work →
                    </Link>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
        {/* Bottom border seals the row */}
        <div className={`border-b-[1.5px] ${border}`} />
      </div>
    </section>
  );
}
