import { m } from 'framer-motion';
import { User, LogIn, Search, Calendar, Mail, PhoneCall, RefreshCw } from 'lucide-react';
import { useInViewPause } from '@/lib/useInViewPause';

export default function Workflow() {
  const { ref } = useInViewPause();
  return (
    <section ref={ref} id="workflow" className="relative z-10 min-h-[100svh] flex flex-col justify-center py-8 lg:py-12 px-4 bg-white/[0.05]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-20">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6"
          >
            How It Works
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl md:text-2xl text-leadq-silver font-medium"
          >
            From Lead to Closed Deal – Zero Clicks.
          </m.p>
        </div>

        {/* ── Flowchart ── */}
        <div className="flex flex-col items-center max-w-2xl mx-auto">

          {/* User Arrives */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <User size={28} className="text-leadq-silver" strokeWidth={1.5} />
            </div>
            <p className="text-sm text-leadq-silver mt-2 font-medium">User Arrives</p>
          </m.div>

          {/* Connector: vline + blue dot */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-col items-center"
          >
            <div className="h-10 w-0 border-l-2 border-dashed border-white/30" />
            <div className="w-3 h-3 rounded-full bg-leadq-purple shadow-[0_0_8px_rgba(123,111,212,0.8)]" />
          </m.div>

          {/* Login & Authentication */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
          >
            <div className="glass-strong rounded-2xl px-6 py-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-leadq-purple/20 border border-leadq-purple/30 flex items-center justify-center flex-shrink-0">
                <LogIn size={20} className="text-leadq-purple" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-display font-bold">Login &amp; Authentication</h3>
            </div>
          </m.div>

          {/* Connector: vline (no dot) */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="h-8 w-0 border-l-2 border-dashed border-white/30" />
          </m.div>

          {/* Dashed-border container: 4 action cards */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="w-full border border-dashed border-white/25 rounded-2xl p-4"
          >
            {/* Row 1: Contact capture & Research | Meetings */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-xl px-4 py-3 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-leadq-purple/20 border border-leadq-purple/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Search size={17} className="text-leadq-purple" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-leadq-silver leading-snug">Contact capture &amp; Research</span>
              </div>
              <div className="glass rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-leadq-purple/20 border border-leadq-purple/30 flex items-center justify-center flex-shrink-0">
                  <Calendar size={17} className="text-leadq-purple" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-leadq-silver">Meetings</span>
              </div>
            </div>

            {/* Inner connector: dashed horizontal bar + center vertical drop */}
            <div className="relative my-3">
              <div
                className="w-full h-px"
                style={{ background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.25) 0, rgba(255,255,255,0.25) 6px, transparent 6px, transparent 12px)' }}
              />
              <div className="absolute top-0 left-1/2 -translate-x-px">
                <div className="h-3 w-0 border-l-2 border-dashed border-white/30" />
              </div>
            </div>

            {/* Row 2: Emails | Voice Calls */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-leadq-purple/20 border border-leadq-purple/30 flex items-center justify-center flex-shrink-0">
                  <Mail size={17} className="text-leadq-purple" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-leadq-silver">Emails</span>
              </div>
              <div className="glass rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-leadq-purple/20 border border-leadq-purple/30 flex items-center justify-center flex-shrink-0">
                  <PhoneCall size={17} className="text-leadq-purple" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-leadq-silver">Voice Calls</span>
              </div>
            </div>
          </m.div>

          {/* Connector: vline + blue dot */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="flex flex-col items-center"
          >
            <div className="h-8 w-0 border-l-2 border-dashed border-white/30" />
            <div className="w-3 h-3 rounded-full bg-leadq-purple shadow-[0_0_8px_rgba(123,111,212,0.8)]" />
          </m.div>

          {/* Continuous Engagement Cycle */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="w-full"
          >
            <div className="glass-strong rounded-2xl px-6 py-5">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-lg bg-leadq-purple/20 border border-leadq-purple/30 flex items-center justify-center flex-shrink-0">
                  <RefreshCw size={20} className="text-leadq-purple" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-display font-bold">Continuous Engagement Cycle</h3>
              </div>
              <p className="text-sm text-leadq-silver leading-relaxed">
                Keep leads engaged through automated, recurring touchpoints across every channel.
              </p>
            </div>
          </m.div>

        </div>
      </div>
    </section>
  );
}
