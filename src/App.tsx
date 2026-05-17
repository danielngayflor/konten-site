import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/layout/Nav';
import Closer from './components/layout/Closer';
import LegalFooter from './components/layout/LegalFooter';
import ScrollToTop from './components/ui/ScrollToTop';
import ScrollToHash from './components/ui/ScrollToHash';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Work from './pages/Work';
import WorkDetail from './pages/WorkDetail';
import Resources from './pages/Resources';
import ResourceDetail from './pages/ResourceDetail';

function AppLayout() {
  const { pathname } = useLocation();
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<About />} />
          <Route path="/services-for-you" element={<Services />} />
          <Route path="/stories-weve-told" element={<Work />} />
          <Route path="/stories-weve-told/:slug" element={<WorkDetail />} />
          <Route path="/freebies" element={<Resources />} />
          <Route path="/freebies/:slug" element={<ResourceDetail />} />
        </Routes>
      </main>
      {pathname !== '/services-for-you' && <Closer />}
      <LegalFooter />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollToHash />
      <AppLayout />
    </Router>
  );
}

export default App;
