import PageHeader from '../components/sections/services/PageHeader';
import ServiceAccordionRow from '../components/sections/services/ServiceAccordionRow';
import DiscoveryForm from '../components/sections/services/DiscoveryForm';
import { services } from '../data/services';

export default function Services() {
  return (
    <>
      <PageHeader />
      {services.map((service) => (
        <ServiceAccordionRow key={service.slug} service={service} />
      ))}
      <DiscoveryForm />
    </>
  );
}
