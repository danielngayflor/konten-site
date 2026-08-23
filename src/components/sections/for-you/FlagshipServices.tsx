// FlagshipServices.tsx — full-detail polaroid cards, matching Featured Projects style
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BookingModal from '../../ui/BookingModal';
import LazyImage from '../../ui/LazyImage';

const FOLD = 40;

const services = [
  {
    id: 'media',
    workSlug: 'media-coverage',
    audience: 'For NGOs, Embassies & Development Orgs',
    name: 'Media Coverage\n& Documentary',
    tagline: 'You do the work. We make sure the world sees it.',
    body: 'Event coverage, project documentation, impact films, documentary production, and editorial photography built from time spent in the field with the people your work actually serves. Quoted per event, project, or campaign.',
    image: { src: '/images/Media%20Coverage%20and%20Documentary/DSC00334.jpg', alt: 'Field coverage' },
  },
  {
    id: 'social',
    workSlug: 'social-and-story',
    audience: 'For Brands, Startups & Growing Businesses',
    name: 'Storytelling for\nSocial Media',
    tagline: 'Consistent content. A clear narrative. A reason to keep scrolling.',
    body: 'Strategy, content creation, community management, and a narrative that ties every post together built for brands that need to show up online consistently and well. Retainer-based, minimum three-month engagement.',
    image: { src: '/images/Storytelling%20for%20Social%20Media/62.jpg', alt: 'Brand content' },
  },
  {
    id: 'creator',
    workSlug: 'creator-studio',
    audience: 'For Founders, Creators & Public Figures',
    name: 'Creator\nStudio',
    tagline: "You've got something to say. We help you say it right.",
    body: 'Content strategy, scripting, talking-head production, short-form editing, and personal brand development for people with a point of view worth building an audience around. Retainer-based. We work with a small number of creators at a time so every client gets real attention.',
    image: { src: '/images/Creators%20Studio/Still%202026-01-07%20151651_2.1.1.png', alt: 'Creator Studio' },
  },
];

type ModalState = { serviceValue: string; serviceName: string } | null;

export default function FlagshipServices() {
  const [modal, setModal] = useState<ModalState>(null);

  return (
    <>
      <section className="text-white py-10 md:py-14 px-6 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
          {services.map((s) => (
            <div
              key={s.id}
              className="group flex flex-col bg-white
                         transition-all duration-500 ease-out
                         hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)]"
              style={{ padding: '10px' }}
            >
              {/* Image — 4:3, dog-ear fold */}
              <div
                className="w-full overflow-hidden flex-shrink-0"
                style={{
                  aspectRatio: '4 / 3',
                  clipPath: `polygon(${FOLD}px 0, 100% 0, 100% 100%, 0 100%, 0 ${FOLD}px)`,
                }}
              >
                <LazyImage
                  src={s.image.src}
                  alt={s.image.alt}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-[1.03] transition-all duration-500"
                />
              </div>

              {/* All details */}
              <div className="flex flex-col flex-1 pt-5 pb-4 px-3 gap-4">

                {/* Service name */}
                <h2
                  className="font-spartan font-black text-konten-black uppercase leading-none tracking-tighter"
                  style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)' }}
                >
                  {s.name.split('\n').map((line, i, arr) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </h2>

                {/* Tagline */}
                <p
                  className="font-body text-konten-black/70 leading-[1.55]"
                  style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)' }}
                >
                  {s.tagline}
                </p>

                {/* Divider */}
                <hr className="border-konten-black/10" />

                {/* Body */}
                <p
                  className="font-body text-konten-black/50 leading-[1.65] flex-1"
                  style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1rem)' }}
                >
                  {s.body}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <button
                    onClick={() => setModal({ serviceValue: s.workSlug, serviceName: s.name.replace('\n', ' ') })}
                    className="flex-1 inline-flex items-center justify-center px-5 py-3
                               bg-konten-blue text-white
                               font-spartan font-bold text-[11px] uppercase tracking-widest rounded-lg
                               hover:opacity-90 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                  >
                    I want this →
                  </button>
                  <Link
                    to={`/featured-projects?service=${s.workSlug}`}
                    className="flex-1 inline-flex items-center justify-center px-5 py-3
                               border border-konten-black/20 text-konten-black/60
                               font-spartan font-bold text-[11px] uppercase tracking-widest rounded-lg
                               hover:border-konten-black/50 hover:text-konten-black transition-all duration-200"
                  >
                    See work
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
