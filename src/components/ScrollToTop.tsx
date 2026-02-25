import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { MotionButton } from './ui/motion-button';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const halfViewport = window.innerHeight * 0.5;
      setIsVisible(window.scrollY > halfViewport);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionButton
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          variant="glass-secondary"
          size="icon"
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 rounded-full glass-strong border border-leadq-silver/30 hover:border-leadq-silver/60 hover:shadow-lg hover:shadow-leadq-silver/20"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} strokeWidth={2} />
        </MotionButton>
      )}
    </AnimatePresence>
  );
}

