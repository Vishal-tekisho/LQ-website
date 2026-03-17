import { LazyMotion, domAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import LeadCaptureStream from '../components/LeadCaptureStream';
import Footer from '../components/Footer';

export default function AgentContactCapturePage() {
  const navigate = useNavigate();

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-leadq-bg text-leadq-steel relative overflow-hidden">
        {/* Noise overlay */}
        <div className="fixed inset-0 noise pointer-events-none z-0" />

        <div className="relative z-10">
          <nav className="sticky top-0 z-50 backdrop-blur-xl bg-leadq-bg/70 border-b border-white/5">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
              <button
                onClick={() => navigate('/', { state: { scrollTo: 'agents' } })}
                className="flex items-center gap-2 text-leadq-silver hover:text-white transition-colors text-sm"
              >
                <ArrowLeft size={16} />
                Back to LeadQ.AI
              </button>
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/', { state: { scrollTo: 'agents' } })}>
                <img
                  src="/leadq-logo-main.png"
                  alt="LeadQ.AI Logo"
                  className="h-10 w-auto"
                />
              </div>
            </div>
          </nav>

          <div className="pt-20 pb-10 min-h-[calc(100vh-200px)] flex flex-col justify-center">
            <LeadCaptureStream />
          </div>

          <Footer />
        </div>
      </div>
    </LazyMotion>
  );
}
