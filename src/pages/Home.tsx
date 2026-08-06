import Hero from '../components/sections/home/Hero';
import ClientLogos from '../components/sections/home/ClientLogos';
import Positioning from '../components/sections/home/Positioning';
import WhatWeDo from '../components/sections/home/WhatWeDo';
import SelectedWorkPreview from '../components/sections/home/SelectedWorkPreview';
import ContactForm from '../components/sections/home/ContactForm';

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <Positioning />
      <WhatWeDo />
      <SelectedWorkPreview />
      <ContactForm />
    </>
  );
}
