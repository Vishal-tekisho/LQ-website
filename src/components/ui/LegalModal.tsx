import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useEffect, useRef } from 'react';
import { LegalDocument, legalContent } from '../../data/legal-content';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    document: LegalDocument | null;
}

const LegalModal = ({ isOpen, onClose, document }: LegalModalProps) => {
    const previousOverflow = useRef<string | null>(null);

    useEffect(() => {
        if (!isOpen) return undefined;

        previousOverflow.current = window.document.body.style.overflow;
        window.document.body.style.overflow = 'hidden';

        return () => {
            window.document.body.style.overflow = previousOverflow.current ?? '';
        };
    }, [isOpen]);

    if (!document) return null;

    const content = legalContent[document];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
                        style={{ zIndex: 100 }}
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ zIndex: 101, pointerEvents: 'none' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[85vh] shadow-2xl flex flex-col pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
                                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                                    {content.title}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content - Scrollable */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                                <div className="prose prose-invert prose-slate max-w-none">
                                    <ReactMarkdown>{content.content}</ReactMarkdown>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t border-white/10 p-6 shrink-0 bg-black/20 flex justify-end rounded-b-2xl">
                                <button
                                    onClick={onClose}
                                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default LegalModal;
