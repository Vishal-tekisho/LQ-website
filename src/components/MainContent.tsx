import { Sparkles, Bot, DollarSign, Mail, Briefcase, LayoutDashboard, HelpCircle, PenLine, ScanLine, UserPlus, Calendar } from 'lucide-react';
import { StandardNavbar } from './ui/StandardNavbar';

import Hero from './Hero';
import WhatLeadQDoes from './WhatLeadQDoes';
import Features from './Features';
import UseCases from './UseCases';
import LeadCaptureStream from './LeadCaptureStream';
import ProfileEnrichment from './ProfileResearch';
import DashboardPreview from './DashboardPreview';
import BookingsMeeting from './BookingsMeeting';
import EmailDraftAnimation from './EmailDraftAnimation';
import OutboundVoiceAgent from './OutboundVoiceAgent';
import Agents from './Agents';
import Pricing from './Pricing';
import FAQ from './FAQ';
import Contact from './Contact';
import Footer from './Footer';

const MainContent = () => {
    const navItems = [
        { name: 'Features', url: '#features', icon: Sparkles },
        { name: 'Use Cases', url: '#use-cases', icon: Briefcase },
        { name: 'Lead Capture', url: '#lead-capture', icon: ScanLine },
        { name: 'Enrichment', url: '#profile-enrichment', icon: UserPlus },
        { name: 'Dashboard', url: '#dashboard', icon: LayoutDashboard },
        { name: 'Bookings', url: '#bookings-meeting', icon: Calendar },
        { name: 'Email Draft', url: '#email-draft', icon: PenLine },
        { name: 'AI Agents', url: '#agents', icon: Bot },
        { name: 'Pricing', url: '#pricing', icon: DollarSign },
        { name: 'FAQ', url: '#faq', icon: HelpCircle },
        { name: 'Contact', url: '#contact', icon: Mail }
    ];

    return (
        <>
            <StandardNavbar items={navItems} />


            {/* Hero Section */}
            <Hero />

            {/* 2. What LeadQ Does */}
            <WhatLeadQDoes />

            {/* Use Cases - Real Teams, Real Results */}
            <UseCases />

            {/* Features */}
            <Features />

            {/* 2. Lead Capture Stream */}
            <LeadCaptureStream />

            {/* 3. Profile Research */}
            <ProfileEnrichment />

            {/* 4. Dashboard Preview */}
            <DashboardPreview />

            {/* 5. Bookings & Meetings */}
            <BookingsMeeting />

            {/* 6. Email Draft Animation */}
            <section id="email-draft">
                <EmailDraftAnimation />
            </section>

            {/* 7. Outbound Voice Agent */}
            <OutboundVoiceAgent />

            {/* AI Agents */}
            <Agents />

            {/* 10. Pricing */}
            <Pricing />

            {/* 11. FAQ */}
            <FAQ />

            {/* 12. Contact */}
            <Contact />

            <Footer />
        </>
    );
};

export default MainContent;

