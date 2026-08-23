// WorkGallery.tsx — grid of home-style polaroid cards on dark canvas
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { WorkProject } from '../../../data/workPlaceholders';
import type { ServiceSlug } from '../../../lib/icons';

const FOLD = 40;

const SERVICE_LABELS: Partial<Record<ServiceSlug, string>> = {
  'media-coverage':   'Media & Doc',
  'social-and-story': 'Social & Story',
  'creator-studio':   'Creator Studio',
};

const SERVICE_ORDER: ServiceSlug[] = [
  'media-coverage',
  'social-and-story',
  'creator-studio',
];

interface WorkGalleryProps {
  projects: WorkProject[];
}

export default function WorkGallery({ projects }: WorkGalleryProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramSlug = searchParams.get('service') as ServiceSlug | null;
  const validSlug = paramSlug && SERVICE_ORDER.includes(paramSlug) ? paramSlug : null;
  const [active, setActive] = useState<'all' | ServiceSlug>(validSlug ?? 'all');

  useEffect(() => {
    const s = searchParams.get('service') as ServiceSlug | null;
    if (s && SERVICE_ORDER.includes(s)) {
      setActive(s);
    } else {
      setActive('all');
    }
  }, [searchParams]);

  const presentSlugs = new Set(projects.map((p) => p.serviceSlug));
  const services = SERVICE_ORDER.filter((s) => presentSlugs.has(s));

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
    <section className="text-white py-10 md:py-14 px-6 sm:px-10">

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10 max-w-[1400px] mx-auto">
        <FilterPill label="All" active={active === 'all'} onClick={() => handleFilter('all')} />
        {services.map((slug) => (
          <FilterPill
            key={slug}
            label={SERVICE_LABELS[slug] ?? slug}
            active={active === slug}
            onClick={() => handleFilter(slug)}
          />
        ))}
      </div>

      {/* Card grid — same card as home SelectedWorkPreview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 max-w-[1400px] mx-auto">
        {filtered.map((project) => (
          <Link
            key={project.slug}
            to={`/featured-projects/${project.slug}`}
            className="group flex flex-col
                       bg-white hover:bg-konten-cream
                       transition-all duration-500 ease-out
                       hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)]"
            style={{ padding: '10px' }}
          >
            {/* Image — 4:3, top-left dog-ear fold */}
            <div
              className="w-full overflow-hidden"
              style={{
                aspectRatio: '4 / 3',
                clipPath: `polygon(${FOLD}px 0, 100% 0, 100% 100%, 0 100%, 0 ${FOLD}px)`,
              }}
            >
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={project.client}
                  className="w-full h-full object-cover transition-all duration-500
                             grayscale group-hover:grayscale-0
                             scale-100 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-full bg-konten-blue" />
              )}
            </div>

            {/* Caption — inherits card bg (white → cream on hover) */}
            <div className="pt-4 pb-2 px-1">
              <p
                className="font-spartan font-semibold text-konten-black leading-tight"
                style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)' }}
              >
                {project.client}
              </p>
              <p className="font-body text-black/40 text-[13px] mt-1 leading-snug line-clamp-1">
                {project.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}

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
      className={`px-5 py-2 rounded-full font-spartan font-700 text-[12px] uppercase tracking-widest
                  transition-colors duration-200 cursor-pointer ${
                    active
                      ? 'bg-konten-blue text-white'
                      : 'border border-white/20 text-white/50 hover:border-white/40 hover:text-white/80'
                  }`}
    >
      {label}
    </button>
  );
}
