import Opening from '../components/sections/about/Opening';
import WhyWeExist from '../components/sections/about/WhyWeExist';
import Belief from '../components/sections/about/Belief';
import OurValues from '../components/sections/about/OurValues';
import OurStoryCloser from '../components/sections/about/OurStoryCloser';
import PageSkeleton from '../components/ui/PageSkeleton';
import { useReveal } from '../hooks/useReveal';

export default function About() {
  const revealed = useReveal();
  if (!revealed) return <PageSkeleton />;
  return (
    <>
      <Opening />
      <WhyWeExist />
      <Belief />
      <OurValues />
      <OurStoryCloser />
    </>
  );
}
