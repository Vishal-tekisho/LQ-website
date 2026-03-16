import { m, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Send, AlertCircle, User, Mail, Building2, MessageSquare, ArrowRight, Clock, Zap } from 'lucide-react';
import { useState, FormEvent, useRef, useEffect, useId } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type FormState = 'idle' | 'sending' | 'success' | 'error';

/* ─── Floating Label Field ──────────────────────────────────────────────── */
interface FloatingFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  icon: React.ReactNode;
  delay?: number;
  children: (
    baseClass: string,
    isFocused: boolean,
    setFocused: (v: boolean) => void,
  ) => React.ReactNode;
  value: string;
  disabled?: boolean;
}

function FloatingField({
  id,
  label,
  required,
  error,
  icon,
  delay = 0,
  children,
  value,
  disabled,
}: FloatingFieldProps) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0;

  const borderColor = error
    ? 'border-red-400'
    : focused
    ? 'border-[#7B6FD4] shadow-[0_2px_0_0_#7B6FD4]'
    : 'border-white/20';

  const baseClass = cn(
    'w-full bg-transparent pt-6 pb-2 px-0 text-white text-base focus:outline-none transition-all resize-none',
    'disabled:opacity-50',
  );

  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      className="relative"
    >
      {/* left icon */}
      <span
        className={cn(
          'absolute left-0 top-[1.6rem] transition-colors duration-200',
          focused ? 'text-[#7B6FD4]' : 'text-white/30',
          error && 'text-red-400',
          disabled && 'opacity-40',
        )}
      >
        {icon}
      </span>

      {/* floating label */}
      <label
        htmlFor={id}
        className={cn(
          'absolute left-8 transition-all duration-200 pointer-events-none select-none origin-left',
          isFloating
            ? 'top-0 scale-[0.78] text-[#A89FE0]'
            : 'top-[1.55rem] scale-100 text-white/40',
          error && isFloating && 'text-red-400',
        )}
      >
        {label}
        {required && <span className="ml-0.5 text-[#A89FE0]">*</span>}
      </label>

      {/* input wrapper */}
      <div className={cn('border-b pl-8 transition-all duration-200', borderColor)}>
        {children(baseClass, focused, setFocused)}
      </div>

      {/* error */}
      <AnimatePresence>
        {error && (
          <m.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
          >
            <AlertCircle size={12} />
            {error}
          </m.p>
        )}
      </AnimatePresence>
    </m.div>
  );
}

/* ─── Signal Path (left panel) ──────────────────────────────────────────── */
const NODES = [
  { label: 'Your Message', x: 60, y: 40 },
  { label: 'AI Routing', x: 200, y: 110 },
  { label: 'LeadQ Team', x: 200, y: 195 },
  { label: 'Response', x: 60, y: 265 },
];

const EDGES = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
];

function SignalPath() {
  return (
    <div className="relative select-none" aria-hidden>
      <svg viewBox="0 0 260 310" className="w-full max-w-[220px] mx-auto">
        {/* connecting lines */}
        {EDGES.map((edge, i) => {
          const s = NODES[edge.from];
          const e = NODES[edge.to];
          const id = `path-${i}`;
          return (
            <g key={i}>
              <path
                id={id}
                d={`M ${s.x} ${s.y} C ${s.x + 80} ${s.y} ${e.x + 80} ${e.y} ${e.x} ${e.y}`}
                stroke="url(#lineGrad)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="4 4"
                opacity={0.35}
              />
              {/* traveling signal dot */}
              <m.circle
                r={4}
                fill="#A89FE0"
                filter="url(#glow)"
                initial={{ offsetDistance: '0%', opacity: 0 }}
                animate={{ offsetDistance: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.2,
                  delay: i * 0.9 + 0.5,
                  repeat: Infinity,
                  repeatDelay: 1.4,
                  ease: 'easeInOut',
                }}
                style={{ offsetPath: `path('M ${s.x} ${s.y} C ${s.x + 80} ${s.y} ${e.x + 80} ${e.y} ${e.x} ${e.y}')` } as React.CSSProperties}
              />
            </g>
          );
        })}

        {/* nodes */}
        {NODES.map((node, i) => (
          <g key={i}>
            {/* outer pulse ring */}
            <m.circle
              cx={node.x}
              cy={node.y}
              r={18}
              fill="none"
              stroke="#7B6FD4"
              strokeWidth="1"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
            {/* node circle */}
            <m.circle
              cx={node.x}
              cy={node.y}
              r={10}
              fill="url(#nodeGrad)"
              stroke="#7B6FD4"
              strokeWidth="1.5"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.15, type: 'spring', stiffness: 200 }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
            {/* label */}
            <m.text
              x={node.x + 18}
              y={node.y + 4.5}
              fill="#C4C0E8"
              fontSize="11"
              fontFamily="DM Sans, sans-serif"
              initial={{ opacity: 0, x: node.x + 10 }}
              whileInView={{ opacity: 1, x: node.x + 18 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.15 }}
            >
              {node.label}
            </m.text>
          </g>
        ))}

        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B4FBE" />
            <stop offset="100%" stopColor="#A89FE0" />
          </linearGradient>
          <radialGradient id="nodeGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#A89FE0" />
            <stop offset="100%" stopColor="#5B4FBE" />
          </radialGradient>
          <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

/* ─── Checkmark SVG ─────────────────────────────────────────────────────── */
function AnimatedCheck() {
  return (
    <m.svg
      viewBox="0 0 52 52"
      className="w-20 h-20 mx-auto mb-6"
      initial="hidden"
      animate="visible"
    >
      <m.circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke="#7B6FD4"
        strokeWidth="2"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
        }}
      />
      <m.path
        d="M14 27 l8 8 l16 -16"
        fill="none"
        stroke="#A89FE0"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0 },
          visible: { pathLength: 1, transition: { duration: 0.4, delay: 0.55, ease: 'easeOut' } },
        }}
      />
    </m.svg>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────── */
export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const uid = useId();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormState('sending');
    try {
      const response = await fetch('https://formsubmit.co/ajax/contact@tekisho.ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          _subject: `New Contact Form Submission from ${formData.name}`,
          _template: 'table',
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', company: '', message: '' });
        setErrors({});
      } else {
        console.error('Form submission error:', result);
        setFormState('error');
        setErrors({ submit: 'Something went wrong. Please try again later.' });
      }
    } catch (error) {
      console.error('Form submission network error:', error);
      setFormState('error');
      setErrors({ submit: 'Failed to send message. Please check your connection.' });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const isSending = formState === 'sending';

  return (
    <section
      id="contact"
      className="relative z-10 min-h-[100svh] flex flex-col justify-center py-16 lg:py-24 px-4 overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 60%, rgba(91,79,190,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Dot-grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, #A89FE0 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-5xl mx-auto w-full">
        {/* ── Section heading ── */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4">
            Get in{' '}
            <span className="relative inline-block">
              <span className="text-[#A89FE0]">Touch</span>
              {/* underline accent */}
              <m.span
                className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-[#5B4FBE] to-[#A89FE0]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                style={{ originX: 0, width: '100%' }}
              />
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-leadq-silver max-w-md mx-auto">
            Have questions? We'd love to hear from you.
          </p>
        </m.div>

        {/* ── Card ── */}
        <m.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="relative"
        >
          {/* Animated border glow */}
          <div
            aria-hidden
            className="absolute -inset-[1px] rounded-2xl pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(123,111,212,0.6) 0%, rgba(168,159,224,0.15) 40%, rgba(91,79,190,0.5) 80%, rgba(168,159,224,0.15) 100%)',
              borderRadius: 'inherit',
              zIndex: -1,
              filter: 'blur(0.5px)',
            }}
          />

          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[rgba(8,8,42,0.72)] backdrop-blur-2xl flex flex-col lg:flex-row">

            {/* ────── LEFT PANEL ────── */}
            <div className="hidden lg:flex flex-col justify-between w-[42%] min-h-full p-10 border-r border-white/[0.06] relative overflow-hidden">
              {/* subtle inner radial */}
              <div
                aria-hidden
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(91,79,190,0.14) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10">
                <m.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-white leading-snug mb-2"
                >
                  Let's build something
                  <br />
                  <span className="text-[#A89FE0]">extraordinary</span>
                </m.p>
                <m.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-sm text-leadq-steel leading-relaxed"
                >
                  Drop us a message and our AI routes it to the right team instantly.
                </m.p>
              </div>

              {/* Signal network */}
              <m.div
                className="relative z-10 my-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
              >
                <SignalPath />
              </m.div>

              {/* Stats */}
              <div className="relative z-10 grid grid-cols-2 gap-3">
                {[
                  { icon: <Clock size={14} />, stat: '24h', label: 'Response time' },
                  { icon: <Zap size={14} />, stat: '99%', label: 'Satisfaction' },
                ].map((item, i) => (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="flex flex-col items-center gap-1 rounded-xl border border-white/[0.07] bg-white/[0.04] py-3 px-2 text-center"
                  >
                    <span className="text-[#7B6FD4]">{item.icon}</span>
                    <span className="text-white font-bold text-sm leading-none">{item.stat}</span>
                    <span className="text-leadq-steel text-[10px] leading-tight">{item.label}</span>
                  </m.div>
                ))}
              </div>
            </div>

            {/* ────── RIGHT PANEL (form) ────── */}
            <div className="flex-1 p-8 sm:p-10 lg:p-12">
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  /* ── Success state ── */
                  <m.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center min-h-[420px] text-center gap-3"
                  >
                    <AnimatedCheck />
                    <m.h3
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.4 }}
                      className="text-2xl sm:text-3xl font-bold text-white"
                    >
                      Message Sent!
                    </m.h3>
                    <m.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1, duration: 0.4 }}
                      className="text-leadq-silver max-w-xs"
                      role="status"
                      aria-live="polite"
                    >
                      Thank you for reaching out. We'll get back to you within&nbsp;24&nbsp;hours.
                    </m.p>
                    <m.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3, duration: 0.4 }}
                      onClick={() => setFormState('idle')}
                      className="mt-4 text-sm text-[#A89FE0] hover:text-white underline underline-offset-4 transition-colors"
                    >
                      Send another message
                    </m.button>
                  </m.div>
                ) : (
                  /* ── Form ── */
                  <m.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-8"
                    noValidate
                  >
                    {/* Mobile-only heading */}
                    <div className="lg:hidden">
                      <p className="text-xl font-bold text-white">
                        Let's build something <span className="text-[#A89FE0]">extraordinary</span>
                      </p>
                    </div>

                    {/* Submit-level error */}
                    <AnimatePresence>
                      {errors.submit && (
                        <m.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-3 rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-400"
                        >
                          <AlertCircle size={16} className="shrink-0" />
                          {errors.submit}
                        </m.div>
                      )}
                    </AnimatePresence>

                    {/* Two-column row: Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <FloatingField
                        id={`${uid}-name`}
                        label="Your name"
                        required
                        error={errors.name}
                        icon={<User size={16} />}
                        delay={0.05}
                        value={formData.name}
                        disabled={isSending}
                      >
                        {(cls, _focused, setFocused) => (
                          <input
                            type="text"
                            id={`${uid}-name`}
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            className={cls}
                            disabled={isSending}
                            autoComplete="name"
                            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                          />
                        )}
                      </FloatingField>

                      <FloatingField
                        id={`${uid}-email`}
                        label="Work email"
                        required
                        error={errors.email}
                        icon={<Mail size={16} />}
                        delay={0.1}
                        value={formData.email}
                        disabled={isSending}
                      >
                        {(cls, _focused, setFocused) => (
                          <input
                            type="email"
                            id={`${uid}-email`}
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            className={cls}
                            disabled={isSending}
                            autoComplete="email"
                            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                          />
                        )}
                      </FloatingField>
                    </div>

                    {/* Company */}
                    <FloatingField
                      id={`${uid}-company`}
                      label="Company (optional)"
                      icon={<Building2 size={16} />}
                      delay={0.15}
                      value={formData.company}
                      disabled={isSending}
                    >
                      {(cls, _focused, setFocused) => (
                        <input
                          type="text"
                          id={`${uid}-company`}
                          value={formData.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          onFocus={() => setFocused(true)}
                          onBlur={() => setFocused(false)}
                          className={cls}
                          disabled={isSending}
                          autoComplete="organization"
                        />
                      )}
                    </FloatingField>

                    {/* Message */}
                    <FloatingField
                      id={`${uid}-message`}
                      label="Your message"
                      required
                      error={errors.message}
                      icon={<MessageSquare size={16} />}
                      delay={0.2}
                      value={formData.message}
                      disabled={isSending}
                    >
                      {(cls, _focused, setFocused) => (
                        <div className="relative">
                          <textarea
                            id={`${uid}-message`}
                            value={formData.message}
                            onChange={(e) => handleChange('message', e.target.value)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            rows={4}
                            className={cn(cls, 'pr-12')}
                            disabled={isSending}
                            maxLength={500}
                            aria-describedby={errors.message ? `${uid}-message-error` : undefined}
                          />
                          <span className="absolute right-0 bottom-2 text-[10px] text-white/25 tabular-nums">
                            {formData.message.length}/500
                          </span>
                        </div>
                      )}
                    </FloatingField>

                    {/* Submit */}
                    <m.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.25 }}
                    >
                      <m.button
                        type="submit"
                        disabled={isSending}
                        whileHover={!isSending ? { scale: 1.015 } : {}}
                        whileTap={!isSending ? { scale: 0.985 } : {}}
                        className={cn(
                          'relative w-full overflow-hidden rounded-xl py-4 text-base font-semibold text-white transition-all duration-300',
                          'bg-gradient-to-r from-[#5B4FBE] via-[#7B6FD4] to-[#A89FE0]',
                          'shadow-lg shadow-[#5B4FBE]/30 hover:shadow-xl hover:shadow-[#7B6FD4]/40',
                          'disabled:opacity-60 disabled:cursor-not-allowed',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B6FD4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08082A]',
                          // shimmer pseudo-element via group
                          'group',
                        )}
                      >
                        {/* shimmer sweep */}
                        <span
                          aria-hidden
                          className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-20deg]"
                        />

                        {isSending ? (
                          <span className="flex items-center justify-center gap-2">
                            <m.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                              className="block w-5 h-5 rounded-full border-2 border-white/40 border-t-white"
                            />
                            Sending…
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Send Message
                            <m.span
                              className="inline-flex"
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                            >
                              <ArrowRight size={18} />
                            </m.span>
                          </span>
                        )}
                      </m.button>

                      <p className="mt-3 text-center text-xs text-white/25">
                        We'll never share your data. Read our{' '}
                        <Link to="/legal/privacy" className="underline underline-offset-2 hover:text-white/50 transition-colors">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </m.div>
                  </m.form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </m.div>
      </div>
    </section>
  );
}

