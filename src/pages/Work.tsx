import PageSeo from '../components/seo/PageSeo';
import PageHeader from '../components/sections/work/PageHeader';
import WorkGallery from '../components/sections/work/WorkGallery';
import WorkCloser from '../components/sections/work/WorkCloser';
import { workPlaceholders } from '../data/workPlaceholders';

export default function Work() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <PageSeo
        title="Featured Projects"
        description="Donor films, brand content, field coverage, and documentary work across all 15 counties of Liberia and West Africa. Real stories told for real outcomes."
        canonical="/featured-projects"
      />
      <PageHeader />
      <WorkGallery projects={workPlaceholders} />
      <WorkCloser />
    </div>
  );
}
