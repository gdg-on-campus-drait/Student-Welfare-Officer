import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/CustomCursor';
import SearchDialog from './components/features/SearchDialog';
import HomePage from './pages/HomePage';
import { useLenis } from './hooks/useLenis';
import { scrollToId } from './lib/scroll';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ClubsPage = lazy(() => import('./pages/ClubsPage'));
const ClubDetailPage = lazy(() => import('./pages/ClubDetailPage'));
const FestsPage = lazy(() => import('./pages/FestsPage'));
const FestDetailPage = lazy(() => import('./pages/FestDetailPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/** Scroll to the URL hash after navigation, or to the top of a new page. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const id = hash.replace('#', '');
    let tries = 0;
    let t;
    const attempt = () => {
      ScrollTrigger.refresh();
      if (!id) {
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
        return;
      }
      // Lazy routes may not be mounted yet — retry briefly until the target exists.
      if (!scrollToId(id) && tries++ < 30) t = setTimeout(attempt, 50);
    };
    t = setTimeout(attempt, 60);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

const PageFallback = () => <div className="min-h-screen bg-navy-950" aria-busy="true" />;

function Shell() {
  useLenis();
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <CustomCursor />
      <ScrollManager />
      <Navbar />
      <main id="main" className="flex-grow">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/clubs" element={<ClubsPage />} />
            <Route path="/clubs/:slug" element={<ClubDetailPage />} />
            <Route path="/fests" element={<FestsPage />} />
            <Route path="/fests/:slug" element={<FestDetailPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Old URL from the previous site */}
            <Route path="/student-welfare" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <SearchDialog />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
