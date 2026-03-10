import { m } from 'framer-motion';
import { SpotlightCard } from '@/components/ui/spotlight-card';

const Pricing = () => {




  return (
    <section id="pricing" className="relative z-10 min-h-[100svh] flex flex-col justify-center py-8 lg:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-8">
            <span className="text-[#A89FE0]">
              Pricing
            </span>
          </h2>

          <SpotlightCard className="p-12 max-w-3xl mx-auto border-leadq-royal-blue/20 bg-leadq-deep-blue/10">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              To Be Decided
            </h3>
          </SpotlightCard>
        </m.div>
      </div>
    </section>
  );
};

export default Pricing;

