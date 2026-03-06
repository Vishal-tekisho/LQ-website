import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainContent from './components/MainContent';

/** Scrolls to the top of the page on every route change */
function RouteScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}
import SkipToContent from './components/SkipToContent';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy-load heavy/non-critical components
const AnoAI = lazy(() => import('./components/ui/animated-shader-background'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const CookieConsent = lazy(() => import('./components/CookieConsent'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const DownloadPage = lazy(() => import('./pages/DownloadPage'));

function App() {
  return (
    <Router>
      <RouteScrollToTop />
      <Routes>
        <Route path="/legal/:doc" element={
          <Suspense fallback={<div className="min-h-screen" />}>
            <LegalPage />
          </Suspense>
        } />
        <Route path="/support" element={
          <Suspense fallback={<div className="min-h-screen" />}>
            <SupportPage />
          </Suspense>
        } />
        <Route path="/download" element={
          <Suspense fallback={<div className="min-h-screen" />}>
            <DownloadPage />
          </Suspense>
        } />
        <Route
          path="/*"
          element={
            <ErrorBoundary>
              <div className="min-h-screen relative overflow-hidden">
                <Suspense fallback={null}>
                  <AnoAI />
                </Suspense>
                <div className="fixed inset-0 noise pointer-events-none z-0" />
                <SkipToContent />

                <div className="relative z-10">
                  <MainContent />
                </div>

                <Suspense fallback={null}>
                  <ScrollToTop />
                  <CookieConsent />
                </Suspense>
              </div>
            </ErrorBoundary>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


