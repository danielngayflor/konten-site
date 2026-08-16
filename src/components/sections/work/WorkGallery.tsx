import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { WorkProject } from '../../../data/workPlaceholders';
import type { ServiceSlug } from '../../../lib/icons';
import Clapperboard from '../../ui/Clapperboard';
import ServiceIcon from '../../ui/ServiceIcon';
import LazyImage from '../../ui/LazyImage';

const SERVICE_LABELS: Partial<Record<ServiceSlug, string>> = {
  'media-coverage':   'MEDIA & DOC',
  'social-and-story': 'SOCIAL & STORY',
  'creator-studio':   'CREATOR STUDIO',
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
    <section className="bg-charcoal py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-16">
          <FilterPill label="ALL" active={active === 'all'} onClick={() => handleFilter('all')} />
          {services.map((slug) => (
            <FilterPill
              key={slug}
              label={SERVICE_LABELS[slug] ?? slug}
              active={active === slug}
              onClick={() => handleFilter(slug)}
            />
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {filtered.map((project) => (
            <Link
              key={project.slug}
              to={`/featured-projects/${project.slug}`}
              className="group block"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5 transition-transform duration-500 group-hover:scale-105">
                {project.coverImage ? (
                  <LazyImage
                    src={project.coverImage}
                    alt={project.title}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-dark-gray flex items-center justify-center">
                    <ServiceIcon
                      slug={project.serviceSlug}
                      size={64}
                      className="text-mid-gray opacity-40"
                    />
                  </div>
                )}

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 bg-konten-blue/90 flex flex-col justify-end p-6
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <p className="text-eyebrow text-konten-cream/70 mb-3 flex items-center gap-2">
                    {project.serviceName} <Clapperboard size={10} />
                  </p>
                  <h3 className="font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter text-[clamp(1.4rem,2.5vw,2rem)] mb-3">
                    {project.title}
                  </h3>
                  <p className="font-body text-konten-cream/75 text-[14px] leading-snug mb-5 line-clamp-2">
                    {project.description}
                  </p>
                  <span className="font-spartan font-700 text-[12px] uppercase tracking-widest text-konten-cream border-b border-konten-cream/40 pb-0.5 self-start">
                    View project →
                  </span>
                </div>
              </div>

              {/* Caption */}
              <p className="text-eyebrow text-mid-gray mb-2">
                {project.client} · {project.year}
              </p>
              <h3 className="font-spartan font-black text-white uppercase leading-none tracking-tighter text-[clamp(1.1rem,2vw,1.5rem)]">
                {project.title}
              </h3>
            </Link>
          ))}
        </div>

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
