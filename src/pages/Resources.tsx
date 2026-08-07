import PageHeader from '../components/sections/resources/PageHeader';
import ResourceGrid from '../components/sections/resources/ResourceGrid';
import PageSkeleton from '../components/ui/PageSkeleton';
import { useReveal } from '../hooks/useReveal';

export default function Resources() {
  const revealed = useReveal();
  if (!revealed) return <PageSkeleton />;
  return (
    <>
      <PageHeader />
      <ResourceGrid />
    </>
  );
}
