import { m } from "framer-motion";
import { InteractiveGlobe } from "@/components/ui/interactive-globe";

export default function Hero() {
    const words = "Where Leads Become Revenue".split(" ");

    return (
        <div id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-10 lg:py-0">
            <div className="relative z-10 container mx-auto px-4 md:px-6 flex items-center w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 w-full">
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        className="max-w-2xl text-center lg:text-left flex-1"
                    >

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 tracking-tighter">
                            {words.map((word, wordIndex) => (
                                <span
                                    key={wordIndex}
                                    className={`inline-block mr-2 sm:mr-3 last:mr-0 ${wordIndex >= 2 ? "bg-gradient-to-r from-leadq-cyan to-leadq-royal-blue bg-clip-text text-transparent" : "text-white"}`}
                                >
                                    {word.split("").map((letter, letterIndex) => (
                                        <m.span
                                            key={`${wordIndex}-${letterIndex}`}
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                delay:
                                                    wordIndex * 0.1 +
                                                    letterIndex * 0.03,
                                                type: "spring",
                                                stiffness: 150,
                                                damping: 25,
                                            }}
                                            className="inline-block"
                                        >
                                            {letter}
                                        </m.span>
                                    ))}
                                </span>
                            ))}
                        </h1>

                        <m.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="text-base sm:text-lg md:text-xl text-leadq-silver font-medium max-w-xl mb-6 drop-shadow-md"
                        >
                            The AI Copilot That Automates Lead Management
                        </m.p>

                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="flex items-center justify-center lg:justify-start gap-6"
                        >
                            <div>
                                <p className="text-2xl font-bold text-white">90%</p>
                                <p className="text-xs text-leadq-silver">Match Accuracy</p>
                            </div>
                            <div className="w-px h-8 bg-leadq-cyan/30" />
                            <div>
                                <p className="text-2xl font-bold text-white">Instant</p>
                                <p className="text-xs text-leadq-silver">AI Lead Qualification</p>
                            </div>
                            <div className="w-px h-8 bg-leadq-cyan/30" />
                            <div>
                                <p className="text-2xl font-bold text-white">3x</p>
                                <p className="text-xs text-leadq-silver">Conversion Rate</p>
                            </div>
                        </m.div>
                    </m.div>

                    <m.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 1.5 }}
                        className="flex-1 flex items-center justify-center w-full relative"
                    >
                        {/* Ambient glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-leadq-cyan/10 blur-3xl pointer-events-none" />
                        <InteractiveGlobe
                            size={460}
                            className="w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[460px] aspect-square"
                            dotColor="rgba(79, 164, 196, ALPHA)"
                            arcColor="rgba(79, 164, 196, 0.5)"
                            markerColor="rgba(39, 81, 169, 1)"
                        />
                    </m.div>
                </div>
            </div>
        </div>
    );
}
