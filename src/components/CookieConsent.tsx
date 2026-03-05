import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Cookie, X, CheckCircle, Settings } from 'lucide-react';
import { Button } from './ui/button';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('leadq-cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('leadq-cookie-consent', JSON.stringify({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
    // TODO: Initialize analytics tracking here
  };

  const handleDecline = () => {
    localStorage.setItem('leadq-cookie-consent', JSON.stringify({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  const handleSavePreferences = (preferences: { analytics: boolean; marketing: boolean }) => {
    localStorage.setItem('leadq-cookie-consent', JSON.stringify({
      essential: true,
      ...preferences,
      timestamp: new Date().toISOString()
    }));
    setShowPreferences(false);
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={() => setShowPreferences(false)}
          />

          {/* Main Banner */}
          <m.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[101] p-4 md:p-6"
          >
            <div className="max-w-7xl mx-auto">
              <div className="glass-strong rounded-2xl border border-white/20 shadow-2xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Icon & Content */}
                  <div className="flex-1 flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-leadq-silver/20 to-leadq-silver/20 flex items-center justify-center">
                        <Cookie className="text-leadq-silver" size={24} />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-display font-bold mb-2">
                        We Value Your Privacy
                      </h3>
                      <p className="text-base sm:text-lg text-leadq-silver leading-relaxed">
                        We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                        By clicking "Accept All", you consent to our use of cookies.
                      </p>
                      
                      {/* Expandable Privacy Details */}
                      <AnimatePresence>
                        {showDetails && (
                          <m.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-white/10 space-y-3"
                          >
                            <div>
                              <h4 className="text-xl sm:text-2xl font-semibold mb-1">Information We Collect</h4>
                              <p className="text-xs text-leadq-silver/90">
                                We collect browsing data, device information, IP addresses, and usage patterns to improve our services and user experience.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-xl sm:text-2xl font-semibold mb-1">How We Use Your Data</h4>
                              <p className="text-xs text-leadq-silver/90">
                                Your data helps us analyze website performance, personalize content, improve our services, and provide better customer support.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-xl sm:text-2xl font-semibold mb-1">Your Rights</h4>
                              <p className="text-xs text-leadq-silver/90">
                                You have the right to access, correct, delete your data, withdraw consent, and request data portability at any time.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-xl sm:text-2xl font-semibold mb-1">Data Retention</h4>
                              <p className="text-xs text-leadq-silver/90">
                                We retain your data for as long as necessary to provide our services (typically 12-24 months) or as required by law.
                              </p>
                            </div>
                          </m.div>
                        )}
                      </AnimatePresence>
                      
                      <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="text-xs text-leadq-silver hover:text-white transition-colors underline mt-2 inline-flex items-center gap-1"
                      >
                        {showDetails ? 'Show Less' : 'Read Privacy Policy Details'}
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Button
                      onClick={() => setShowPreferences(true)}
                      variant="glass-secondary"
                      size="compact-lg"
                      className="flex items-center justify-center gap-2"
                    >
                      <Settings size={18} />
                      <span>Preferences</span>
                    </Button>

                    <Button
                      onClick={handleDecline}
                      variant="glass-secondary"
                      size="compact-lg"
                      className="flex items-center justify-center gap-2"
                    >
                      <X size={18} />
                      <span>Decline</span>
                    </Button>

                    <Button
                      onClick={handleAcceptAll}
                      variant="cookie-modal"
                      size="compact-lg"
                      className="flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={18} />
                      <span>Accept All</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </m.div>

          {/* Preferences Modal */}
          <AnimatePresence>
            {showPreferences && (
              <m.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[102] w-[90%] max-w-2xl"
              >
                <PreferencesModal
                  onSave={handleSavePreferences}
                  onClose={() => setShowPreferences(false)}
                />
              </m.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

interface PreferencesModalProps {
  onSave: (preferences: { analytics: boolean; marketing: boolean }) => void;
  onClose: () => void;
}

const PreferencesModal = ({ onSave, onClose }: PreferencesModalProps) => {
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  const cookieTable = [
    {
      name: 'leadq-cookie-consent',
      provider: 'LeadQ.AI',
      purpose: 'Stores your cookie consent preferences.',
      duration: '12 months',
      type: 'Essential'
    },
    {
      name: '[analytics_cookie_name]',
      provider: '[Analytics Provider]',
      purpose: 'Helps us understand site usage and improve performance.',
      duration: '[e.g., 24 months]',
      type: 'Analytics'
    },
    {
      name: '[marketing_cookie_name]',
      provider: '[Marketing Provider]',
      purpose: 'Measures marketing effectiveness and ad performance.',
      duration: '[e.g., 90 days]',
      type: 'Marketing'
    }
  ];

  const cookieTypes = [
    {
      id: 'essential',
      title: 'Essential Cookies',
      description: 'Required for the website to function properly. These cannot be disabled.',
      enabled: true,
      locked: true
    },
    {
      id: 'analytics',
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website by collecting anonymous data.',
      enabled: analytics,
      onChange: setAnalytics,
      locked: false
    },
    {
      id: 'marketing',
      title: 'Marketing Cookies',
      description: 'Used to track visitors across websites to display relevant advertisements.',
      enabled: marketing,
      onChange: setMarketing,
      locked: false
    }
  ];

  return (
    <div className="glass-strong rounded-2xl border border-white/20 shadow-2xl p-6 md:p-8 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-display font-bold">Cookie Preferences</h3>
        <Button
          onClick={onClose}
          variant="glass-secondary"
          size="icon"
          aria-label="Close preferences"
        >
          <X size={20} />
        </Button>
      </div>

      <p className="text-leadq-silver mb-6">
        Customize your cookie preferences below. You can change these settings at any time.
      </p>

      <div className="space-y-4 mb-8">
        {cookieTypes.map((cookie) => (
          <div key={cookie.id} className="glass p-4 rounded-xl border border-white/10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-xl sm:text-2xl font-semibold mb-1">{cookie.title}</h4>
                <p className="text-sm text-leadq-silver">{cookie.description}</p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={cookie.enabled}
                  onChange={(e) => !cookie.locked && cookie.onChange?.(e.target.checked)}
                  disabled={cookie.locked}
                  className="sr-only peer"
                />
                <div className={`w-11 h-6 bg-leadq-silver/30 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-leadq-silver/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-leadq-silver peer-checked:to-leadq-silver ${cookie.locked ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl sm:text-2xl font-semibold">Privacy Policy Summary</h4>
          <span className="text-xs text-leadq-silver/70">Last Updated: February 2026</span>
        </div>
        
        <div className="space-y-4 mb-4">
          <div className="glass p-4 rounded-xl border border-white/10">
            <h5 className="text-xl sm:text-2xl font-semibold mb-2">📊 Information We Collect</h5>
            <ul className="text-xs text-leadq-silver space-y-1 list-disc list-inside">
              <li>Browsing data and interaction patterns on our website</li>
              <li>Device information (browser type, OS, screen resolution)</li>
              <li>IP address and approximate geographic location</li>
              <li>Referral sources and pages visited</li>
              <li>Form submissions and contact information you provide</li>
            </ul>
          </div>

          <div className="glass p-4 rounded-xl border border-white/10">
            <h5 className="text-xl sm:text-2xl font-semibold mb-2">🔍 How We Use Your Data</h5>
            <ul className="text-xs text-leadq-silver space-y-1 list-disc list-inside">
              <li>Analyze website performance and user experience</li>
              <li>Personalize content and recommendations</li>
              <li>Improve our products and services</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Comply with legal obligations and prevent fraud</li>
            </ul>
          </div>

          <div className="glass p-4 rounded-xl border border-white/10">
            <h5 className="text-xl sm:text-2xl font-semibold mb-2">🔒 Data Security & Protection</h5>
            <p className="text-xs text-leadq-silver leading-relaxed">
              We implement industry-standard security measures including encryption, secure servers, 
              and access controls to protect your personal data. We regularly audit our systems to 
              ensure compliance with GDPR, CCPA, and other privacy regulations.
            </p>
          </div>

          <div className="glass p-4 rounded-xl border border-white/10">
            <h5 className="text-xl sm:text-2xl font-semibold mb-2">🤝 Third-Party Sharing</h5>
            <p className="text-xs text-leadq-silver leading-relaxed mb-2">
              We do not sell your personal data. We may share information with:
            </p>
            <ul className="text-xs text-leadq-silver space-y-1 list-disc list-inside">
              <li>Service providers who help us operate our website (analytics, hosting)</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your explicit consent</li>
            </ul>
          </div>

          <div className="glass p-4 rounded-xl border border-white/10">
            <h5 className="text-xl sm:text-2xl font-semibold mb-2">✅ Your Rights (GDPR & CCPA)</h5>
            <ul className="text-xs text-leadq-silver space-y-1 list-disc list-inside">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update inaccurate or incomplete data</li>
              <li><strong>Deletion:</strong> Request deletion of your data ("right to be forgotten")</li>
              <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
              <li><strong>Opt-Out:</strong> Withdraw consent for data processing at any time</li>
              <li><strong>Objection:</strong> Object to processing for direct marketing purposes</li>
            </ul>
          </div>

          <div className="glass p-4 rounded-xl border border-white/10">
            <h5 className="text-xl sm:text-2xl font-semibold mb-2">⏰ Data Retention</h5>
            <p className="text-xs text-leadq-silver leading-relaxed">
              We retain personal data for as long as necessary to fulfill the purposes outlined in this 
              policy, typically 12-24 months for analytics data and up to 36 months for customer records. 
              Data is securely deleted when no longer needed.
            </p>
          </div>

          <div className="glass p-4 rounded-xl border border-white/10">
            <h5 className="text-xl sm:text-2xl font-semibold mb-2">🌍 International Data Transfers</h5>
            <p className="text-xs text-leadq-silver leading-relaxed">
              Your data may be transferred and processed in countries outside your residence. We ensure 
              appropriate safeguards are in place through Standard Contractual Clauses (SCCs) and comply 
              with international data protection frameworks.
            </p>
          </div>

          <div className="glass p-4 rounded-xl border border-white/10">
            <h5 className="text-xl sm:text-2xl font-semibold mb-2">👶 Children's Privacy</h5>
            <p className="text-xs text-leadq-silver leading-relaxed">
              Our services are not directed to children under 16. We do not knowingly collect personal 
              information from children. If you believe we have collected data from a child, please contact us.
            </p>
          </div>

          <div className="glass p-4 rounded-xl border border-white/10">
            <h5 className="text-xl sm:text-2xl font-semibold mb-2">📧 Contact & Data Requests</h5>
            <p className="text-xs text-leadq-silver leading-relaxed">
              For privacy inquiries, data access requests, or to exercise your rights, contact us at:
              <br />
              <strong>Email:</strong> privacy@leadq.ai
              <br />
              <strong>Response Time:</strong> Within 30 days of your request
            </p>
          </div>
        </div>

        <h4 className="text-xl sm:text-2xl font-semibold mb-3 mt-6">Cookie Details</h4>
        <p className="text-sm text-leadq-silver leading-relaxed mb-4">
          This Cookie Policy explains how LeadQ.AI uses cookies and similar technologies on LeadQ.ai.
          Essential cookies are required for the site to function. Analytics and marketing cookies
          are optional and used to understand usage and improve our communications.
        </p>

        <div className="glass p-4 rounded-xl border border-white/10 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-leadq-silver">
                <th className="py-2 pr-4 font-medium">Cookie</th>
                <th className="py-2 pr-4 font-medium">Provider</th>
                <th className="py-2 pr-4 font-medium">Purpose</th>
                <th className="py-2 pr-4 font-medium">Duration</th>
                <th className="py-2 font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              {cookieTable.map((row) => (
                <tr key={row.name} className="border-t border-white/10">
                  <td className="py-2 pr-4 whitespace-nowrap">{row.name}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">{row.provider}</td>
                  <td className="py-2 pr-4">{row.purpose}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">{row.duration}</td>
                  <td className="py-2 whitespace-nowrap">{row.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-leadq-silver/80 mt-3">
          Replace the bracketed values with your actual analytics and marketing tools once confirmed.
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onClose}
          variant="glass-secondary"
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          onClick={() => onSave({ analytics, marketing })}
          variant="cookie-modal"
          className="flex-1"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;

