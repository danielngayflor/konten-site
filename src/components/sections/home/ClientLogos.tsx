// ClientLogos.tsx Dynasty-inspired: white strip, logo marquee with dark logos
import Marquee from '../../ui/Marquee';

const clients = [
  { name: 'Adolescent Girls Summit',    src: '/logos/ags.png',      h: 48 },
  { name: 'Embassy of Ireland',         src: '/logos/embassy.png',  h: 56 },
  { name: 'Global Fund for Children',   src: '/logos/gfc.png',      h: 32 },
  { name: 'Sappimah Cassava',           src: '/logos/sappimah.png', h: 44 },
  { name: "SOS Children's Villages",    src: '/logos/sos.png',      h: 36 },
  { name: 'UNDP',                       src: '/logos/undp.png',     h: 32 },
  { name: 'Yocel',                      src: '/logos/yocel.png',    h: 40 },
];

// On white background, render logos in dark (near-black) for contrast
const FILTER = 'brightness(0)';

export default function ClientLogos() {
  const logoItems = [...clients, ...clients].map((client, i) => (
    <div
      key={i}
      className="flex items-center justify-center px-12 opacity-40 hover:opacity-70 transition-opacity duration-300"
    >
      <img
        src={client.src}
        alt={client.name}
        draggable={false}
        style={{
          height: `${client.h}px`,
          width: 'auto',
          maxWidth: 200,
          objectFit: 'contain',
          filter: FILTER,
        }}
      />
    </div>
  ));

  return (
    <section className="bg-white py-10 overflow-hidden border-b border-black/8">
      <div className="text-center mb-7">
        <p className="font-spartan text-[10px] text-black/30 tracking-[0.18em] uppercase">
          Trusted by organisations working across Liberia and the region
        </p>
      </div>

      <div
        style={{
          maskImage: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <Marquee items={logoItems} speed={48} gap={80} height={64} />
      </div>
    </section>
  );
}
