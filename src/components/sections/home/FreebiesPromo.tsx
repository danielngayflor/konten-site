import { Link } from 'react-router-dom';
import { resources, TYPE_LABELS } from '../../../data/resources';
import Clapperboard from '../../ui/Clapperboard';
import PillButton from '../../ui/PillButton';

export default function FreebiesPromo() {
  const featured = resources.slice(0, 3);

  return (
    <section className="bg-konten-blue text-konten-cream py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter text-[clamp(2.5rem,7.5vw,6.5rem)]">
            FREE RESOURCE
            <br />
            FOR YOU.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featured.map((resource) => (
            <Link
              key={resource.slug}
              to={`/freebies/${resource.slug}`}
              className="group flex flex-col bg-konten-cream text-konten-black overflow-hidden hover:-translate-y-1 transition-transform duration-200"
            >
              {/* Image */}
              {resource.coverImage && (
                <div className="w-full aspect-[16/9] overflow-hidden bg-konten-black/20">
                  <img
                    src={resource.coverImage}
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Card content */}
              <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-3">
                <span className="inline-flex items-center gap-1.5 w-fit px-3 py-1 bg-konten-blue text-konten-cream font-inter font-500 text-[10px] uppercase tracking-wide rounded-full">
                  <Clapperboard size={10} />
                  {TYPE_LABELS[resource.type]}
                </span>
                <h3 className="font-spartan font-black text-konten-black uppercase leading-none tracking-tighter text-[clamp(1.2rem,2vw,1.6rem)]">
                  {resource.title}
                </h3>
                <p className="font-inter text-[13px] leading-body text-konten-black/60 flex-1 line-clamp-2">
                  {resource.summary}
                </p>
                <span className="font-inter font-500 text-[12px] text-konten-black/50 group-hover:text-konten-black transition-colors">
                  {resource.readTime} · Read →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link to="/freebies">
            <PillButton variant="outline" tone="light">
              Browse all freebies →
            </PillButton>
          </Link>
        </div>

      </div>
    </section>
  );
}
