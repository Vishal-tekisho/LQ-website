import { m } from "framer-motion";
import { Pen, Sparkles, Infinity as InfinityIcon, Phone } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Tiny sub-components                                                */
/* ------------------------------------------------------------------ */


/** Left floating card — "AI-Powered Writing" */
function AIPoweredWritingCard() {
    return (
        <m.div
            initial={{ opacity: 0, x: -60, rotate: -8 }}
            animate={{ opacity: 1, x: 0, rotate: -6 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="hero-floating-card hero-card-left"
        >
            {/* inner mock content */}
            <div className="hero-card-inner">
                <div className="hero-card-mock-bg">
                    <div className="flex items-center gap-1.5 mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-[10px] font-bold tracking-wider text-gray-700 uppercase">Grow AI</span>
                    </div>
                    <div className="space-y-1.5">
                        <div className="h-1.5 w-full rounded bg-gray-200" />
                        <div className="h-1.5 w-4/5 rounded bg-gray-200" />
                        <div className="h-1.5 w-3/5 rounded bg-gray-200" />
                        <div className="h-1.5 w-full rounded bg-gray-200" />
                        <div className="h-1.5 w-2/3 rounded bg-gray-200" />
                    </div>
                </div>
            </div>

            {/* Label */}
            <div className="mt-4 px-1">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-900">
                        <Pen className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">AI-Powered Writing</h3>
                </div>
                <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">
                    Simplify communication with AI tools that write emails and proposals in seconds.
                </p>
            </div>
        </m.div>
    );
}

/** Right floating card — "Voice Agents" */
function VoiceAgentCard() {
    return (
        <m.div
            initial={{ opacity: 0, x: 60, rotate: 8 }}
            animate={{ opacity: 1, x: 0, rotate: 6 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="hero-floating-card hero-card-right dark-card"
        >
            {/* Voice mock */}
            <div className="hero-card-inner">
                <div className="voice-card-mock relative p-4 rounded-xl bg-[#0f172a] border border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-[#10b981]/20 flex items-center justify-center border border-[#10b981]/30">
                            <Phone className="w-5 h-5 text-[#10b981]" />
                        </div>
                        <div className="space-y-1.5 flex-1">
                            <div className="h-2 w-24 rounded bg-slate-700/50" />
                            <div className="h-2 w-16 rounded bg-slate-700/30" />
                        </div>
                    </div>
                    
                    <div className="space-y-4 mb-4 relative">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className={`h-2 w-2 rounded-full ${i === 1 ? 'bg-[#10b981] shadow-[0_0_8px_#10b981]' : i === 2 ? 'bg-[#10b981]/60' : 'bg-[#06b6d4] shadow-[0_0_8px_#06b6d4]'}`} />
                                <div className="h-2 flex-1 rounded bg-slate-800/80" />
                            </div>
                        ))}
                        
                        {/* Live Call Button Overlay */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2">
                            <div className="flex items-center gap-2 bg-[#10b981] text-white text-[10px] font-bold px-3 py-2 rounded-full shadow-lg shadow-[#10b981]/20">
                                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                                Live Call
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Label */}
            <div className="mt-4 px-1">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900">Voice Agents</h3>
                </div>
                <p className="mt-1.5 text-[11px] text-gray-500 leading-relaxed font-medium">
                    Automate follow-ups, reminders, rescheduling outreach while capturing transcripts and next actions
                </p>
            </div>
        </m.div>
    );
}

/* ------------------------------------------------------------------ */
/*  Main Hero component                                                */
/* ------------------------------------------------------------------ */

export default function Hero() {
    const scrollToSection = (sectionId: string) => {
        const target = document.getElementById(sectionId);
        if (!target) return;
        window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
        window.history.pushState(null, "", `#${sectionId}`);
    };

    return (
        <section id="hero" className="hero-section pb-20">
            {/* -------- Main content wrapper -------- */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">

                {/* Social proof badge */}
                <m.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-28 sm:mt-32 lg:mt-36 flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-2 shadow-sm"
                >
                    <span className="text-sm font-medium text-white/90">The Next Generation of AI CRM is Here</span>
                </m.div>

                {/* Heading */}
                <m.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
                    className="mt-8 text-center"
                >
                    <h1 className="hero-heading">
                        <span className="block">One tool.</span>
                        <span className="flex items-center justify-center gap-[0.2em]">
                            Infinite
                            <span className="hero-infinity-icon flex-shrink-0">
                                <InfinityIcon style={{ width: "0.55em", height: "0.55em" }} strokeWidth={2.5} />
                            </span>
                            potential.
                        </span>
                    </h1>
                </m.div>

                {/* Subtitle */}
                <m.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mt-6 max-w-xl text-center text-base sm:text-lg text-white/60 leading-relaxed"
                >
                    Helping businesses of every size thrive with a smart, all-in-one CRM
                    that boosts growth and deepens customer engagement.
                </m.p>

                {/* CTA Buttons */}
                <m.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.6 }}
                    className="mt-8 flex items-center gap-4"
                >
                    <button
                        onClick={() => scrollToSection("contact")}
                        className="hero-btn-outline"
                    >
                        Book a Demo
                    </button>
                    <button
                        onClick={() => scrollToSection("contact")}
                        className="hero-btn-solid"
                    >
                        Launch Now
                    </button>
                </m.div>
            </div>

            {/* -------- Floating cards (absolute positioned) -------- */}
            <div className="hidden lg:block">
                <AIPoweredWritingCard />
                <VoiceAgentCard />
            </div>
        </section>
    );
}
