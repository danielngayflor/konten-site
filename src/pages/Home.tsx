import Hero from '../components/sections/home/Hero';
import ClientLogos from '../components/sections/home/ClientLogos';
import StudioStatement from '../components/sections/home/StudioStatement';
import SelectedWorkPreview from '../components/sections/home/SelectedWorkPreview';
import Testimonials from '../components/sections/home/Testimonials';
import FreebiesPromo from '../components/sections/home/FreebiesPromo';
import ContactForm from '../components/sections/home/ContactForm';

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <StudioStatement />
      <SelectedWorkPreview />
      <Testimonials />
      <FreebiesPromo />
      <ContactForm />
    </>
  );
}
