import { Link } from 'react-router-dom';
import type { WorkProject } from '../../../data/workPlaceholders';
import Polaroid from '../../ui/Polaroid';
import FilmMetadata from '../../ui/FilmMetadata';
import Clapperboard from '../../ui/Clapperboard';
import PillButton from '../../ui/PillButton';

interface ProjectSpreadProps {
  project: WorkProject;
  index: number;
}

export default function ProjectSpread({ project, index }: ProjectSpreadProps) {
  const isCream = project.sectionBg === 'cream';
  const sectionBgClass = isCream
    ? 'bg-konten-cream text-konten-black'
    : 'bg-konten-black text-konten-cream';
  const accentColor = isCream ? 'text-konten-blue' : 'text-konten-blue';
  const subheadColor = isCream ? 'text-konten-black/60' : 'text-konten-cream/60';
  const tone = isCream ? 'dark' : 'light';
  const polaroidLeft = index % 2 === 0;
  const rotation = polaroidLeft ? -2 : 2;

  return (
    <section
      className={`${sectionBgClass} py-32 md:py-40 px-6 md:px-12 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            polaroidLeft ? '' : 'lg:[direction:rtl]'
          }`}
        >
          {/* Polaroid column */}
          <div className={`${polaroidLeft ? '' : 'lg:[direction:ltr]'}`}>
            <FilmMetadata
              text={project.metadataStrip}
              className={`mb-3 ${
                isCream ? 'text-konten-black' : 'text-konten-cream'
              }`}
            />
            <div className="max-w-md mx-auto lg:mx-0">
              <Polaroid rotation={rotation}>
                <div className="w-full h-full bg-gradient-to-br from-konten-blue/40 to-konten-black/30 flex items-center justify-center">
                  <span className="font-spartan font-black text-konten-cream/40 text-[5rem]">
                    {project.projectNumber}
                  </span>
                </div>
              </Polaroid>
            </div>
          </div>

          {/* Project info column */}
          <div className={`${polaroidLeft ? '' : 'lg:[direction:ltr]'}`}>
            <span
              className={`text-eyebrow ${accentColor} mb-6 inline-flex items-center gap-2`}
            >
              {project.serviceName} <Clapperboard size={14} />
            </span>
            <h2
              className={`font-spartan font-black uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)] mb-6 ${
                isCream ? 'text-konten-black' : 'text-konten-cream'
              }`}
            >
              {project.title}
            </h2>
            <p
              className={`font-inter text-[16px] uppercase tracking-wide font-500 mb-6 ${
                isCream ? 'text-konten-black/80' : 'text-konten-cream/80'
              }`}
            >
              {project.client} · {project.year}
            </p>
            <p
              className={`font-inter text-body-lg leading-body mb-10 max-w-[480px] ${subheadColor}`}
            >
              {project.description}
            </p>
            <Link to={`/work/${project.slug}`}>
              <PillButton variant="outline" tone={tone}>
                View project →
              </PillButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
