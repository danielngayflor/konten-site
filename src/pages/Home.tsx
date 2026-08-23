import PageSeo from '../components/seo/PageSeo';
import Hero from '../components/sections/home/Hero';
import ClientLogos from '../components/sections/home/ClientLogos';
import Positioning from '../components/sections/home/Positioning';
import WhatWeDo from '../components/sections/home/WhatWeDo';
import SelectedWorkPreview from '../components/sections/home/SelectedWorkPreview';
import ContactForm from '../components/sections/home/ContactForm';

// Section rhythm (Dynasty-inspired):
//   Hero       → bg-konten-blue   (full viewport)
//   ClientLogos→ bg-white         (logo ticker strip)
//   Positioning→ bg-white         (brand statement + video)
//   WhatWeDo   → bg-konten-blue   (services list)
//   SelectedWork→ bg-konten-black (work cards)
//   ContactForm → bg-white        (contact form)
//   Closer (in App.tsx) → bg-konten-blue (footer)

export default function Home() {
  return (
    // Dynasty-style: one dark body canvas, sections float above it as panels
    <div className="flex flex-col gap-4 sm:gap-6">
      <PageSeo
        title="Storytelling that Moves"
        description="Video production, documentary, and content strategy agency based in Monrovia, Liberia. We tell real stories across all 15 counties and West Africa — moving donors to fund, customers to buy, and audiences to trust."
        canonical="/"
      />
      {/* Hero + ClientLogos + Positioning one floating unit, flushed together */}
      <div className="section-combined mx-4 sm:mx-6 overflow-hidden rounded-t-xl">
        <Hero />
        <ClientLogos />
        <Positioning />
      </div>
      <WhatWeDo />
      <SelectedWorkPreview />
      <ContactForm />
    </div>
  );
}
