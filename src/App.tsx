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
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const CookieConsent = lazy(() => import('./components/CookieConsent'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const DownloadPage = lazy(() => import('./pages/DownloadPage'));

// New Agent Pages
const AgentContactCapturePage = lazy(() => import('./pages/AgentContactCapturePage'));
const AgentResearchPage = lazy(() => import('./pages/AgentResearchPage'));
const AgentMeetingsPage = lazy(() => import('./pages/AgentMeetingsPage'));
const AgentEmailPage = lazy(() => import('./pages/AgentEmailPage'));
const AgentVoicePage = lazy(() => import('./pages/AgentVoicePage'));

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
        <Route path="/agents/contact-capture" element={
          <Suspense fallback={<div className="min-h-screen" />}>
            <AgentContactCapturePage />
          </Suspense>
        } />
        <Route path="/agents/research" element={
          <Suspense fallback={<div className="min-h-screen" />}>
            <AgentResearchPage />
          </Suspense>
        } />
        <Route path="/agents/meetings" element={
          <Suspense fallback={<div className="min-h-screen" />}>
            <AgentMeetingsPage />
          </Suspense>
        } />
        <Route path="/agents/email" element={
          <Suspense fallback={<div className="min-h-screen" />}>
            <AgentEmailPage />
          </Suspense>
        } />
        <Route path="/agents/voice" element={
          <Suspense fallback={<div className="min-h-screen" />}>
            <AgentVoicePage />
          </Suspense>
        } />
        <Route
          path="/*"
          element={
            <ErrorBoundary>
              <div className="min-h-screen relative overflow-hidden">
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


