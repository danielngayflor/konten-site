import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ServiceIcon from '../../ui/ServiceIcon';
import PillButton from '../../ui/PillButton';

const studioServices = [
  {
    slug: 'media-coverage',
    name: 'MEDIA & DOCUMENTARY',
    items: [
      'Event coverage',
      'Project documentation',
      'Impact films',
      'Documentary production',
      'Photography',
    ],
  },
  {
    slug: 'social-and-story',
    name: 'SOCIAL & STORY',
    items: [
      'Social media strategy',
      'Community management',
      'Storytelling integration',
      'Monthly performance reporting',
    ],
  },
  {
    slug: 'brand-and-comms',
    name: 'BRAND & COMMS',
    items: [
      'Brand strategy',
      'Visual identity',
      'Brand film',
      'Communications strategy',
      'Rebranding',
    ],
  },
  {
    slug: 'web-and-digital',
    name: 'WEB & DIGITAL',
    items: [
      'Website strategy',
      'Design & Development',
      'Copywriting',
      'Launch support',
      'Ongoing maintenance',
    ],
  },
  {
    slug: 'training-and-capacity',
    name: 'TRAINING & CAPACITY',
    items: [
      'Media training',
      'Content creation workshops',
      'Social media strategy sessions',
      'Storytelling for organisations',
      'Communications planning',
    ],
  },
  {
    slug: 'creator-studio',
    name: 'CREATOR STUDIO',
    items: [
      'Content strategy',
      'Scripting & hook writing',
      'Talking head production',
      'Short-form video editing',
      'Personal brand development',
    ],
  },
];

export default function StudioStatement() {
  const [hoverSlug, setHoverSlug] = useState<string | null>(null);
  const [pinnedSlug, setPinnedSlug] = useState<string | null>(null);

  const isActive = (slug: string) => hoverSlug === slug || pinnedSlug === slug;

  const handleMouseEnter = (slug: string) => setHoverSlug(slug);
  const handleMouseLeave = () => setHoverSlug(null);

  const handleClick = (slug: string) => {
    // On touch devices (no hover), toggle pinned state for accordion
    const isHoverDevice = window.matchMedia('(hover: hover)').matches;
    if (!isHoverDevice) {
      setPinnedSlug((prev) => (prev === slug ? null : slug));
    }
  };

  return (
    <section className="bg-konten-cream text-konten-black py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Intro copy */}
        <div className="mb-20 max-w-[620px]">
          <p className="font-inter text-[18px] md:text-[20px] leading-[1.7] text-konten-black">
            Konten is a creative agency specialising in video production, brand
            storytelling, social content, web development and creative
            direction. We work with brands, NGOs, startups, and creators who
            have something worth saying — and need a team that helps them say
            it well.
          </p>
        </div>

        {/* Service accordion */}
        <div className="border-t-[1.5px] border-konten-black">
          {studioServices.map((service) => {
            const active = isActive(service.slug);
            const hasItems = service.items.length > 0;

            return (
              <div
                key={service.slug}
                className={`border-b-[1.5px] border-konten-black transition-colors duration-200 select-none ${
                  active ? 'bg-konten-black/5' : 'hover:bg-konten-black/5'
                }`}
                onMouseEnter={() => handleMouseEnter(service.slug)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(service.slug)}
              >
                {/* Main row — always visible */}
                <div className="flex items-center justify-between py-6 md:py-8">
                  <h3 className="font-spartan font-black text-konten-black uppercase text-[clamp(2rem,7.5vw,6.5rem)] leading-none tracking-tight">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                    {/* Arrow indicator */}
                    <motion.span
                      className="font-inter text-konten-black/30 text-[20px] hidden sm:block"
                      animate={{ rotate: active ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      ↓
                    </motion.span>
                    <div className="text-konten-blue">
                      <ServiceIcon slug={service.slug} size={56} />
                    </div>
                  </div>
                </div>

                {/* Expandable sub-content */}
                <AnimatePresence initial={false}>
                  {active && hasItems && (
                    <motion.div
                      key="expanded"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.25, 0, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-4 md:pl-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                        {/* Service items */}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-3">
                          {service.items.map((item, i) => (
                            <motion.li
                              key={item}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: i * 0.055,
                                duration: 0.25,
                                ease: 'easeOut',
                              }}
                              className="font-inter text-[16px] md:text-[18px] text-konten-black flex items-center gap-3"
                            >
                              <span className="w-[7px] h-[7px] rounded-full bg-konten-blue flex-shrink-0" />
                              {item}
                            </motion.li>
                          ))}
                        </ul>

                        {/* Learn more CTA */}
                        <Link
                          to={`/services#${service.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-shrink-0"
                        >
                          <PillButton variant="filled" tone="blue">
                            Learn more →
                          </PillButton>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-16">
          <Link to="/services">
            <PillButton variant="outline" tone="dark">
              Work with Konten →
            </PillButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
