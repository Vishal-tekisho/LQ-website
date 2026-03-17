import { useParams, Navigate, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import { LegalDocument, legalContent } from '../data/legal-content';

const VALID_DOCS: LegalDocument[] = ['privacy', 'terms', 'cookie', 'compliance', 'documentation'];

const LegalPage = () => {
    const { doc } = useParams<{ doc: string }>();
    const navigate = useNavigate();

    if (!doc || !VALID_DOCS.includes(doc as LegalDocument)) {
        return <Navigate to="/" replace />;
    }

    const { title, content } = legalContent[doc as LegalDocument];

    return (
        <div className="min-h-screen bg-leadq-bg text-leadq-steel font-sans relative">
            {/* Noise overlay */}
            <div className="fixed inset-0 noise pointer-events-none z-0" />

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

            <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

                <h1 className="text-3xl sm:text-4xl font-bold text-leadq-platinum mb-10 font-display">
                    {title}
                </h1>

                <div className="prose prose-invert max-w-none
                    prose-headings:text-leadq-platinum prose-headings:font-semibold prose-headings:font-display
                    prose-p:text-leadq-steel prose-p:leading-relaxed prose-p:font-sans
                    prose-li:text-leadq-steel prose-li:font-sans
                    prose-strong:text-leadq-platinum
                    prose-a:text-leadq-cyan prose-a:no-underline hover:prose-a:underline
                    prose-hr:border-white/10
                ">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
