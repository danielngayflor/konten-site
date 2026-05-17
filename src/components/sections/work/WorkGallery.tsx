import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { WorkProject } from '../../../data/workPlaceholders';
import type { ServiceSlug } from '../../../lib/icons';
import Clapperboard from '../../ui/Clapperboard';
import ServiceIcon from '../../ui/ServiceIcon';

// Short display labels for filter pills
const SERVICE_LABELS: Record<ServiceSlug, string> = {
  'media-coverage':        'MEDIA & DOC',
  'social-and-story':      'SOCIAL & STORY',
  'brand-and-comms':       'BRAND & COMMS',
  'web-and-digital':       'WEB & DIGITAL',
  'training-and-capacity': 'TRAINING',
  'creator-studio':        'CREATOR STUDIO',
};

// Fixed ordering for filter pills — only shown if present in data
const SERVICE_ORDER: ServiceSlug[] = [
  'media-coverage',
  'social-and-story',
  'brand-and-comms',
  'web-and-digital',
  'training-and-capacity',
  'creator-studio',
];

// Alternating polaroid tilts — repeats for any number of cards
const ROTATIONS = [-2, 1.5, -1.5, 2.5, -2.5, 1, -1, 2];

interface WorkGalleryProps {
  projects: WorkProject[];
}

export default function WorkGallery({ projects }: WorkGalleryProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialise from ?service= query param (set by "See example work" links on the Services page)
  const paramSlug = searchParams.get('service') as ServiceSlug | null;
  const validSlug =
    paramSlug && SERVICE_ORDER.includes(paramSlug) ? paramSlug : null;

  const [active, setActive] = useState<'all' | ServiceSlug>(validSlug ?? 'all');

  // Keep state in sync if the URL param changes (e.g. browser back/forward)
  useEffect(() => {
    const s = searchParams.get('service') as ServiceSlug | null;
    if (s && SERVICE_ORDER.includes(s)) {
      setActive(s);
    } else {
      setActive('all');
    }
  }, [searchParams]);

  // Only show filter pills for services that appear in the data
  const presentSlugs = new Set(projects.map((p) => p.serviceSlug));
  const services = SERVICE_ORDER.filter((s) => presentSlugs.has(s));

  /** Update active filter and reflect in the URL */
  function handleFilter(slug: 'all' | ServiceSlug) {
    setActive(slug);
    if (slug === 'all') {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ service: slug }, { replace: true });
    }
  }

  const filtered =
    active === 'all' ? projects : projects.filter((p) => p.serviceSlug === active);

  return (
    <section className="bg-konten-black py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* ── Filter pills ─────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-16">
          <FilterPill
            label="ALL"
            active={active === 'all'}
            onClick={() => handleFilter('all')}
          />
          {services.map((slug) => (
            <FilterPill
              key={slug}
              label={SERVICE_LABELS[slug]}
              active={active === slug}
              onClick={() => handleFilter(slug)}
            />
          ))}
        </div>

        {/* ── Gallery grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-14">
          {filtered.map((project, i) => {
            const rotation = ROTATIONS[i % ROTATIONS.length];
            return (
              <Link
                key={project.slug}
                to={`/work/${project.slug}`}
                className="relative z-0 hover:z-10 group block"
              >
                {/* Film metadata strip — above the frame, matches homepage pattern */}
                <p className="font-mono text-[9px] uppercase tracking-widest text-konten-cream/35 mb-2 truncate">
                  {project.metadataStrip}
                </p>

                {/* Polaroid frame — white border + shadow + tilt */}
                <div
                  className="bg-white p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.45)] transition-shadow duration-300 group-hover:shadow-[0_10px_40px_rgba(0,0,0,0.7)]"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {/* Photo area with hover overlay */}
                  <div className="relative overflow-hidden aspect-[3/4]">

                    {/* Cover image, icon placeholder (explicit only), or gradient */}
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : project.iconSlug ? (
                      <div className="absolute inset-0 bg-konten-blue flex flex-col items-center justify-center gap-3 px-4">
                        <ServiceIcon
                          slug={project.iconSlug}
                          size={64}
                          className="text-konten-cream opacity-70"
                        />
                        <p className="font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter text-[clamp(1rem,2vw,1.4rem)] text-center">
                          {project.title}
                        </p>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-konten-blue/40 via-konten-black/50 to-konten-black" />
                    )}

                    {/* Hover overlay — slides up from bottom */}
                    <div
                      className="absolute inset-0 bg-konten-blue flex flex-col justify-end p-4
                                 translate-y-full group-hover:translate-y-0
                                 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    >
                      <p className="font-inter font-medium text-[11px] uppercase tracking-widest text-konten-cream/65 mb-3 flex items-center gap-1.5">
                        {project.serviceName} <Clapperboard size={9} />
                      </p>
                      <h3 className="font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter text-[clamp(1.3rem,2.2vw,1.7rem)] mb-2">
                        {project.title}
                      </h3>
                      <p className="font-inter text-konten-cream/50 text-[12px] uppercase tracking-widest mb-3">
                        {project.client} · {project.year}
                      </p>
                      <p className="font-inter text-konten-cream/80 text-[14px] leading-snug mb-5 line-clamp-3">
                        {project.description}
                      </p>
                      <span className="inline-flex items-center gap-1 self-start font-inter text-konten-cream text-[13px] font-medium tracking-wide border-b border-konten-cream/40 pb-0.5">
                        View project →
                      </span>
                    </div>
                  </div>

                  {/* Caption — hidden on icon cards (title is inside the photo area) */}
                  {!project.iconSlug && (
                    <p className="font-inter text-[9px] text-konten-black/35 text-center mt-2 leading-tight truncate px-1">
                      {project.title}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* ── Filter pill sub-component ─────────────────────────────────────── */
function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full font-inter text-[13px] font-medium uppercase tracking-widest
                  transition-colors duration-200 cursor-pointer ${
                    active
                      ? 'bg-konten-cream text-konten-black'
                      : 'border border-konten-cream/25 text-konten-cream/55 hover:border-konten-cream/55 hover:text-konten-cream'
                  }`}
    >
      {label}
    </button>
  );
}
