import { m } from 'framer-motion';
import {
  Search,
  Calendar,
  Users,
  Mail,
  Mic,
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { Link } from 'react-router-dom';

interface Agent {
  id: number;
  title: string;
  description: string;
  icon: any;
  color?: string;
  highlight?: boolean;
  badge?: string;
  className?: string;
  link: string;
}

const agents: Agent[] = [
  {
    id: 1,
    title: 'Lead Capture Agent',
    description:
      'Turn every scan into revenue by instantly validating and qualifying leads.',
    icon: Search,
    color: '#A89FE0',
    link: '/agents/contact-capture',
  },
  {
    id: 2,
    title: 'Research Agent',
    description:
      'Enriches contacts from web signals and builds rich profiles continuously.',
    icon: Users,
    color: '#A89FE0',
    link: '/agents/research',
  },
  {
    id: 3,
    title: 'Meetings Agent',
    description:
      'Turn website visitors into booked meetings instantly with AI-driven booking.',
    icon: Calendar,
    color: '#A89FE0',
    link: '/agents/meetings',
  },
  {
    id: 4,
    title: 'Email Agent',
    description:
      'Understands context and drafts intelligent, personalized emails perfectly.',
    icon: Mail,
    color: '#A89FE0',
    link: '/agents/email',
  },
  {
    id: 5,
    title: 'Voice Agent',
    description:
      'Replaces robocalls with intelligent, conversational AI for calls and support.',
    icon: Mic,
    color: '#A89FE0',
    link: '/agents/voice',
  },
];

export default function Agents() {
  return (
    <section id="agents" className="relative z-10 min-h-[100svh] flex flex-col justify-center py-8 lg:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6"
          >
            Meet Your{' '}
            <span className="text-[#A89FE0]">
              New Workforce
            </span>
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl md:text-2xl text-leadq-silver max-w-3xl mx-auto"
          >
            Deploy specialized AI agents for every stage of your sales cycle.
          </m.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            const colorClass = 'leadq-silver';

            return (
              <m.div
                key={agent.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative flex ${agent.className || ''}`}
              >
                <SpotlightCard className={`p-6 rounded-2xl flex-1 flex flex-col ${agent.highlight
                  ? 'bg-gradient-to-br from-[#7B6FD4]/10 to-[#A89FE0]/5 border-white/20'
                  : 'border-white/10'
                  }`}>
                  <div className="relative">
                    <Link to={agent.link} className="absolute inset-0 z-10" />
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-[#7B6FD4]/10 flex items-center justify-center`}
                      >
                        <Icon
                          className={`text-${colorClass}`}
                          size={24}
                          strokeWidth={2}
                        />
                      </div>
                      {agent.badge && (
                        <span className="glass-strong px-3 py-1 rounded-full text-xs font-medium text-leadq-silver border border-leadq-silver/30">
                          {agent.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-semibold mb-3">
                      {agent.title}
                    </h3>
                    <p className="text-leadq-silver text-base sm:text-lg leading-relaxed">
                      {agent.description}
                    </p>
                  </div>
                </SpotlightCard>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

