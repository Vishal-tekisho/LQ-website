import { motion } from "framer-motion";


export default function Hero() {
    const words = "Where Leads Become Revenue".split(" ");

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">


            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto"
                >
                    <div
                        className="inline-block bg-gradient-to-b from-black/10 to-white/10 
                        dark:from-white/10 dark:to-black/10 p-px rounded-full backdrop-blur-lg 
                        overflow-hidden shadow-lg mb-8"
                    >
                        <div
                            className="rounded-full px-8 py-3 text-sm font-medium backdrop-blur-md 
                            bg-gradient-to-r from-leadq-deep-blue/80 via-leadq-royal-blue/80 to-leadq-cyan/80
                            text-white/90 border border-white/10"
                        >
                            ✨ Discover Excellence
                        </div>
                    </div>


                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 sm:mb-8 tracking-tighter">
                        {words.map((word, wordIndex) => (
                            <span
                                key={wordIndex}
                                className={`inline-block mr-2 sm:mr-3 md:mr-4 last:mr-0 ${wordIndex >= 2 ? "bg-gradient-to-r from-leadq-cyan to-leadq-royal-blue bg-clip-text text-transparent" : "text-white"}`}
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
