import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent';
import ScrollToTop from './components/ScrollToTop';
import SkipToContent from './components/SkipToContent';
import CookieConsent from './components/CookieConsent';
import AnoAI from './components/ui/animated-shader-background';
import LegalPage from './pages/LegalPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/legal/:doc" element={<LegalPage />} />
        <Route
          path="/*"
          element={
            <div className="min-h-screen relative overflow-hidden">
              <AnoAI />
              <div className="fixed inset-0 noise pointer-events-none z-0" />
              <SkipToContent />

              <div className="relative z-10">
                <MainContent />
              </div>

              <ScrollToTop />
              <CookieConsent />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


