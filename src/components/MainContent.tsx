import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bot, DollarSign, Mail, LayoutDashboard, HelpCircle } from 'lucide-react';
import { StandardNavbar } from './ui/StandardNavbar';

import Hero from './Hero';

// Lazy-load all below-the-fold sections for faster initial load
const WhatLeadQDoes = lazy(() => import('./WhatLeadQDoes'));
const DashboardPreview = lazy(() => import('./DashboardPreview'));
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
                // Wait a tick for layout to settle, then scroll to the target element
                setTimeout(() => {
                    window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
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
        { name: 'Dashboard', url: '#dashboard', icon: LayoutDashboard },
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

                {/* Dashboard */}
                <DashboardPreview />

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

