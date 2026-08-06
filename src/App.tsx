import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/layout/Nav';
import Closer from './components/layout/Closer';
import LegalFooter from './components/layout/LegalFooter';
import ScrollToTop from './components/ui/ScrollToTop';
import ScrollToHash from './components/ui/ScrollToHash';
import PageSkeleton from './components/ui/PageSkeleton';

// Lazy-load each page so it gets its own chunk.
// Suspense shows <PageSkeleton> while the chunk is fetching —
// no more pitch-black flash on first load or first visit to a route.
const Home           = lazy(() => import('./pages/Home'));
const About          = lazy(() => import('./pages/About'));
const Services       = lazy(() => import('./pages/Services'));
const Work           = lazy(() => import('./pages/Work'));
const WorkDetail     = lazy(() => import('./pages/WorkDetail'));
const Resources      = lazy(() => import('./pages/Resources'));
const ResourceDetail = lazy(() => import('./pages/ResourceDetail'));

function AppLayout() {
  return (
    <>
      <Nav />
      <main>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/"                          element={<Home />} />
            <Route path="/our-story"                 element={<About />} />
            <Route path="/services"                  element={<Services />} />
            <Route path="/featured-projects"         element={<Work />} />
            <Route path="/featured-projects/:slug"   element={<WorkDetail />} />
            <Route path="/freebies"                  element={<Resources />} />
            <Route path="/freebies/:slug"            element={<ResourceDetail />} />
          </Routes>
        </Suspense>
      </main>
      <Closer />
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
