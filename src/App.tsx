import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent';
import SkipToContent from './components/SkipToContent';

// Lazy-load heavy/non-critical components
const AnoAI = lazy(() => import('./components/ui/animated-shader-background'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const CookieConsent = lazy(() => import('./components/CookieConsent'));
const LegalPage = lazy(() => import('./pages/LegalPage'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/legal/:doc" element={
          <Suspense fallback={<div className="min-h-screen" />}>
            <LegalPage />
          </Suspense>
        } />
        <Route
          path="/*"
          element={
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
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


