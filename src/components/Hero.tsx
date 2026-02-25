import { motion } from "framer-motion";


export default function Hero() {
    const words = "Where Leads Become Revenue".split(" ");

    return (
        <div id="hero" className="relative min-h-[85vh] py-32 w-full flex items-center justify-center overflow-hidden">


            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto"
                >
        
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
