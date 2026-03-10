import { m } from 'framer-motion';
import { Link2, BrainCircuit, Activity, Mic } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/spotlight-card';

const Features = () => {
  const features = [
    {
      icon: Link2,
      title: 'Instant Contact Capture',
      highlight: 'Zero-Friction Entry',
      description: 'We bridge the gap between real-world handshakes and digital workflows. Instantly capture and digitize interactions so no lead is ever lost.',
      variant: 'gradient'
    },
    {
      icon: BrainCircuit,
      title: 'Instant Lead Response',
      highlight: 'Multi-Agent Swarm',
      description: 'Engage every new lead within seconds across calls, emails and web. LeadQ answers questions, and keeps the conversation alive before interest drops.',
      variant: 'gradient'
    },
    {
      icon: Activity,
      title: 'One Simple Dashboard',
      highlight: 'Real-Time Control',
      description: 'Control the chaos. Manage your physical interactions and digital assistants from a single \'Living\' Dashboard that puts you in the pilot\'s seat.',
      variant: 'gradient'
    },
    {
      icon: Mic,
      title: '24/7 AI Assistants',
      highlight: 'Infinite Scalability',
      description: 'Scale your outreach without scaling headcount. Deploy fully autonomous voice and text assistants that nurture leads 24/7 with human-like empathy.',
      variant: 'gradient'
    }
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
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  };

  return (
    <section id="features" className="relative z-10 min-h-[100svh] flex flex-col justify-center py-8 sm:py-12 lg:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Why Choose{' '}
            <span className="text-[#A89FE0]">
              LeadQ.AI
            </span>
            ?
          </h2>
        </m.div>

        {/* Cards Grid */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isGradient = feature.variant === 'gradient';

            return (
              <m.div
                key={index}
                variants={cardVariants}
                className="h-full"
              >
                <SpotlightCard className="h-full relative p-6 sm:p-7 md:p-8 group flex flex-col">
                  <div className="relative z-10 flex-1">
                    {/* Icon */}
                    <div className="mb-6">
                      <div
                        className={`
                        w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center
                        ${isGradient
                            ? 'bg-white/5 border border-white/10'
                            : 'bg-slate-400/10'
                          }
                        text-slate-200
                      `}
                      >
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-display font-bold mb-3 text-white">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-300 leading-relaxed text-base">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-400/10 to-transparent rounded-bl-full opacity-50 transition-opacity duration-500" />
                </SpotlightCard>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
};

export default Features;
