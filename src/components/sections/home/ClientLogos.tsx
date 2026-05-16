import Marquee from '../../ui/Marquee';

const clients = [
  { name: 'UNDP', src: '/logos/undp.jpg' },
  { name: 'Global Fund for Children', src: '/logos/gfc.jpg' },
  { name: 'Adolescent Girls Summit', src: '/logos/ags.jpg' },
  { name: "SOS Children's Villages", src: '/logos/sos.jpg' },
  { name: 'Embassy of Ireland', src: '/logos/embassy.jpg' },
  { name: 'Sappimah Cassava', src: '/logos/sappimah.jpg' },
  { name: 'Yocel', src: '/logos/yocel.jpg' },
];

export default function ClientLogos() {
  const logoItems = [...clients, ...clients].map((client, i) => (
    <div
      key={i}
      className="flex items-center justify-center px-10 opacity-80 hover:opacity-100 transition-opacity duration-300"
    >
      <img
        src={client.src}
        alt={client.name}
        className="h-16 w-auto max-w-[220px] object-contain"
      />
    </div>
  ));

  return (
    <section className="bg-konten-black py-12">
      <div className="text-center mb-10">
        <p className="font-spartan font-black text-konten-cream text-[22px] tracking-widest uppercase">
          Trusted By
        </p>
      </div>
      <Marquee items={logoItems} speed={30} gap={60} height={80} />
    </section>
  );
}
