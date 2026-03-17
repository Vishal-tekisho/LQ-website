import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Zap, Shield, Cpu } from 'lucide-react';

// Define the data for our scroll-telling sections
const SECTIONS = [
  {
    id: 'capture',
    title: 'Lead Capture Agent',
    description: 'Instantly capture leads from multiple sources, route them effectively, and engage them when they are warmest without missing a beat.',
    icon: <Layers className="w-6 h-6 text-purple-400" />,
    visual: 'radial-gradient(circle at center, rgba(168,85,247,0.15) 0%, transparent 70%)',
    content: 'Capture Visualization'
  },
  {
    id: 'routing',
    title: 'Routing Agent',
    description: 'Intelligently distribute incoming leads to the right team members based on territory, availability, and specific routing rules.',
    icon: <Zap className="w-6 h-6 text-blue-400" />,
    visual: 'radial-gradient(circle at center, rgba(59,130,246,0.15) 0%, transparent 70%)',
    content: 'Routing Matrix Animation'
  },
  {
    id: 'qualification',
    title: 'Qualification Agent',
    description: 'Automatically score and qualify leads using custom criteria to ensure your sales team only spends time on high-value prospects.',
    icon: <Shield className="w-6 h-6 text-green-400" />,
    visual: 'radial-gradient(circle at center, rgba(34,197,94,0.15) 0%, transparent 70%)',
    content: 'Qualification Flowchart'
  },
  {
    id: 'outreach',
    title: 'Automated Outreach',
    description: 'Send hyper-personalized follow-ups based on the user\'s interaction history, behavior, and enriched data signals.',
    icon: <Cpu className="w-6 h-6 text-pink-400" />,
    visual: 'radial-gradient(circle at center, rgba(236,72,153,0.15) 0%, transparent 70%)',
    content: 'Outreach Sequence'
  }
];

export default function ScrollTellingSection() {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <section className="relative w-full bg-[#0a0514] text-white py-24 sm:py-32 selection:bg-purple-500/30">
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0514] to-[#0a0514]"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 w-full">
        <div className="mb-16 md:mb-24 flex flex-col gap-4">
          <span className="text-purple-400 font-medium tracking-wider text-sm uppercase">Scroll to explore</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Meet the agents that scale your revenue
          </h2>
          <p className="max-w-2xl text-lg text-gray-400">
            A specialized fleet of AI workers that handles qualification, research, and follow-ups securely in the background.
          </p>
        </div>

        {/* 2-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Scrolling Text Blocks */}
          <div className="flex flex-col gap-32 pb-[30vh]">
            {SECTIONS.map((section, index) => (
              <motion.div
                key={section.id}
                // When this element enters the center of the viewport (margin offsets), trigger setActiveSection
                whileInView="visible"
                viewport={{ amount: 0.5, margin: "-40% 0px -40% 0px" }}
                onViewportEnter={() => setActiveSection(index)}
                className="min-h-[60vh] flex flex-col justify-center transition-opacity duration-500"
                style={{ opacity: activeSection === index ? 1 : 0.3 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gray-900/50 border ${activeSection === index ? 'border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'border-gray-800'} transition-all duration-500`}>
                    {section.icon}
                  </div>
                  <span className="text-xl font-medium text-gray-500 font-mono leading-none">
                    0{index + 1}
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                  {section.title}
                </h3>
                
                <p className="text-lg md:text-xl leading-relaxed text-gray-400 max-w-lg">
                  {section.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Sticky Visual Container */}
          <div className="hidden lg:block relative w-full h-full">
            {/* 
              'sticky top-24' keeps it fixed inside its parent track.
              'h-[calc(100vh-12rem)]' gives it a set height relative to screen height.
            */}
            <div className="sticky top-24 w-full h-[calc(100vh-12rem)] min-h-[500px] flex items-center justify-center rounded-[2rem] border border-gray-800/60 bg-gray-900/40 p-1 backdrop-blur-sm overflow-hidden shadow-2xl">
              
              {/* Inner container to hold changing states */}
              <div className="relative w-full h-full rounded-[1.8rem] bg-[#0d071a] overflow-hidden flex flex-col items-center justify-center p-8">
                
                {/* Dynamic Background Gradient */}
                <div 
                  className="absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none"
                  style={{ backgroundImage: SECTIONS[activeSection].visual }}
                ></div>

                {/* Subtile grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                {/* Animated content transition */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="relative z-10 w-full max-w-sm aspect-square flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl"
                  >
                    <div className="text-center font-mono text-lg font-medium tracking-widest text-white/80">
                      {SECTIONS[activeSection].content}
                    </div>
                  </motion.div>
                </AnimatePresence>
                
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
