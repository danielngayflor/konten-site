import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DiscoveryQuestionnaire from '../components/discovery/DiscoveryQuestionnaire';

export default function Discovery() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Film Discovery · Konten LR</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <DiscoveryQuestionnaire onExit={() => navigate('/')} />
    </>
  );
}
