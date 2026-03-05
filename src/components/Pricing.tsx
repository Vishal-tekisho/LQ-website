import { m } from 'framer-motion';


const Pricing = () => {




  return (
    <section id="pricing" className="relative z-10 py-16 sm:py-20 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-8">
            <span className="bg-gradient-to-r from-leadq-cyan to-leadq-royal-blue bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>

          <div className="glass rounded-2xl p-12 max-w-3xl mx-auto border border-leadq-royal-blue/20 bg-leadq-deep-blue/10 backdrop-blur-sm">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              To Be Decided
            </h3>
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default Pricing;

