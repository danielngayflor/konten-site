import PageHeader from '../components/sections/work/PageHeader';
import WorkGallery from '../components/sections/work/WorkGallery';
import WorkCloser from '../components/sections/work/WorkCloser';
import { workPlaceholders } from '../data/workPlaceholders';
import PageSkeleton from '../components/ui/PageSkeleton';
import { useReveal } from '../hooks/useReveal';

export default function Work() {
  const revealed = useReveal();
  if (!revealed) return <PageSkeleton />;
  return (
    <>
      <PageHeader />
      <WorkGallery projects={workPlaceholders} />
      <WorkCloser />
    </>
  );
}
