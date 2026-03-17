import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import {
  Mail,
  Clock,
  Search,
  BookOpen,
  ChevronDown,
  Copy,
  Check,
  ArrowLeft,
  Headphones,
  Globe,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import Footer from '../components/Footer';
import {
  supportArticles,
  supportCategories,
  type SupportCategory,
} from '../data/support-content';

export default function SupportPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SupportCategory | 'All'>(
    'All',
  );
  const [openArticleId, setOpenArticleId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // ── Reset expanded article when filters change ────────────────
  useEffect(() => {
    setOpenArticleId(null);
  }, [activeCategory, searchQuery]);

  // ── Filter articles ────────────────────────────────────────────
  const filteredArticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return supportArticles.filter((a) => {
      const matchesCategory =
        activeCategory === 'All' || a.category === activeCategory;
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  // ── Copy email helper ──────────────────────────────────────────
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('contact@tekisho.ai');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-leadq-bg text-leadq-steel relative">
        {/* Noise overlay */}
        <div className="fixed inset-0 noise pointer-events-none z-0" />

        {/* ── Main content ─────────────────────────────────────── */}
        <div className="relative z-10">
          {/* ── Top bar ──────────────────────────────────────── */}
          <nav className="sticky top-0 z-50 backdrop-blur-xl bg-leadq-bg/70 border-b border-white/5">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
              <button
                onClick={() => navigate('/', { state: { scrollTo: 'footer' } })}
                className="flex items-center gap-2 text-leadq-silver hover:text-white transition-colors text-sm"
              >
                <ArrowLeft size={16} />
                Back to LeadQ.AI
              </button>
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="/leadq-logo-main.png"
                  alt="LeadQ.AI Logo"
                  className="h-8 md:h-10 w-auto"
                />
              </Link>
            </div>
          </nav>

          {/* ── Hero ─────────────────────────────────────────── */}
          <header className="pt-16 sm:pt-24 pb-12 px-4 text-center">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[#A89FE0]/20 bg-[#A89FE0]/5 text-[#A89FE0] text-sm font-medium">
                <Headphones size={16} />
                Support Center
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-leadq-platinum mb-4">
                How can we{' '}
                <span className="text-[#A89FE0]">
                  help you?
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-base sm:text-lg text-leadq-steel leading-relaxed">
                Reach out to our team, check support hours, or browse the
                knowledge base to find answers fast.
              </p>
            </m.div>
          </header>

          {/* ── Contact cards ────────────────────────────────── */}
          <section className="max-w-5xl mx-auto px-4 pb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Email card */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="glass rounded-2xl p-6 sm:p-8 flex flex-col items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-[#A89FE0]/10">
                  <Mail className="w-6 h-6 text-[#A89FE0]" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-white mb-1">
                    Support Email
                  </h3>
                  <a
                    href="mailto:contact@tekisho.ai"
                    className="text-[#A89FE0] hover:text-[#A89FE0]/80 transition-colors break-all"
                  >
                    contact@tekisho.ai
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="mt-auto inline-flex items-center gap-1.5 text-xs text-leadq-silver hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-green-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy email
                    </>
                  )}
                </button>
              </m.div>

              {/* Hours card */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="glass rounded-2xl p-6 sm:p-8 flex flex-col items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-[#A89FE0]/10">
                  <Clock className="w-6 h-6 text-[#A89FE0]" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-white mb-1">
                    Support Hours
                  </h3>
                  <p className="text-sm leading-relaxed">
                    Monday – Friday
                    <br />
                    <span className="text-white font-medium">
                      11:00 AM – 7:00 PM IST
                    </span>
                  </p>
                  <p className="text-xs text-leadq-steel/70 mt-2">
                    Typically respond within 24 hours
                  </p>
                </div>
              </m.div>

              {/* Help guide card */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="glass rounded-2xl p-6 sm:p-8 flex flex-col items-start gap-4 sm:col-span-2 lg:col-span-1"
              >
                <div className="p-3 rounded-xl bg-[#A89FE0]/10">
                  <Globe className="w-6 h-6 text-[#A89FE0]" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-white mb-1">
                    Documentation
                  </h3>
                  <p className="text-sm leading-relaxed">
                    Full product docs, API reference, and integration guides.
                  </p>
                </div>
                <a
                  href="/legal/documentation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 text-sm text-[#A89FE0] hover:text-[#A89FE0]/80 transition-colors"
                >
                  <BookOpen size={14} /> View documentation
                </a>
              </m.div>
            </div>
          </section>

          {/* ── Knowledge Base ────────────────────────────────── */}
          <section className="max-w-5xl mx-auto px-4 pb-24">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-leadq-platinum mb-8 text-center">
                Knowledge{' '}
                <span className="text-[#A89FE0]">
                  Base
                </span>
              </h2>

              {/* Search bar */}
              <div className="relative max-w-2xl mx-auto mb-8">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-leadq-steel pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.trim()) {
                      setActiveCategory('All');
                    }
                  }}
                  placeholder="Search articles by keyword, topic, or tag…"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-leadq-steel/60 focus:outline-none focus:ring-2 focus:ring-[#A89FE0]/40 focus:border-[#A89FE0]/40 transition-all text-sm"
                />
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                {['All', ...supportCategories].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat as SupportCategory | 'All');
                      setOpenArticleId(null);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeCategory === cat
                      ? 'bg-[#A89FE0]/15 border-[#A89FE0]/40 text-[#A89FE0]'
                      : 'bg-white/5 border-white/10 text-leadq-silver hover:bg-white/10 hover:border-white/20'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Article accordion */}
              <div className="space-y-3">
                <AnimatePresence initial={false}>
                  {filteredArticles.length === 0 ? (
                    <m.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-16"
                    >
                      <Search
                        size={40}
                        className="mx-auto mb-4 text-leadq-steel/40"
                      />
                      <p className="text-lg text-leadq-steel">
                        No articles match your search.
                      </p>
                      <p className="text-sm text-leadq-steel/60 mt-1">
                        Try different keywords or clear the filters.
                      </p>
                    </m.div>
                  ) : (
                    filteredArticles.map((article) => (
                      <m.div
                        layout
                        key={article.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="glass rounded-xl overflow-hidden"
                      >
                        <Button
                          onClick={() =>
                            setOpenArticleId(
                              openArticleId === article.id
                                ? null
                                : article.id,
                            )
                          }
                          variant="ghost"
                          className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-start justify-between gap-4 focus:ring-2 focus:ring-[#7B6FD4] focus:ring-inset rounded-xl whitespace-normal h-auto"
                          aria-expanded={openArticleId === article.id}
                          aria-controls={`kb-${article.id}`}
                        >
                          <div className="min-w-0">
                            <span className="block font-medium text-white text-base sm:text-lg leading-snug">
                              {article.title}
                            </span>
                            <span className="block text-xs text-[#A89FE0]/70 mt-1 font-medium">
                              {article.category}
                            </span>
                          </div>
                          <m.div
                            animate={{
                              rotate:
                                openArticleId === article.id ? 180 : 0,
                            }}
                            transition={{
                              duration: 0.3,
                              ease: 'easeInOut',
                            }}
                            className="flex-shrink-0 mt-1"
                          >
                            <ChevronDown
                              size={22}
                              className="text-[#A89FE0]"
                            />
                          </m.div>
                        </Button>

                        <AnimatePresence initial={false}>
                          {openArticleId === article.id && (
                            <m.div
                              id={`kb-${article.id}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{
                                height: 'auto',
                                opacity: 1,
                                transition: {
                                  height: {
                                    duration: 0.3,
                                    ease: 'easeOut',
                                  },
                                  opacity: {
                                    duration: 0.2,
                                    delay: 0.1,
                                  },
                                },
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                                transition: {
                                  height: {
                                    duration: 0.3,
                                    ease: 'easeIn',
                                  },
                                  opacity: { duration: 0.2 },
                                },
                              }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 sm:px-6 pb-5 pt-0">
                                <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
                                  {article.content}
                                </p>
                              </div>
                            </m.div>
                          )}
                        </AnimatePresence>
                      </m.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </m.div>
          </section>

          {/* ── Footer ───────────────────────────────────────── */}
          <Footer />
        </div>
      </div>
    </LazyMotion>
  );
}
