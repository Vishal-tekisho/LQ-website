import { useState } from 'react';
import { Link } from 'react-router-dom';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import {
  ArrowLeft,
  Download,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import Footer from '../components/Footer';

/* ── Real Apple logo ────────────────────────────────────────────── */
const AppleLogo = ({ className, size }: { className?: string; size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width={size}
    height={size}
    aria-hidden="true"
  >
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
  </svg>
);

/* ── Real Android logo ─────────────────────────────────────────── */
const AndroidLogo = ({ className, size }: { className?: string; size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width={size}
    height={size}
    aria-hidden="true"
  >
    <path d="M17.523 15.3548c-.5834 0-1.0557.4723-1.0557 1.0557 0 .5834.4723 1.0557 1.0557 1.0557.5834 0 1.0557-.4723 1.0557-1.0557 0-.5834-.4723-1.0557-1.0557-1.0557m-11.046 0c-.5834 0-1.0557.4723-1.0557 1.0557 0 .5834.4723 1.0557 1.0557 1.0557.5834 0 1.0557-.4723 1.0557-1.0557 0-.5834-.4723-1.0557-1.0557-1.0557m11.4045-6.02l1.9643-3.4017c.1093-.1895.0446-.4319-.1449-.5412-.1895-.1093-.432-.0446-.5412.1449l-1.9896 3.4468c-1.5495-.7047-3.2857-1.0978-5.16-1.0978-1.8743 0-3.6105.3931-5.16 1.0978L4.8754 5.537c-.1093-.1895-.3517-.2542-.5412-.1449-.1895.1093-.2542.352-.1449.5412l1.9643 3.4017C2.6884 11.1867.3608 14.5765 0 18.6677h24c-.3608-4.0912-2.6884-7.481-7.1185-9.3329" />
  </svg>
);

/* ── step data ──────────────────────────────────────────────────── */
interface Step {
  number: number;
  title: string;
  description: string;
}

const iosSteps: Step[] = [
  {
    number: 1,
    title: 'Open the App Store',
    description:
      'On your iPhone or iPad, tap the App Store icon on your home screen.',
  },
  {
    number: 2,
    title: 'Search for LeadQ.AI',
    description:
      'Tap the search tab at the bottom, type "LeadQ.AI" and press Search.',
  },
  {
    number: 3,
    title: 'Tap "Get" to install',
    description:
      'Find LeadQ.AI in the results, tap Get, then confirm with Face ID, Touch ID, or your Apple ID password.',
  },
  {
    number: 4,
    title: 'Open & sign in',
    description:
      'Once installed, open the app, sign in with your LeadQ.AI credentials (or create a new account), and you\'re ready to go.',
  },
];

const androidSteps: Step[] = [
  {
    number: 1,
    title: 'Open Google Play Store',
    description:
      'On your Android phone or tablet, open the Google Play Store app.',
  },
  {
    number: 2,
    title: 'Search for LeadQ.AI',
    description:
      'Tap the search bar at the top, type "LeadQ.AI" and press Enter.',
  },
  {
    number: 3,
    title: 'Tap "Install"',
    description:
      'Select LeadQ.AI from the results, tap Install, and wait for the download to complete.',
  },
  {
    number: 4,
    title: 'Open & sign in',
    description:
      'Tap Open (or find the app on your home screen), sign in with your LeadQ.AI credentials (or register), and start capturing leads.',
  },
];

/* ── reusable step card ─────────────────────────────────────────── */
function StepCard({ step, delay }: { step: Step; delay: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      className="flex gap-4 items-start"
    >
      <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#A89FE0]/15 text-[#A89FE0] font-bold text-sm flex items-center justify-center">
        {step.number}
      </span>
      <div>
        <h4 className="text-white font-medium text-base mb-1">{step.title}</h4>
        <p className="text-leadq-steel text-sm leading-relaxed">
          {step.description}
        </p>
      </div>
    </m.div>
  );
}

/* ── page ────────────────────────────────────────────────────────── */
export default function DownloadPage() {
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>('ios');

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-leadq-bg text-leadq-steel relative">
        {/* Noise overlay */}
        <div className="fixed inset-0 noise pointer-events-none z-0" />

        <div className="relative z-10">
          {/* ── Top bar ──────────────────────────────────────── */}
          <nav className="sticky top-0 z-50 backdrop-blur-xl bg-leadq-bg/70 border-b border-white/5">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
              <Link
                to="/"
                state={{ scrollTo: 'footer' }}
                className="flex items-center gap-2 text-leadq-silver hover:text-white transition-colors text-sm"
              >
                <ArrowLeft size={16} />
                Back to LeadQ.AI
              </Link>
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="/leadq-logo-main.png"
                  alt="LeadQ.AI Logo"
                  className="h-10 w-auto"
                />
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-leadq-platinum to-leadq-steel">
                  LeadQ<span className="text-[#A89FE0]">.AI</span>
                </span>
              </Link>
            </div>
          </nav>

          {/* ── Hero ─────────────────────────────────────────── */}
          <header className="pt-16 sm:pt-24 pb-12 px-4 text-center">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[#A89FE0]/20 bg-[#A89FE0]/5 text-[#A89FE0] text-sm font-medium">
                <Download size={16} />
                Download
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-leadq-platinum mb-4">
                Get LeadQ.AI on{' '}
                <span className="text-[#A89FE0]">
                  your device
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-base sm:text-lg text-leadq-steel leading-relaxed">
                Follow the step-by-step instructions below to install LeadQ.AI
                on iOS or Android and start capturing leads on the go.
              </p>
            </m.div>
          </header>

          {/* ── Platform requirements ────────────────────────── */}
          <section className="max-w-3xl mx-auto px-4 pb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="glass rounded-2xl p-6 flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-[#A89FE0]/10 flex-shrink-0">
                  <AppleLogo className="w-6 h-6 text-[#A89FE0]" />
                </div>
                <div>
                  <h3 className="text-white font-display font-semibold mb-1">
                    iOS
                  </h3>
                  <p className="text-sm leading-relaxed">
                    Requires iOS 15 or later. Compatible with iPhone and iPad.
                  </p>
                </div>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="glass rounded-2xl p-6 flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-[#A89FE0]/10 flex-shrink-0">
                  <AndroidLogo className="w-6 h-6 text-[#A89FE0]" />
                </div>
                <div>
                  <h3 className="text-white font-display font-semibold mb-1">
                    Android
                  </h3>
                  <p className="text-sm leading-relaxed">
                    Requires Android 10 or later. Compatible with phones and
                    tablets.
                  </p>
                </div>
              </m.div>
            </div>
          </section>

          {/* ── Tab toggle ───────────────────────────────────── */}
          <section className="max-w-3xl mx-auto px-4 pb-20">
            <div className="flex justify-center mb-10">
              <div className="inline-flex rounded-full p-1 bg-white/5 border border-white/10">
                <button
                  onClick={() => setActiveTab('ios')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === 'ios'
                    ? 'bg-[#A89FE0]/15 text-[#A89FE0] border border-[#A89FE0]/30'
                    : 'text-leadq-silver hover:text-white border border-transparent'
                    }`}
                >
                  <AppleLogo size={16} />
                  iOS
                </button>
                <button
                  onClick={() => setActiveTab('android')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === 'android'
                    ? 'bg-[#A89FE0]/15 text-[#A89FE0] border border-[#A89FE0]/30'
                    : 'text-leadq-silver hover:text-white border border-transparent'
                    }`}
                >
                  <AndroidLogo className="w-4 h-4" />
                  Android
                </button>
              </div>
            </div>

            {/* ── Steps ───────────────────────────────────────── */}
            <m.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === 'ios' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="glass rounded-2xl p-6 sm:p-8 space-y-8"
            >
              <div className="flex items-center gap-3 mb-2">
                {activeTab === 'ios' ? (
                  <AppleLogo size={22} className="text-[#A89FE0]" />
                ) : (
                  <AndroidLogo className="w-5 h-5 text-[#A89FE0]" />
                )}
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  {activeTab === 'ios'
                    ? 'Install on iPhone / iPad'
                    : 'Install on Android'}
                </h3>
              </div>

              {(activeTab === 'ios' ? iosSteps : androidSteps).map(
                (step, i) => (
                  <StepCard key={step.number} step={step} delay={i * 0.08} />
                ),
              )}

              {/* success note */}
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-3 mt-4 p-4 rounded-xl bg-green-500/5 border border-green-500/15"
              >
                <CheckCircle2
                  size={20}
                  className="text-green-400 flex-shrink-0 mt-0.5"
                />
                <p className="text-sm text-green-200/90 leading-relaxed">
                  That's it! You're all set. If you run into any issues during
                  installation, visit our{' '}
                  <Link
                    to="/support"
                    className="underline underline-offset-2 hover:text-white transition-colors"
                  >
                    Support Center
                  </Link>{' '}
                  or email{' '}
                  <a
                    href="mailto:contact@tekisho.ai"
                    className="underline underline-offset-2 hover:text-white transition-colors"
                  >
                    contact@tekisho.ai
                  </a>
                  .
                </p>
              </m.div>

              {/* store CTA */}
              <div className="pt-2">
                <a
                  href={
                    activeTab === 'ios'
                      ? 'https://apps.apple.com'
                      : 'https://play.google.com/store'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#A89FE0]/15 border border-[#A89FE0]/30 text-[#A89FE0] hover:bg-[#A89FE0]/25 transition-all text-sm font-medium"
                >
                  <ExternalLink size={16} />
                  {activeTab === 'ios'
                    ? 'Open App Store'
                    : 'Open Google Play Store'}
                </a>
              </div>
            </m.div>
          </section>

          {/* ── Footer ───────────────────────────────────────── */}
          <Footer />
        </div>
      </div>
    </LazyMotion>
  );
}
