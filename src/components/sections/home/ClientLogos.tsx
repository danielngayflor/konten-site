import Marquee from '../../ui/Marquee';

const clients = [
  { name: 'Adolescent Girls Summit',    src: '/logos/ags.png',      h: 52 },
  { name: 'Embassy of Ireland',         src: '/logos/embassy.png',  h: 60 },
  { name: 'Global Fund for Children',   src: '/logos/gfc.png',      h: 36 },
  { name: 'Sappimah Cassava',           src: '/logos/sappimah.png', h: 50 },
  { name: "SOS Children's Villages",    src: '/logos/sos.png',      h: 40 },
  { name: 'UNDP',                       src: '/logos/undp.png',     h: 36 },
  { name: 'Yocel',                      src: '/logos/yocel.png',    h: 44 },
];

const FILTER = 'brightness(0) invert(1)';

export default function ClientLogos() {
  const logoItems = [...clients, ...clients].map((client, i) => (
    <div
      key={i}
      className="flex items-center justify-center px-12 opacity-75 hover:opacity-100 transition-opacity duration-300"
    >
      <img
        src={client.src}
        alt={client.name}
        draggable={false}
        style={{
          height: `${client.h}px`,
          width: 'auto',
          maxWidth: 220,
          objectFit: 'contain',
          filter: FILTER,
        }}
      />
    </div>
  ));

  return (
    <section className="bg-charcoal py-12">
      <div className="text-center mb-8">
        <p className="font-spartan text-[11px] text-mid-gray tracking-[0.14em] uppercase">
          Trusted by organisations working across Liberia and the region
        </p>
      </div>

      {/* Edge fade — logos appear from black on the left, disappear to black on the right */}
      <div
        style={{
          maskImage: 'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <Marquee items={logoItems} speed={48} gap={80} height={72} />
      </div>
    </section>
  );
}
