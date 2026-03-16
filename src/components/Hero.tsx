import type { ReactNode } from "react";
import { m } from "framer-motion";
import { CalendarDays, Contact, LogIn, Mail, Phone, RefreshCw, User } from "lucide-react";
import { SpotlightButton } from "@/components/ui/SpotlightButton";

function VLine({ height = "h-6" }: { height?: string }) {
    return (
        <div className="flex justify-center">
            <div className={`w-0 border-l-2 border-dashed border-white/20 ${height}`} />
        </div>
    );
}

function Dot() {
    return (
        <div className="flex justify-center">
            <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_2px_rgba(59,130,246,0.45)]" />
        </div>
    );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm ${className}`}>
            {children}
        </div>
    );
}

function WorkflowDiagram() {
    return (
        <div className="mx-auto w-full max-w-[460px] select-none text-left text-sm lg:ml-auto flex flex-col items-center">

            {/* User Arrives */}
            <div className="flex flex-col items-center gap-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05]">
                    <User className="h-6 w-6 text-white/80" />
                </div>
                <span className="text-xs font-medium tracking-wide text-white/60">User Arrives</span>
            </div>

            {/* Connector: vline + dot */}
            <VLine />
            <Dot />

            {/* Login & Authentication */}
            <div className="w-full mt-2 hover:-translate-y-1 transition-transform duration-300">
                <Card className="px-4 py-3">
                    <div className="flex items-center gap-3 font-medium text-white text-base">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/[0.15] text-blue-400">
                            <LogIn className="h-4 w-4" />
                        </div>
                        Login &amp; Authentication
                    </div>
                </Card>
            </div>

            {/* Connector: vline (no dot) */}
            <VLine />

            {/* Dashed-border rectangle */}
            <div className="w-full border border-dashed border-white/20 rounded-2xl p-3 flex flex-col">

                {/* Row 1: Contact capture & Research | Meetings */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="hover:-translate-y-1 transition-transform duration-300">
                        <Card className="px-3 py-3">
                            <div className="flex items-start gap-2 font-medium text-white text-sm">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-600/[0.15] text-teal-400 mt-0.5">
                                    <Contact className="h-4 w-4" />
                                </div>
                                <span className="leading-snug">Contact capture &amp; Research</span>
                            </div>
                        </Card>
                    </div>
                    <div className="hover:-translate-y-1 transition-transform duration-300">
                        <Card className="px-3 py-3">
                            <div className="flex items-center gap-2 font-medium text-white text-sm">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600/[0.15] text-indigo-300">
                                    <CalendarDays className="h-4 w-4" />
                                </div>
                                Meetings
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Inner connector: dashed horizontal bar + center vertical drop */}
                <div className="relative my-2">
                    <div
                        className="w-full h-px"
                        style={{ background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 5px, transparent 5px, transparent 10px)' }}
                    />
                    <div className="absolute top-0 left-1/2 -translate-x-px">
                        <div className="h-2 w-0 border-l-2 border-dashed border-white/20" />
                    </div>
                </div>

                {/* Row 2: Emails | Voice Calls */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="hover:-translate-y-1 transition-transform duration-300">
                        <Card className="px-3 py-3">
                            <div className="flex items-center gap-2 font-medium text-white text-sm">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-600/[0.15] text-teal-400">
                                    <Mail className="h-4 w-4" />
                                </div>
                                Emails
                            </div>
                        </Card>
                    </div>
                    <div className="hover:-translate-y-1 transition-transform duration-300">
                        <Card className="px-3 py-3">
                            <div className="flex items-center gap-2 font-medium text-white text-sm">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-600/[0.15] text-cyan-400">
                                    <Phone className="h-4 w-4" />
                                </div>
                                Voice Calls
                            </div>
                        </Card>
                    </div>
                </div>

            </div>

            {/* Connector: vline + dot */}
            <VLine />
            <Dot />

            {/* Continuous Engagement Cycle */}
            <div className="w-full mt-2 hover:-translate-y-1 transition-transform duration-300">
                <Card className="rounded-[2rem] border-blue-400/20 bg-blue-500/[0.06] flex flex-col gap-3 px-4 py-4">
                    <div className="flex items-center gap-3 text-base font-medium text-white">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/[0.15] text-blue-400">
                            <RefreshCw className="h-4 w-4" />
                        </div>
                        Continuous Engagement Cycle
                    </div>
                    <p className="text-sm text-white/60">
                        Keep leads engaged through automated, recurring touchpoints across every channel.
                    </p>
                </Card>
            </div>

        </div>
    );
}

export default function Hero() {
    const scrollToSection = (sectionId: string) => {
        const target = document.getElementById(sectionId);
        if (!target) return;
        window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
        window.history.pushState(null, "", `#${sectionId}`);
    };

    return (
        <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-leadq-dark px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-20 lg:pt-24">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 opacity-[0.06] noise" />
            </div>

            <div className="relative z-10 mx-auto flex min-h-[calc(100svh-8rem)] w-full max-w-7xl flex-col justify-center">
                <div className="flex flex-col items-center gap-16 pt-6 lg:flex-row lg:items-center lg:justify-between lg:pt-8">
                    {/* Left Column */}
                    <m.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="flex w-full max-w-2xl flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left"
                    >
                        <h1 className="text-[clamp(2.5rem,4.5vw,4.5rem)] font-display font-bold leading-[1.05] tracking-[-0.02em] text-white">
                            The best automated <br className="hidden lg:block" />
                            CRM for all <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> businesses</span>
                        </h1>

                        <p className="mt-6 max-w-xl text-balance text-lg font-medium leading-relaxed text-leadq-silver/90 sm:text-xl">
                            Manage contacts and interactions in one system, helping your team build stronger relationships and loyal customers.
                        </p>

                        <div className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row lg:justify-start">
                            <SpotlightButton
                                className="w-full sm:w-auto"
                                onClick={() => scrollToSection("contact")}
                            >
                                <span className="flex items-center justify-center gap-2 px-6 py-1 sm:px-4">
                                    Get Started
                                </span>
                            </SpotlightButton>
                        </div>
                    </m.div>

                    {/* Right Column */}
                    <m.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                        className="flex w-full justify-center lg:w-1/2 lg:justify-end"
                    >
                        <WorkflowDiagram />
                    </m.div>
                </div>

            </div>
        </section>
    );
}
