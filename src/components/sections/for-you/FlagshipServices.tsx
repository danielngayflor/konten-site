import { useState } from 'react';
import { Link } from 'react-router-dom';
import BookingModal from '../../ui/BookingModal';
import LazyImage from '../../ui/LazyImage';

const serviceImages: Record<string, { src: string; alt: string }[]> = {
  media: [
    { src: '/images/Media%20Coverage%20and%20Documentary/DSC00334.jpg', alt: 'Field coverage' },
  ],
  social: [
    { src: '/images/Storytelling%20for%20Social%20Media/62.jpg', alt: 'Brand content' },
  ],
  creator: [
    { src: '/images/Creators%20Studio/Still%202026-01-07%20151651_2.1.1.png', alt: 'Creator Studio session' },
  ],
};

function ServiceImages({ id }: { id: string }) {
  const imgs = serviceImages[id] ?? [];
  if (imgs.length === 0) return null;

  if (imgs.length === 1) {
    return (
      <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden">
        <LazyImage src={imgs[0].src} alt={imgs[0].alt} className="object-cover" />
      </div>
    );
  }

  return (
    <div className="w-full aspect-[4/5] grid grid-cols-[2fr_1fr] gap-3">
      <div className="rounded-2xl overflow-hidden">
        <LazyImage src={imgs[0].src} alt={imgs[0].alt} className="object-cover" />
      </div>
      <div className="flex flex-col gap-3">
        {imgs.slice(1).map((img, i) => (
          <div key={i} className="flex-1 rounded-2xl overflow-hidden">
            <LazyImage src={img.src} alt={img.alt} className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

const services = [
  {
    id: 'media',
    workSlug: 'media-coverage',
    audience: 'For NGOs, Embassies & Development Organisations',
    name: 'Media Coverage\n& Documentary',
    tagline: 'You do the work. We make sure the world sees it.',
    body: 'Event coverage, project documentation, impact films, documentary production, editorial photography — built from time spent in the field with the people your work actually serves. Quoted per event, project, or campaign.',
    bg: 'bg-charcoal',
  },
  {
    id: 'social',
    workSlug: 'social-and-story',
    audience: 'For Brands, Startups & Growing Businesses',
    name: 'Storytelling for\nSocial Media',
    tagline: 'Consistent content. A clear narrative. A reason to keep scrolling.',
    body: 'Strategy, content creation, community management, and a narrative that ties every post together — built for brands that need to show up online consistently and well. Retainer-based, minimum three-month engagement.',
    bg: 'bg-konten-black',
  },
  {
    id: 'creator',
    workSlug: 'creator-studio',
    audience: 'For Founders, Creators & Public Figures',
    name: 'Creator\nStudio',
    tagline: "You've got something to say. We help you say it right.",
    body: 'Content strategy, scripting, talking-head production, short-form editing, and personal brand development — for people with a point of view worth building an audience around. Includes our growing slate of original audio and video shows, starting with For The Record. Retainer-based. We work with a small number of creators at a time so every client gets real attention.',
    bg: 'bg-charcoal',
  },
];

type ModalState = { serviceValue: string; serviceName: string } | null;

export default function FlagshipServices() {
  const [modal, setModal] = useState<ModalState>(null);

  return (
    <>
      {services.map((s) => (
        <section key={s.id} id={s.id} className={`${s.bg} text-white py-32 md:py-40 px-6 md:px-12`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start">

              {/* Left: text — on mobile, appears below the image */}
              <div className="order-2 lg:order-1">
                <p className="text-eyebrow text-mid-gray mb-10">{s.audience}</p>
                <h2
                  className="font-spartan font-black text-white uppercase leading-none tracking-tighter mb-6"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 5.5rem)' }}
                >
                  {s.name.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < s.name.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </h2>
                <p
                  className="font-display text-white/60 leading-[1.2] tracking-tight mb-8"
                  style={{ fontSize: 'clamp(1.2rem, 2.2vw, 2rem)' }}
                >
                  {s.tagline}
                </p>
                <p className="font-body text-body-lg text-white/60 leading-[1.65] mb-10">
                  {s.body}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setModal({ serviceValue: s.workSlug, serviceName: s.name.replace('\n', ' ') })}
                    className="inline-flex items-center px-8 py-3 bg-konten-blue text-white font-spartan font-700 text-[12px] uppercase tracking-widest rounded-full hover:bg-konten-blue transition-colors duration-200 cursor-pointer"
                  >
                    I want this →
                  </button>
                  <Link
                    to={`/featured-projects?service=${s.workSlug}`}
                    className="inline-flex items-center px-8 py-3 border border-white/25 text-white/80 font-spartan font-700 text-[12px] uppercase tracking-widest rounded-full hover:border-white/60 hover:text-white transition-colors duration-200"
                  >
                    See example work
                  </Link>
                </div>
              </div>

              {/* Right: service images — on mobile, appears first */}
              <div className="order-1 lg:order-2">
                <ServiceImages id={s.id} />
              </div>

            </div>
          </div>
        </section>
      ))}

      {modal && (
        <BookingModal
          serviceValue={modal.serviceValue}
          serviceName={modal.serviceName}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
