import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/forever',
      credits: '10 AI credits/month',
      features: [
        'Basic Email Agent',
        'Standard analytics',
        'Community support',

      ],
      cta: 'Start for Free',
      ctaStyle: 'glass hover:glass-strong',
      popular: false
    },
    {
      name: 'Starter',
      price: '$4.99',
      period: '/month',
      credits: '100 AI credits/month',
      features: [
        'Email Agent access',
        'Basic analytics',
        'Email support',
        'Core integrations'
      ],
      cta: 'Get Started',
      ctaStyle: 'glass hover:glass-strong',
      popular: false
    },
    {
      name: 'Pro',
      price: '$10',
      period: '/month',
      credits: '500 AI credits/month',
      features: [
        'All Agents access',
        'Advanced analytics',
        'Priority support',
        'NFC capability',
        'Custom workflows',

      ],
      cta: 'Get Pro',
      ctaStyle: 'bg-gradient-to-r from-leadq-deep-blue to-leadq-royal-blue text-white shadow-[0_0_20px_rgba(39,81,169,0.5)] hover:shadow-[0_0_30px_rgba(39,81,169,0.7)] hover:scale-105',
      popular: true
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="pricing" className="relative z-10 py-16 sm:py-20 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-leadq-cyan to-leadq-royal-blue bg-clip-text text-transparent">
              Plan
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-leadq-silver max-w-2xl mx-auto">
            Pay per action, not per seat. Scale with confidence.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12 px-4 pb-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`glass rounded-2xl p-6 sm:p-8 relative flex flex-col transition-all duration-300 ${plan.popular ? 'lg:scale-105 border-2 border-leadq-royal-blue/30 shadow-[0_0_30px_rgba(39,81,169,0.2)] z-20' : 'z-10'
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-leadq-deep-blue to-leadq-royal-blue text-white text-sm font-bold px-4 py-1 rounded-full shadow-[0_0_15px_rgba(39,81,169,0.5)]">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-leadq-silver">{plan.period}</span>}
                </div>
                <p className="text-leadq-silver text-sm font-medium mt-2">{plan.credits}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-leadq-cyan flex-shrink-0 mt-0.5" />
                    <span className="text-leadq-silver">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-leadq-royal-blue focus:ring-offset-2 focus:ring-offset-leadq-bg active:scale-95 mt-auto ${plan.ctaStyle}`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="glass p-6 rounded-xl">
            <p className="text-leadq-silver mb-2">
              <span className="font-semibold text-white">What are credits?</span> Each AI action (email send, meeting schedule, document scan) costs credits. No surprises.
            </p>
            <a
              href="#"
              className="text-leadq-silver hover:text-leadq-silver/80 text-sm font-medium inline-flex items-center gap-1 transition-colors"
            >
              View detailed pricing →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;

