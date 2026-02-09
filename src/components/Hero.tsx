import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import EnergyBeam from './ui/energy-beam';

// Toggle to enable/disable the energy beam animation
const ENABLE_ENERGY_BEAM = true;

// Word component with staggered animation
function Word({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span
      className="word inline-block opacity-0"
      data-delay={delay}
      style={{ marginRight: '0.3em' }}
    >
      {children}
    </span>
  );
}

// Gradient Word component - uses transform instead of opacity for animation
function GradientWord({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span
      className="gradient-word inline-block"
      data-delay={delay}
      style={{ marginRight: '0.3em' }}
    >
      {children}
    </span>
  );
}

export default function Hero() {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate regular words with staggered delays
    const words = document.querySelectorAll<HTMLElement>('.word');
    words.forEach((word) => {
      const delay = parseInt(word.getAttribute('data-delay') || '0', 10);
      setTimeout(() => {
        word.style.animation = 'word-appear 0.8s ease-out forwards';
      }, delay);
    });

    // Animate gradient words with staggered delays
    const gradientWords = document.querySelectorAll<HTMLElement>('.gradient-word');
    gradientWords.forEach((word) => {
      const delay = parseInt(word.getAttribute('data-delay') || '0', 10);
      setTimeout(() => {
        word.style.animation = 'gradient-word-appear 0.8s ease-out forwards';
      }, delay);
    });

    // Mouse gradient follow effect
    const gradient = gradientRef.current;
    function onMouseMove(e: MouseEvent) {
      if (gradient) {
        gradient.style.left = e.clientX - 192 + 'px';
        gradient.style.top = e.clientY - 192 + 'px';
        gradient.style.opacity = '1';
      }
    }
    function onMouseLeave() {
      if (gradient) gradient.style.opacity = '0';
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Word hover glow effects
    words.forEach((word) => {
      word.addEventListener('mouseenter', () => {
        word.style.textShadow = '0 0 20px rgba(192, 192, 192, 0.5)';
      });
      word.addEventListener('mouseleave', () => {
        word.style.textShadow = 'none';
      });
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: 'easeOut' as const },
    },
  };

  return (
    <section id="main-content" className="relative z-10 min-h-screen flex items-start justify-center overflow-hidden px-4 py-16 sm:py-20 pt-32 sm:pt-40">
      {ENABLE_ENERGY_BEAM && (
        <div className="absolute inset-0 z-0" style={{ filter: 'grayscale(100%) brightness(0.9) contrast(1.1)' }}>
          <EnergyBeam className="opacity-50" />
        </div>
      )}

      <div className="relative z-20 w-full max-w-4xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >

          {/* Discover Excellence Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-6 sm:mb-8"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-black to-leadq-silver border border-leadq-silver/30 shadow-[0_0_20px_rgba(192,192,192,0.3)]">
              <span className="text-sm sm:text-base font-bold tracking-widest uppercase text-white">
                Discover Excellence
              </span>
            </span>
          </motion.div>

          {/* Main Headline with word-by-word animation */}
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-wide mb-4 sm:mb-6 leading-tight"
          >
            <div className="flex flex-wrap justify-center items-center gap-x-2">
              <span className="text-white">
                <Word delay={0}>Where</Word>
                <Word delay={150}>Leads</Word>
              </span>
              <span>
                <GradientWord delay={300}>Become</GradientWord>
                <GradientWord delay={450}>Revenue</GradientWord>
              </span>
            </div>
          </motion.h1>

          {/* Subtitle with word-by-word animation */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl px-4 sm:px-0"
          >
            <Word delay={600}>The</Word>
            <Word delay={700}>AI</Word>
            <Word delay={800}>Copilot</Word>
            <Word delay={900}>That</Word>
            <Word delay={1000}>Automates</Word>
            <Word delay={1100}>Lead</Word>
            <Word delay={1200}>Management.</Word>
          </motion.p>

        </motion.div>
      </div>

      {/* Mouse follow gradient effect */}
      <div
        ref={gradientRef}
        className="fixed pointer-events-none w-96 h-96 rounded-full blur-3xl transition-all duration-500 ease-out opacity-0 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(192,192,192,0.1) 0%, transparent 100%)',
        }}
      />
    </section>
  );
}
