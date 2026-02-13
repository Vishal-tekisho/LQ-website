import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, FormEvent } from 'react';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormState('sending');

    try {
      const response = await fetch("https://formsubmit.co/ajax/contact@tekisho.ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          _subject: `New Contact Form Submission from ${formData.name}`,
          _template: "table"
        })
      });

      const result = await response.json();

      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', company: '', message: '' });
        setErrors({});
        // Success message stays visible until user navigates away or refreshes, 
        // to ensure they see the confirmation.
      } else {
        console.error("Form submission error:", result);
        setFormState('error');
        setErrors({ submit: "Something went wrong. Please try again later." });
      }
    } catch (error) {
      console.error("Form submission network error:", error);
      setFormState('error');
      setErrors({ submit: "Failed to send message. Please check your connection." });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <section id="contact" className="relative z-10 py-16 sm:py-20 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Get in{' '}
            <span className="bg-gradient-to-r from-leadq-cyan to-leadq-royal-blue bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-leadq-silver">
            Have questions? We'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-6 sm:p-8 md:p-10"
        >
          {formState === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <CheckCircle size={64} className="mx-auto mb-4 text-leadq-cyan" />
              <h3 className="text-2xl font-bold mb-2 text-white">Message Sent!</h3>
              <p className="text-leadq-silver" role="status" aria-live="polite">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submit && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400">
                  <AlertCircle size={20} />
                  <p>{errors.submit}</p>
                </div>
              )}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-leadq-silver mb-2">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full glass px-4 py-3 rounded-lg text-white placeholder-leadq-silver focus:outline-none focus:ring-2 transition-all ${errors.name
                    ? 'ring-2 ring-red-400'
                    : 'focus:ring-leadq-royal-blue focus:shadow-lg focus:shadow-leadq-royal-blue/20'
                    }`}
                  placeholder="John Doe"
                  disabled={formState === 'sending'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-leadq-silver mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full glass px-4 py-3 rounded-lg text-white placeholder-leadq-silver focus:outline-none focus:ring-2 transition-all ${errors.email
                    ? 'ring-2 ring-red-400'
                    : 'focus:ring-leadq-royal-blue focus:shadow-lg focus:shadow-leadq-royal-blue/20'
                    }`}
                  placeholder="john@company.com"
                  disabled={formState === 'sending'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-leadq-silver mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className="w-full glass px-4 py-3 rounded-lg text-white placeholder-leadq-silver focus:outline-none focus:ring-2 focus:ring-leadq-royal-blue focus:shadow-lg focus:shadow-leadq-royal-blue/20 transition-all"
                  placeholder="Acme Corp"
                  disabled={formState === 'sending'}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-leadq-silver mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  rows={5}
                  className={`w-full glass px-4 py-3 rounded-lg text-white placeholder-leadq-silver focus:outline-none focus:ring-2 transition-all resize-none ${errors.message
                    ? 'ring-2 ring-red-400'
                    : 'focus:ring-leadq-royal-blue focus:shadow-lg focus:shadow-leadq-royal-blue/20'
                    }`}
                  placeholder="Tell us about your needs..."
                  disabled={formState === 'sending'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={formState === 'sending'}
                whileHover={formState === 'idle' ? { scale: 1.02 } : {}}
                whileTap={formState === 'idle' ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${formState === 'sending'
                  ? 'glass cursor-not-allowed text-leadq-silver'
                  : 'bg-gradient-to-r from-leadq-deep-blue to-leadq-royal-blue text-white hover:shadow-xl hover:shadow-leadq-royal-blue/30'
                  }`}
              >
                {formState === 'sending' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-leadq-silver border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={20} />
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

