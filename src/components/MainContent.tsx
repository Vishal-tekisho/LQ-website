import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, Bot, DollarSign, Mail, Briefcase, LayoutDashboard, HelpCircle, PenLine, ScanLine, UserPlus, Calendar } from 'lucide-react';
import { StandardNavbar } from './ui/StandardNavbar';

import Hero from './Hero';

// Lazy-load all below-the-fold sections for faster initial load
const WhatLeadQDoes = lazy(() => import('./WhatLeadQDoes'));
const Features = lazy(() => import('./Features'));
const UseCases = lazy(() => import('./UseCases'));
const LeadCaptureStream = lazy(() => import('./LeadCaptureStream'));
const ProfileEnrichment = lazy(() => import('./ProfileResearch'));
const DashboardPreview = lazy(() => import('./DashboardPreview'));
const BookingsMeeting = lazy(() => import('./BookingsMeeting'));
const EmailDraftAnimation = lazy(() => import('./EmailDraftAnimation'));
const OutboundVoiceAgent = lazy(() => import('./OutboundVoiceAgent'));
const Agents = lazy(() => import('./Agents'));
const Pricing = lazy(() => import('./Pricing'));
const FAQ = lazy(() => import('./FAQ'));
const Contact = lazy(() => import('./Contact'));
const Footer = lazy(() => import('./Footer'));

const MainContent = () => {
    const location = useLocation();

    // Scroll to a target section when arriving via navigation state (e.g. "Back to LeadQ.AI")
    useEffect(() => {
        const scrollTarget = (location.state as { scrollTo?: string } | null)?.scrollTo;
        if (!scrollTarget) return;

        // Clear the state so a page refresh doesn't re-scroll.
        // Use window.history directly to avoid triggering React Router's
        // location change (which would re-fire RouteScrollToTop and scroll to top).
        window.history.replaceState({}, '', location.pathname);

        // The target element may not be in the DOM yet (lazy-loaded).
        // Poll until it appears (up to ~5 s).
        let attempts = 0;
        const maxAttempts = 50; // 50 × 100 ms = 5 s
        const tryScroll = () => {
            const el = document.getElementById(scrollTarget);
            if (el) {
                // Wait a tick for layout to settle, then scroll to the very bottom
                setTimeout(() => {
                    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
                }, 50);
                return;
            }
            attempts++;
            if (attempts < maxAttempts) {
                setTimeout(tryScroll, 100);
            }
        };
        tryScroll();
    }, [location.state, location.pathname]);

    const navItems = [
        { name: 'Features', url: '#features', icon: Sparkles },
        { name: 'Use Cases', url: '#use-cases', icon: Briefcase },
        { name: 'Lead Capture', url: '#lead-capture', icon: ScanLine },
        { name: 'Enrichment', url: '#profile-enrichment', icon: UserPlus },
        { name: 'Dashboard', url: '#dashboard', icon: LayoutDashboard },
        { name: 'Meetings', url: '#bookings-meeting', icon: Calendar },
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

            {/* Lazy-loaded sections with lightweight placeholders */}
            <Suspense fallback={<div className="min-h-[400px]" />}>
                {/* 2. What LeadQ.AI Does */}
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
            </Suspense>
        </>
    );
};

export default MainContent;

