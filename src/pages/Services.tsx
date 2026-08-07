import ForYouHero from '../components/sections/for-you/ForYouHero';
import FlagshipServices from '../components/sections/for-you/FlagshipServices';
import AlsoAvailable from '../components/sections/for-you/AlsoAvailable';
import PageSkeleton from '../components/ui/PageSkeleton';
import { useReveal } from '../hooks/useReveal';

export default function Services() {
  const revealed = useReveal();
  if (!revealed) return <PageSkeleton />;
  return (
    <>
      <ForYouHero />
      <FlagshipServices />
      <AlsoAvailable />
    </>
  );
}
