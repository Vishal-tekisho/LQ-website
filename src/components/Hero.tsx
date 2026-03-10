import { m } from "framer-motion";
import { InteractiveGlobe } from "@/components/ui/interactive-globe";
export default function Hero() {
    return (
        <div id="hero" className="relative w-full flex items-center justify-center overflow-hidden pt-28 lg:pt-20 pb-12 lg:pb-16 bg-leadq-dark">
            <div className="relative z-10 container mx-auto px-4 md:px-6 flex items-center w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 w-full">
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        className="w-full lg:w-[60%] text-center lg:text-left flex flex-col justify-center max-w-2xl lg:max-w-none mx-auto lg:mx-0 lg:pr-8"
                    >

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-display font-bold mb-6 tracking-tighter leading-tight lg:leading-[1.1] lg:ml-12">
                            <span className="text-white inline-block lg:translate-x-12">Where Leads </span>
                            <br />
                            <span className="bg-gradient-to-r from-leadq-purple to-leadq-purple-light bg-clip-text text-transparent pb-1 pr-1">Become Revenue</span>
                        </h1>

                        <m.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="text-base sm:text-lg md:text-xl lg:text-2xl text-leadq-silver font-medium max-w-xl mx-auto lg:mx-0 lg:ml-12 mb-10 leading-relaxed"
                        >
                            The AI Copilot That Automates Lead Management
                        </m.p>

                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="flex flex-wrap items-center justify-center lg:justify-start lg:ml-12 gap-4 sm:gap-6 lg:gap-12 relative z-10"
                        >
                            <div className="text-center lg:text-left">
                                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">90%</p>
                                <p className="text-[10px] sm:text-xs lg:text-sm text-leadq-silver font-medium">Profile Match Accuracy</p>
                            </div>
                            <div className="w-px h-10 lg:h-12 bg-leadq-purple/30" />
                            <div className="text-center lg:text-left">
                                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">Instant</p>
                                <p className="text-[10px] sm:text-xs lg:text-sm text-leadq-silver font-medium">AI Qualification</p>
                            </div>
                            <div className="w-px h-10 lg:h-12 bg-leadq-purple/30" />
                            <div className="text-center lg:text-left">
                                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">3x</p>
                                <p className="text-[10px] sm:text-xs lg:text-sm text-leadq-silver font-medium">Lead Conversion Rate</p>
                            </div>
                        </m.div>
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 1.5 }}
                        className="w-full lg:w-[40%] flex items-center justify-center relative mt-12 lg:mt-0"
                    >
                        {/* Ambient glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-leadq-purple/10 blur-3xl pointer-events-none" />
                        <InteractiveGlobe
                            size={460}
                            className="w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[460px] aspect-square"
                            dotColor="rgba(123, 111, 212, ALPHA)"
                            arcColor="rgba(123, 111, 212, 0.5)"
                            markerColor="rgba(91, 79, 190, 1)"
                        />
                    </m.div>
                </div>
            </div>
        </div>
    );
}
