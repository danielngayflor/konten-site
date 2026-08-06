import { useState } from 'react';
import { Link } from 'react-router-dom';
import { resources, TYPE_LABELS, type ResourceType } from '../../../data/resources';
import Clapperboard from '../../ui/Clapperboard';

type FilterTab = 'all' | ResourceType;

const TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'article', label: 'Articles' },
  { key: 'cheat-sheet', label: 'Cheat Sheets' },
  { key: 'white-paper', label: 'White Papers' },
];

export default function ResourceGrid() {
  const [active, setActive] = useState<FilterTab>('all');

  const filtered = active === 'all'
    ? resources
    : resources.filter((r) => r.type === active);

  return (
    <section className="bg-konten-cream text-konten-black py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mb-16">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-6 py-[10px] rounded-full font-inter font-500 text-[12px] uppercase tracking-wide border-[1.5px] transition-all duration-200 ${
                active === key
                  ? 'bg-konten-black text-konten-cream border-konten-black'
                  : 'bg-transparent text-konten-black border-konten-black/30 hover:border-konten-black'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((resource) => (
            <Link
              key={resource.slug}
              to={`/freebies/${resource.slug}`}
              className="group flex flex-col border-[1.5px] border-konten-black/15 hover:border-konten-black/50 bg-konten-cream transition-all duration-200 hover:-translate-y-1 overflow-hidden"
            >
              {/* Cover image */}
              {resource.coverImage && (
                <div className="w-full aspect-[16/9] overflow-hidden bg-konten-black/10">
                  <img
                    src={resource.coverImage}
                    alt={resource.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Type pill */}
              <div className="px-6 pt-5 pb-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-konten-blue text-konten-cream font-inter font-500 text-[13px] uppercase tracking-wide rounded-full">
                  <Clapperboard size={11} />
                  {TYPE_LABELS[resource.type]}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 px-6 pt-5 pb-6 gap-4">
                <h3 className="font-spartan font-black text-konten-black uppercase leading-none tracking-tighter text-[clamp(1.5rem,2.5vw,2rem)]">
                  {resource.title}
                </h3>
                <p className="font-inter text-body-lg leading-body text-konten-black/70 flex-1">
                  {resource.summary}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-konten-black/10">
                  <span className="font-inter text-[14px] text-konten-black/50 uppercase tracking-wide">
                    {resource.readTime} · {resource.publishedAt}
                  </span>
                  <span className="font-inter font-500 text-[15px] text-konten-black group-hover:translate-x-1 transition-transform duration-200">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="font-inter text-konten-black/40 text-[16px] text-center py-20">
            Nothing here yet — check back soon.
          </p>
        )}

      </div>
    </section>
  );
}
