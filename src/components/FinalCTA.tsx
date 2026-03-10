import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MotionButton } from './ui/motion-button';

export default function FinalCTA() {
  return (
    <section className="relative z-10 min-h-[100svh] flex flex-col justify-center py-8 lg:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgb(8, 8, 42) 0%, rgb(91, 79, 190) 50%, rgb(123, 111, 212) 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          </div>

          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20 text-center"
          >
            <m.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 text-white"
            >
              Ready to Deploy Your AI Workforce?
            </m.h2>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto"
            >

            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                variant="white-primary"
                size="cta-lg"
                className="group flex items-center gap-2"
              >
                Start Free Trial
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </MotionButton>

              <a
                href="#contact"
                className="text-white font-medium hover:text-white/80 transition-colors underline underline-offset-4"
              >
                or schedule a demo
              </a>
            </m.div>
          </m.div>

          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        </m.div>
      </div>
    </section>
  );
}
