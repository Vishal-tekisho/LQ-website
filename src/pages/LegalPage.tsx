import { useParams, Navigate, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
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
        <div className="min-h-screen bg-[#0a0a0f] text-slate-200 px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/', { state: { scrollTo: 'footer' } })}
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-10"
                >
                    ← Back to LeadQ.AI
                </button>

                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-10 font-display">
                    {title}
                </h1>

                <div className="prose prose-invert prose-slate max-w-none
                    prose-headings:text-white prose-headings:font-semibold
                    prose-p:text-slate-300 prose-p:leading-relaxed
                    prose-li:text-slate-300
                    prose-strong:text-white
                    prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                    prose-hr:border-white/10
                ">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
