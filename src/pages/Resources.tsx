import PageSeo from '../components/seo/PageSeo';
import PageHeader from '../components/sections/resources/PageHeader';
import ResourceGrid from '../components/sections/resources/ResourceGrid';

export default function Resources() {
  return (
    <>
      <PageSeo
        title="Freebies"
        description="Free guides, templates, and resources for NGOs, brands, and creators working in Liberia and West Africa. From Konten LR."
        canonical="/freebies"
      />
      <PageHeader />
      <ResourceGrid />
    </>
  );
}
