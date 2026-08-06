import { Link } from 'react-router-dom';
import type { Service } from '../../../data/services';
import ServiceIcon from '../../ui/ServiceIcon';
import Polaroid from '../../ui/Polaroid';
import FilmMetadata from '../../ui/FilmMetadata';
import Clapperboard from '../../ui/Clapperboard';
import PillButton from '../../ui/PillButton';

interface ServiceSpreadProps {
  service: Service;
  textColumnSide?: 'left' | 'right';
  index: number;
}

export default function ServiceSpread({
  service,
  textColumnSide = 'left',
  index,
}: ServiceSpreadProps) {
  const isCream = service.sectionBg === 'cream';
  const sectionBgClass = isCream
    ? 'bg-konten-cream text-konten-black'
    : 'bg-konten-black text-konten-cream';
  const accentColor = isCream ? 'text-konten-blue' : 'text-konten-cream';
  const dividerClass = isCream ? 'border-konten-black/30' : 'border-konten-cream/30';
  const iconColor = isCream ? 'text-konten-blue' : 'text-konten-cream';
  const subheadColor = isCream ? 'text-konten-black/60' : 'text-konten-cream/60';
  const tone = isCream ? 'dark' : 'light';

  return (
    <section id={service.slug} className={sectionBgClass}>
      {/* Block A: Service Header */}
      <div className="py-32 md:py-40 px-6 md:px-12 flex flex-col items-center text-center">
        <p
          className={`text-eyebrow ${accentColor} mb-12 inline-flex items-center gap-2`}
        >
          {service.tags}
        </p>

        <div className={`${iconColor} mb-8`}>
          <ServiceIcon slug={service.iconSlug} size={280} />
        </div>

        <h2
          className={`font-spartan font-black uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)] max-w-6xl ${
            isCream ? 'text-konten-black' : 'text-konten-cream'
          }`}
        >
          {service.name}
        </h2>
      </div>

      {/* Block B: Service Details */}
      <div className="pb-32 md:pb-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 ${
              textColumnSide === 'right' ? 'lg:[direction:rtl]' : ''
            }`}
          >
            {/* Text column */}
            <div
              className={`${
                textColumnSide === 'right' ? 'lg:[direction:ltr]' : ''
              }`}
            >
              <h3
                className={`font-spartan font-black uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)] mb-12 ${
                  isCream ? 'text-konten-black' : 'text-konten-cream'
                }`}
              >
                {service.taglineLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < service.taglineLines.length - 1 && <br />}
                  </span>
                ))}
              </h3>

              <p
                className={`font-inter text-body-lg leading-body mb-10 ${
                  isCream ? 'text-konten-black' : 'text-konten-cream'
                }`}
              >
                {service.intro}
              </p>

              <hr className={`${dividerClass} my-10`} />

              <h4
                className={`font-spartan font-black uppercase text-[1.5rem] md:text-[2rem] tracking-tight mb-6 inline-flex items-center gap-2 ${
                  isCream ? 'text-konten-black' : 'text-konten-cream'
                }`}
              >
                WHAT'S INCLUDED <Clapperboard size={20} className={iconColor} />
              </h4>

              <ul className="space-y-4 mb-12">
                {service.whatsIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Clapperboard
                      size={16}
                      className={`${iconColor} mt-1 flex-shrink-0`}
                    />
                    <span
                      className={`font-inter text-body-lg leading-body ${
                        isCream ? 'text-konten-black' : 'text-konten-cream'
                      }`}
                    >
                      <strong className="font-600">{item.lead}</strong>
                      <span className={subheadColor}> — {item.description}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h5
                    className={`text-eyebrow ${accentColor} mb-3 inline-flex items-center gap-2`}
                  >
                    WHO IT'S FOR <Clapperboard size={12} />
                  </h5>
                  <p
                    className={`font-inter text-[14px] leading-body ${
                      isCream ? 'text-konten-black' : 'text-konten-cream'
                    }`}
                  >
                    {service.whoItsFor}
                  </p>
                </div>
                <div>
                  <h5
                    className={`text-eyebrow ${accentColor} mb-3 inline-flex items-center gap-2`}
                  >
                    HOW WE ENGAGE <Clapperboard size={12} />
                  </h5>
                  <p
                    className={`font-inter text-[14px] leading-body ${
                      isCream ? 'text-konten-black' : 'text-konten-cream'
                    }`}
                  >
                    {service.howWeEngage}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className={`px-8 py-[12px] bg-konten-blue text-konten-cream font-inter font-500 text-[12px] uppercase tracking-wide rounded-full hover:opacity-85 transition-opacity`}
                  onClick={() => {
                    document
                      .getElementById('discovery')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Book this service →
                </button>
                <Link to={`/work?service=${service.slug}`}>
                  <PillButton variant="outline" tone={tone}>
                    See example work →
                  </PillButton>
                </Link>
              </div>
            </div>

            {/* Collage column */}
            <div
              className={`relative min-h-[500px] flex items-center justify-center ${
                textColumnSide === 'right' ? 'lg:[direction:ltr]' : ''
              }`}
            >
              <div className="relative w-full max-w-md">
                <FilmMetadata
                  text={service.metadataStrip}
                  className={`mb-3 ${
                    isCream ? 'text-konten-black' : 'text-konten-cream'
                  }`}
                />
                <Polaroid rotation={index % 2 === 0 ? 3 : -3}>
                  <div className="w-full h-full bg-gradient-to-br from-konten-blue/40 to-konten-black/30 flex items-center justify-center">
                    <span className="font-spartan font-black text-konten-cream/40 text-[4rem]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </Polaroid>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
