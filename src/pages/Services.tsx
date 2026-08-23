import PageSeo from '../components/seo/PageSeo';
import ForYouHero from '../components/sections/for-you/ForYouHero';
import FlagshipServices from '../components/sections/for-you/FlagshipServices';
import AlsoAvailable from '../components/sections/for-you/AlsoAvailable';

export default function Services() {
  return (
    <>
      <PageSeo
        title="Services"
        description="Media coverage and documentary, social media storytelling, and creator studio services for NGOs, embassies, brands, and public figures across Liberia and West Africa."
        canonical="/services"
      />
      <ForYouHero />
      <FlagshipServices />
      <AlsoAvailable />
    </>
  );
}
