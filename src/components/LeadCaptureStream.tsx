import { useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Mail, Phone, Linkedin, Briefcase, Scan, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { SpotlightCard } from '@/components/ui/spotlight-card';

const LOTTIE_URL = 'https://lottie.host/2e6e9c91-c9e7-4c14-b14d-3ac7e7e78c4a/fZQYSdIyEk.json';

interface LeadCard {
  name: string;
  company: string;
  role: string;
  email?: string;
  phone?: string;
  linkedin?: string;
}

const fallbackCards: LeadCard[] = [
  { name: 'James Peterson', company: 'TechFlow', role: 'Sales Director', email: 'james@techflow.com', phone: '+1 (555) 123-4567', linkedin: '@james-peterson' },
  { name: 'Liam Rogers', company: 'GreenTech', role: 'VP Marketing', email: 'liam@greentech.com', phone: '+1 (555) 234-5678', linkedin: '@liam-rogers' },
  { name: 'David Thompson', company: 'Pinkling', role: 'Creative Strategist', email: 'david@pinkling.com', phone: '+1 (646) 555-1234', linkedin: '@david-thompson' },
  { name: 'Anna Collins', company: 'ACME Co', role: 'Business Dev', email: 'anna@acme.co', phone: '+1 (555) 345-6789', linkedin: '@anna-collins' },
  { name: 'Emily Carter', company: 'Hexaflow', role: 'VP Sales', email: 'emily@hexaflow.com', phone: '+1 (555) 456-7890', linkedin: '@emily-carter' },
  { name: 'Sarah Chen', company: 'DataSync', role: 'Account Executive', email: 'sarah@datasync.com', phone: '+1 (555) 567-8901', linkedin: '@sarah-chen' },
];

function FallbackCard({ name, company, role }: { name: string; company: string; role: string }) {
  return (
    <div className="flex-shrink-0 w-48 h-28 mx-4 transition-transform">
      <SpotlightCard className="p-4 flex flex-col justify-between rounded-xl h-full border-white/10">
        <div>
          <p className="font-semibold text-white text-sm">{name}</p>
          <p className="text-xs text-leadq-silver">{role}</p>
        </div>
        <p className="text-[10px] text-leadq-silver">{company}</p>
      </SpotlightCard>
    </div>
  );
}

function FallbackMarquee() {
  const duplicatedCards = [...fallbackCards, ...fallbackCards];

  return (
    <div className="absolute inset-0 flex items-center overflow-hidden">
      <div className="flex items-center animate-marquee">
        {duplicatedCards.map((card, index) => (
          <FallbackCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}

interface PhoneScannerOverlayProps {
  lead: LeadCard;
  leadIndex: number;
  totalLeads: number;
  isScanning: boolean;
  showEnriched: boolean;
  onNextLead: () => void;
  onPrevLead: () => void;
  onToggleView: () => void;
}

function PhoneScannerOverlay({
  lead,
  leadIndex,
  totalLeads,
  isScanning,
  showEnriched,
  onNextLead,
  onPrevLead,
  onToggleView,
}: PhoneScannerOverlayProps) {
  return (
    <div className="absolute z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="relative w-64 md:w-72">
        <div className="relative rounded-[2.5rem] border-4 border-slate-700 max-sm:bg-white sm:bg-black/80 backdrop-blur-sm p-2 shadow-2xl">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 max-sm:bg-slate-200 sm:bg-black rounded-full z-10" />

          <div className="relative rounded-[2rem] max-sm:bg-white sm:bg-gradient-to-b sm:from-gray-900/90 sm:to-black/90 overflow-hidden min-h-[420px]">
            <div className="flex items-center justify-between px-6 py-2 max-sm:text-slate-500 sm:text-leadq-silver text-xs">
              <span>9:21</span>
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  <div className="w-1 h-2 max-sm:bg-slate-400 sm:bg-leadq-silver rounded-sm" />
                  <div className="w-1 h-2.5 max-sm:bg-slate-400 sm:bg-leadq-silver rounded-sm" />
                  <div className="w-1 h-3 max-sm:bg-slate-400 sm:bg-leadq-silver rounded-sm" />
                  <div className="w-1 h-3.5 max-sm:bg-slate-400 sm:bg-leadq-silver rounded-sm" />
                </div>
                <div className="w-5 h-2.5 border max-sm:border-slate-400 sm:border-leadq-silver rounded-sm ml-1">
                  <div className="w-3/4 h-full max-sm:bg-slate-400 sm:bg-leadq-silver rounded-sm" />
                </div>
              </div>
            </div>

            <div className="px-4 py-4">
              {/* Header with toggle */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Scan className="w-5 h-5 max-sm:text-slate-500 sm:text-leadq-silver" />
                  <span className="max-sm:text-slate-700 sm:text-leadq-silver font-semibold text-sm">AI Scanner</span>
                </div>
                <Button
                  onClick={onToggleView}
                  variant="toggle-sm"
                  size="compact-sm"
                  className={showEnriched ? 'animate-btn-pulse' : ''}
                >
                  {showEnriched ? 'Raw' : 'Enriched'}
                </Button>
              </div>

              {/* Scan area */}
              <div className="relative border-2 border-dashed max-sm:border-slate-300 sm:border-leadq-silver/50 rounded-xl p-4 mb-4 h-40 overflow-hidden">
                <div className="absolute inset-0 max-sm:bg-slate-50 sm:bg-leadq-silver/5 rounded-xl" />
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 max-sm:border-slate-400 sm:border-leadq-silver rounded-tl-lg z-20" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 max-sm:border-slate-400 sm:border-leadq-silver rounded-tr-lg z-20" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 max-sm:border-slate-400 sm:border-leadq-silver rounded-bl-lg z-20" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 max-sm:border-slate-400 sm:border-leadq-silver rounded-br-lg z-20" />

                {isScanning ? (
                  <>
                    {/* Virtual Business Card sliding up */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 h-28 bg-white rounded-md shadow-lg p-3 animate-card-slide-up flex flex-col justify-between z-10 border border-slate-200">
                      <div>
                        <div className="h-2 w-16 bg-slate-300 rounded mb-1.5" />
                        <div className="h-1.5 w-12 bg-slate-200 rounded" />
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <div className="h-1 w-20 bg-slate-200 rounded" />
                          <div className="h-1 w-16 bg-slate-200 rounded" />
                        </div>
                        <div className="w-6 h-6 rounded-full bg-slate-200" />
                      </div>
                    </div>

                    {/* Thick laser sweep */}
                    <div className="laser-beam" />
                  </>
                ) : (
                  <div className="relative z-10 text-center py-4 h-full flex flex-col items-center justify-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full max-sm:bg-slate-200 sm:bg-leadq-silver/20 flex items-center justify-center">
                      <Scan className="w-6 h-6 max-sm:text-slate-500 sm:text-leadq-silver" />
                    </div>
                    <p className="text-xs max-sm:text-slate-500 sm:text-leadq-silver">
                      Ready to scan business card
                    </p>
                  </div>
                )}
              </div>

              {/* Lead details card */}
              <div className={`transition-all duration-500 transform ${showEnriched && !isScanning ? 'animate-pop-in' : ''} ${isScanning ? 'opacity-80 scale-[0.98]' : 'opacity-100 scale-100'}`}>
                <SpotlightCard className="max-sm:bg-slate-100 max-sm:border-slate-200 rounded-xl p-4 sm:border-white/10">
                  {showEnriched && !isScanning ? (
                    <>
                      <div className="flex gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#A89FE0] to-[#7B6FD4] flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{lead.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold max-sm:text-slate-900 sm:text-white text-sm truncate">{lead.name}</p>
                          <p className="text-xs max-sm:text-slate-500 sm:text-leadq-silver truncate">{lead.role}</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center gap-2 max-sm:text-slate-600 sm:text-leadq-silver">
                          <Mail size={10} className="flex-shrink-0" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-2 max-sm:text-slate-600 sm:text-leadq-silver">
                          <Phone size={10} className="flex-shrink-0" />
                          <span>{lead.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 max-sm:text-slate-600 sm:text-leadq-silver">
                          <Linkedin size={10} className="flex-shrink-0" />
                          <span>{lead.linkedin}</span>
                        </div>
                        <div className="flex items-center gap-2 max-sm:text-slate-600 sm:text-leadq-silver">
                          <Briefcase size={10} className="flex-shrink-0" />
                          <span>{lead.company}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-[10px] max-sm:text-slate-600 sm:text-leadq-silver space-y-1 font-mono">
                      <p className="max-sm:text-slate-400 sm:text-leadq-silver">// Raw scan data</p>
                      {isScanning ? (
                        <div className="flex flex-col items-start min-h-[60px]">
                          <span className="typing-effect delay-75">NAME: {lead.name}</span>
                          <span className="typing-effect delay-150">ROLE: {lead.role}</span>
                          <span className="typing-effect delay-300">COMPANY: {lead.company}</span>
                          <span className="typing-effect text-leadq-purple mt-1 blink-caret">Extracting full profile...</span>
                        </div>
                      ) : (
                        <>
                          <p>NAME: {lead.name}</p>
                          <p>ROLE: {lead.role}</p>
                          <p>COMPANY: {lead.company}</p>
                          <p className="max-sm:text-slate-400 sm:text-leadq-silver/70">// Enrichment pending...</p>
                          <p className="max-sm:text-slate-400 sm:text-leadq-silver/70">EMAIL: [extracting...]</p>
                          <p className="max-sm:text-slate-400 sm:text-leadq-silver/70">PHONE: [extracting...]</p>
                        </>
                      )}
                    </div>
                  )}
                </SpotlightCard>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-3">
                <Button
                  onClick={onPrevLead}
                  variant="nav-small"
                  size="compact-sm"
                  className="flex items-center gap-1"
                >
                  <ChevronLeft size={14} />
                  <span>Prev</span>
                </Button>
                <span className="text-[10px] max-sm:text-slate-400 sm:text-leadq-silver/70">
                  {leadIndex + 1} / {totalLeads}
                </span>
                <Button
                  onClick={onNextLead}
                  variant="nav-small"
                  size="compact-sm"
                  className="flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </Button>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

export default function LeadCaptureStream() {
  const [lottieError, setLottieError] = useState(false);
  const [lottieLoaded, setLottieLoaded] = useState(false);

  // Interactive state
  const [currentLeadIndex, setCurrentLeadIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [showEnriched, setShowEnriched] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!lottieLoaded) {
        setLottieError(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [lottieLoaded]);

  // Scan animation handler
  const handleScanClick = () => {
    if (isScanning) return;
    setIsScanning(true);
    setShowEnriched(false);

    // Show raw data first, then switch to enriched after scan completes
    setTimeout(() => {
      setCurrentLeadIndex((prev) => (prev + 1) % fallbackCards.length);
      setShowEnriched(true);
      setIsScanning(false);
    }, 2500); // Increased time slightly to allow typing and card animation to play out
  };

  // Navigation handlers
  const handleNextLead = () => {
    if (isScanning) return;
    setCurrentLeadIndex((prev) => (prev + 1) % fallbackCards.length);
    setShowEnriched(true); // Ensure enriched view on navigation
  };

  const handlePrevLead = () => {
    if (isScanning) return;
    setCurrentLeadIndex((prev) => (prev - 1 + fallbackCards.length) % fallbackCards.length);
    setShowEnriched(true);
  };

  // Toggle view handler
  const handleToggleView = () => {
    setShowEnriched(!showEnriched);
  };

  const currentLead = fallbackCards[currentLeadIndex];

  return (
    <section id="lead-capture" className="relative z-10 py-12 sm:py-16 md:py-20 px-4 overflow-hidden">


      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4">
            Turn Every Scan Into{' '}
            <span className="text-[#A89FE0]">
              Revenue
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-leadq-silver max-w-2xl mx-auto mb-6 sm:mb-8">
            Scan conference badges, business cards, LinkedIn QR codes, and more - instantly validate, qualify, enrich, and sync.
          </p>

          {/* Scan Now Button */}
          <Button
            onClick={handleScanClick}
            disabled={isScanning}
            variant={isScanning ? 'ghost' : 'gradient-blue'}
            size="compact-lg"
            className={isScanning ? 'scale-95 text-slate-400' : 'hover:scale-105 animate-btn-pulse'}
          >
            <Zap size={18} className={isScanning ? 'animate-spin' : ''} />
            {isScanning ? 'Scanning...' : 'Scan Now'}
          </Button>
        </div>

        <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] flex items-center justify-center">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-leadq-bg to-transparent z-30 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-leadq-bg to-transparent z-30 pointer-events-none" />

          {!lottieError ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Player
                src={LOTTIE_URL}
                loop
                autoplay
                background="transparent"
                style={{ width: '100%', height: '100%' }}
                onEvent={(event) => {
                  if (event === 'load') setLottieLoaded(true);
                  if (event === 'error') setLottieError(true);
                }}
              />
            </div>
          ) : (
            <FallbackMarquee />
          )}

          <PhoneScannerOverlay
            lead={currentLead}
            leadIndex={currentLeadIndex}
            totalLeads={fallbackCards.length}
            isScanning={isScanning}
            showEnriched={showEnriched}
            onNextLead={handleNextLead}
            onPrevLead={handlePrevLead}
            onToggleView={handleToggleView}
          />
        </div>
      </div>
    </section>
  );
}

