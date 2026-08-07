import PageHeader from '../components/sections/work/PageHeader';
import WorkGallery from '../components/sections/work/WorkGallery';
import WorkCloser from '../components/sections/work/WorkCloser';
import { workPlaceholders } from '../data/workPlaceholders';

export default function Work() {
  return (
    <>
      <PageHeader />
      <WorkGallery projects={workPlaceholders} />
      <WorkCloser />
    </>
  );
}
