"use client";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";


function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
            } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
            } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
            } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(21, 45, 99,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-leadq-bg"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Background Paths",
}: {
    title?: string;
}) {
    const words = title.split(" ");

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-leadq-bg">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto"
                >
                    <Link to="/discover">
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                boxShadow: [
                                    "0 0 0 0 rgba(255, 255, 255, 0)",
                                    "0 0 0 4px rgba(255, 255, 255, 0.1)",
                                    "0 0 0 0 rgba(255, 255, 255, 0)"
                                ]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                            className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 
                        dark:from-white/10 dark:to-black/10 p-px rounded-full backdrop-blur-lg 
                        overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8 cursor-pointer"
                        >
                            <div
                                className="rounded-full px-8 py-4 text-base font-semibold backdrop-blur-md 
                            bg-gradient-to-r from-leadq-deep-blue via-leadq-royal-blue to-leadq-cyan
                            text-white transition-all duration-300 
                            border border-white/10 flex items-center shadow-[0_0_20px_rgba(39,81,169,0.5)] hover:shadow-[0_0_30px_rgba(39,81,169,0.7)]"
                            >
                                <span className="opacity-90">
                                    Discover Excellence
                                </span>
                                <span
                                    className="ml-3 opacity-70 group-hover:translate-x-1.5 
                                transition-all duration-300"
                                >
                                    →
                                </span>
                            </div>
                        </motion.div>
                    </Link>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-bold mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-leadq-royal-blue/50">
                        {words.map((word, wordIndex) => (
                            <span
                                key={wordIndex}
                                className="inline-block mr-4 last:mr-0"
                            >
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
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
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-lg sm:text-xl md:text-2xl text-leadq-silver font-medium max-w-2xl mx-auto mb-8 drop-shadow-md"
                    >
                        The AI Copilot That Automates Lead Management
                    </motion.p>


                </motion.div>
            </div>
        </div>
    );
}
