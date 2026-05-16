import PageHeader from '../components/sections/about/PageHeader';
import TheStory from '../components/sections/about/TheStory';
import OurPhilosophy from '../components/sections/about/OurPhilosophy';
import OurValues from '../components/sections/about/OurValues';
import HowWeWork from '../components/sections/about/HowWeWork';
import TheTeam from '../components/sections/about/TheTeam';

export default function About() {
  return (
    <>
      <PageHeader />
      <TheStory />
      <OurPhilosophy />
      <OurValues />
      <HowWeWork />
      <TheTeam />
    </>
  );
}
