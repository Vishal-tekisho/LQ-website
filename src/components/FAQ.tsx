import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';

const faqs = [
  {
    question: "What exactly is LeadQ and who is it built for?",
    answer: "LeadQ is an AI-powered CRM and business assistant that helps you capture contacts, record & summarize meetings, and send smart follow-up emails, all in one place. It's built for sales professionals, business development reps, entrepreneurs, account managers, and consultants who want to manage leads and relationships without the manual grind.",
  },
  {
    question: "Do I need any technical knowledge or CRM experience to use LeadQ?",
    answer: "Not at all. LeadQ is designed to be intuitive from day one. You can start capturing contacts with your phone camera, record your first meeting, and send an AI-drafted follow-up email within minutes of signing up no training required.",
  },
  {
    question: "How accurate is the business card scanner?",
    answer: "The scanner uses OCR and works best with good lighting, a steady hand, and standard business card layouts. It captures both the front and back of a card. For unusual fonts or low-contrast designs, accuracy may vary but you'll always get to review and correct the extracted data before saving.",
  },
  {
    question: "Can LeadQ record and transcribe my meetings automatically?",
    answer: "Yes. For in-person meetings, LeadQ records audio live and transcribes it in real-time as the conversation happens. For virtual meetings on Zoom, or similar platforms, you can fetch the transcript from the platform and upload it to LeadQ. You can also take typed notes or dictate voice notes hands-free throughout the meeting.",
  },
  {
    question: "How does the AI-generated follow-up email work?",
    answer: "LeadQ reads your meeting context notes, transcript, and summary — and drafts a professional follow-up email with a tailored subject line and body. You choose what to include (meeting summary, action items, your profile) can regenerate any section you don't like, attach files or a meeting photo, and send when ready. You can even customize the AI's writing style using your own prompt instructions.",
  },
  {
    question: "How does LeadQ help me track where each lead stands in my pipeline?",
    answer: "Every contact can be assigned a status: HOT (very interested), WARM (interested), COLD (not yet engaged). Your dashboard shows all leads with their current status at a glance, and KPI cards track Contacts Touched, Emails Drafted, Conversion Rate, and Meetings Completed all filterable by day, week, or month.",
  },
  {
    question: "Can LeadQ help me research a contact or their company before a meeting?",
    answer: "Yes. LeadQ's Company Research feature automatically generates an AI-powered profile of your contact's background and a summary of their company including what they do, key business insights, and useful conversation starters. This loads automatically when you view a contact, so you can walk into every meeting well prepared.",
  },
  {
    question: 'What are "credits" and what do they get used for?',
    answer: "Credits are the in-app resource that powers premium features specifically voice call minutes, email campaigns, and business card scans. Your subscription plan comes with a credit allocation you can track in real-time under Settings → Billing → plans and billings → Credits Usage. You can upgrade your plan anytime.",
  },
  {
    question: "Can I export my contacts or take my data with me if I ever need to leave?",
    answer: "Absolutely you're never locked in. Individual contacts can be downloaded as VCF (vCard) files, a standard format compatible with virtually every contact manager, phone, or CRM.",
  },
  {
    question: "What happens after a meeting ends do I have to write up notes myself?",
    answer: "No. Once you stop recording, tap \"Generate Summary\" and LeadQ's AI instantly creates a structured meeting recap with key points and action items. Review it, edit if needed, save it to the contact record then jump straight into drafting your follow-up email, all without leaving the app.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenIndex(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative z-10 py-16 sm:py-20 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-leadq-cyan to-leadq-royal-blue bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass rounded-xl overflow-hidden"
            >
              <Button
                onClick={() => toggleItem(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleItem(index);
                  }
                }}
                variant="ghost"
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:ring-2 focus:ring-leadq-royal-blue focus:ring-inset rounded-xl whitespace-normal h-auto"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium text-white text-lg sm:text-xl pr-4 min-w-0">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={24} className="text-leadq-cyan" />
                </motion.div>
              </Button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: 'auto',
                      opacity: 1,
                      transition: {
                        height: { duration: 0.3, ease: 'easeOut' },
                        opacity: { duration: 0.2, delay: 0.1 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.3, ease: 'easeIn' },
                        opacity: { duration: 0.2 },
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0">
                      <p className="text-slate-100 text-base sm:text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

