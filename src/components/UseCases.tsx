import { m } from 'framer-motion';
import { Building2, Rocket, Users, Briefcase, TrendingUp, Zap } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/spotlight-card';

const UseCases = () => {
  const useCases = [
    {
      icon: Building2,
      title: 'Real Estate Agents',
      description: 'Capture buyer and seller details at open houses, sync notes from the showing, and send a follow-up before the prospect drives home.',
      metrics: [
        { label: 'Lead logged', value: '< 2 min' },
        { label: 'Follow-up coverage', value: '93%' }
      ],
      gradient: 'from-leadq-purple/10 to-leadq-purple-light/5',
      iconColor: 'text-leadq-purple-light'
    },
    {
      icon: Rocket,
      title: 'B2B SaaS Sales Teams',
      description: 'Turn badge scans, inbound demos, and SDR handoffs into clean records with research notes and next-step recommendations for each rep.',
      metrics: [
        { label: 'Admin time saved', value: '6 hrs/wk' },
        { label: 'Speed to first touch', value: '9 min' }
      ],
      gradient: 'from-leadq-purple/10 to-leadq-purple-light/5',
      iconColor: 'text-leadq-purple-light'
    },
    {
      icon: Users,
      title: 'Recruiting Teams',
      description: 'Collect candidate details at career fairs, attach role preferences, and keep recruiters aligned on who needs a same-day follow-up.',
      metrics: [
        { label: 'Candidate routing', value: 'Same day' },
        { label: 'Manual entry reduced', value: '78%' }
      ],
      gradient: 'from-leadq-purple/10 to-leadq-purple-light/5',
      iconColor: 'text-leadq-purple-light'
    },
    {
      icon: Briefcase,
      title: 'Event Organizers',
      description: 'Move sponsor, exhibitor, and VIP conversations into a shared system instantly so post-event outreach starts while interest is still high.',
      metrics: [
        { label: 'Check-in processing', value: '< 30 sec' },
        { label: 'Sponsor follow-up', value: '96%' }
      ],
      gradient: 'from-leadq-purple/10 to-leadq-purple-light/5',
      iconColor: 'text-leadq-purple-light'
    },
    {
      icon: TrendingUp,
      title: 'Marketing Agencies',
      description: 'Track inbound leads from landing pages, referrals, and discovery calls in one queue so account leads can respond with context.',
      metrics: [
        { label: 'Lead response SLA', value: '< 15 min' },
        { label: 'Qualified briefs booked', value: '+22%' }
      ],
      gradient: 'from-leadq-purple/10 to-leadq-purple-light/5',
      iconColor: 'text-leadq-purple-light'
    },
    {
      icon: Zap,
      title: 'Consulting Firms',
      description: 'Capture project requirements during intro calls, enrich company records automatically, and prepare tailored follow-up emails for partners.',
      metrics: [
        { label: 'Proposal prep saved', value: '4 hrs/deal' },
        { label: 'Follow-up consistency', value: '91%' }
      ],
      gradient: 'from-leadq-purple/10 to-leadq-purple-light/5',
      iconColor: 'text-leadq-purple-light'
    },
    {
      icon: TrendingUp,
      title: 'Financial Advisors',
      description: 'Log prospect conversations securely, capture household details accurately, and keep advisors on schedule with compliant follow-up tasks.',
      metrics: [
        { label: 'Notes completed', value: '98%' },
        { label: 'Prep time saved', value: '3 hrs/wk' }
      ],
      gradient: 'from-leadq-purple/10 to-leadq-purple-light/5',
      iconColor: 'text-leadq-purple-light'
    },
    {
      icon: Building2,
      title: 'Home Services Teams',
      description: 'Turn estimate requests and field calls into structured opportunities with job details, urgency tags, and cleaner dispatch handoffs.',
      metrics: [
        { label: 'Quote turnaround', value: 'Same day' },
        { label: 'Missed callbacks', value: '-61%' }
      ],
      gradient: 'from-leadq-purple/10 to-leadq-purple-light/5',
      iconColor: 'text-leadq-purple-light'
    },
    {
      icon: Zap,
      title: 'Startup Founders',
      description: 'Stay on top of investor, partner, and early customer conversations without adding headcount or losing context between meetings.',
      metrics: [
        { label: 'Weekly admin saved', value: '5 hrs' },
        { label: 'Warm follow-ups sent', value: '90%' }
      ],
      gradient: 'from-leadq-purple/10 to-leadq-purple-light/5',
      iconColor: 'text-leadq-purple-light'
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const
      }
    }
  };

  return (
    <section id="use-cases" className="relative z-10 py-12 lg:py-14 px-4 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-400/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 lg:mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4" style={{ textShadow: 'none' }}>
            Built for teams that value{' '}
            <span className="text-[#A89FE0]" style={{ textShadow: 'none', filter: 'none' }}>
              efficiency
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto" style={{ textShadow: 'none' }}>
            See how LeadQ.AI transforms lead management and accelerates follow-ups to close deals faster
          </p>
        </m.div>

        {/* Use Cases Grid */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <m.div
                key={index}
                variants={itemVariants}
                className="group relative h-full"
              >
                {/* Background gradient glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} rounded-2xl opacity-30 blur-xl`} />

                {/* Card content */}
                <SpotlightCard className="relative p-5 lg:p-5 h-full flex flex-col gap-4 transition-all duration-300 bg-slate-900/80 border border-slate-800 backdrop-blur-sm rounded-2xl">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${useCase.gradient} flex items-center justify-center transition-transform duration-300`}>
                      <Icon className={useCase.iconColor} size={26} strokeWidth={2} style={{ filter: 'none' }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-lg lg:text-xl font-display font-bold mb-2 text-white leading-tight">
                      {useCase.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {useCase.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                      {useCase.metrics.map((metric, idx) => (
                        <div key={idx} className="min-w-0">
                          <div className={`text-lg font-bold ${useCase.iconColor} mb-1`}>
                            {metric.value}
                          </div>
                          <div className="text-xs text-slate-500 font-medium leading-snug">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </m.div>
            );
          })}
        </m.div>

        {/* Bottom CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10 lg:mt-12"
        >
          <p className="text-slate-400 mb-6">
            Ready to see how LeadQ.AI works for your industry?
          </p>
          <m.a
            href="#contact"
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7B6FD4] to-[#A89FE0] px-8 py-4 rounded-xl font-semibold text-white shadow-[0_0_20px_rgba(123,111,212,0.5)] hover:shadow-[0_0_30px_rgba(123,111,212,0.7)] hover:scale-105 transition-all duration-300"
          >
            <span>Schedule a Demo</span>
            <Zap size={20} />
          </m.a>
        </m.div>
      </div>
    </section>
  );
};

export default UseCases;
