import { useState } from 'react';
import { Linkedin as LinkedIn } from 'lucide-react';
import LegalModal from './ui/LegalModal';
import { LegalDocument } from '../data/legal-content';

const Footer = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentDoc, setCurrentDoc] = useState<LegalDocument | null>(null);

    const openModal = (doc: LegalDocument) => {
        setCurrentDoc(doc);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentDoc(null);
    };

    return (
        <footer className="text-leadq-steel py-10 sm:py-12 md:py-16 px-4 sm:px-6 relative z-10 border-t border-white/5">
            <LegalModal isOpen={modalOpen} onClose={closeModal} document={currentDoc} />
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
                    {/* Logo and Description Section */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <img
                                src="/leadq-logo-v2.jpg"
                                alt="LeadQ.AI Logo"
                                className="h-10 w-auto rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            />
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-leadq-platinum to-leadq-steel">
                                LeadQ<span className="text-leadq-cyan">.AI</span>
                            </span>
                        </div>

                        <p className="text-sm leading-relaxed max-w-xs">
                            Unifying leads, conversations, and workflows in one intelligent platform, LeadQ automates everything from first touch to closed deal so your team can focus on relationships, not busywork. It’s technology designed to scale revenue without ever sacrificing the human touch.
                        </p>

                        <div className="flex gap-4">

                            <a href="https://www.linkedin.com/company/tekisho/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                                <LinkedIn className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
                            </a>

                        </div>


                    </div>


                    {/* Resources Section */}
                    <div className="md:col-span-1">
                        <h4 className="text-[#E5E7EB] font-semibold mb-8">Resources</h4>
                        <ul className="space-y-4 text-sm">
                            <li><button onClick={() => openModal('documentation')} className="hover:text-white transition-colors text-left">Documentation</button></li>
                        </ul>
                    </div>

                    {/* Legal Section */}
                    <div className="md:col-span-1">
                        <h4 className="text-[#E5E7EB] font-semibold mb-8">Legal</h4>
                        <ul className="space-y-4 text-sm">
                            <li><button onClick={() => openModal('privacy')} className="hover:text-white transition-colors text-left">Privacy Policy</button></li>
                            <li><button onClick={() => openModal('terms')} className="hover:text-white transition-colors text-left">Terms of Service</button></li>
                            <li><button onClick={() => openModal('cookie')} className="hover:text-white transition-colors text-left">Cookie Policy</button></li>
                            <li><button onClick={() => openModal('compliance')} className="hover:text-white transition-colors text-left">Compliance</button></li>
                        </ul>
                    </div>
                    {/* Contact Section */}
                    <div className="md:col-span-1">
                        <h4 className="text-[#E5E7EB] font-semibold mb-8">Get In Touch</h4>
                        <div className="space-y-6 text-sm">
                            <div className="space-y-2">
                                <p className="font-semibold text-white">USA Office</p>
                                <div className="space-y-1">
                                    <p>Tekisho Infotech Inc.</p>
                                    <p>5005 W Royal Ln, Suite 288,</p>
                                    <p>Irving, TX. 75063</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="font-semibold text-white">India Office</p>
                                <div className="space-y-1">
                                    <p>Tekisho Infotech Pvt. Ltd.</p>
                                    <p>505 A, 5th Floor, Techno 1,</p>
                                    <p>Gachibowli Road, Raidurg,</p>
                                    <p>Hyderabad, Telangana - 500032</p>
                                    <p>+91 7331104192</p>
                                </div>
                            </div>

                            <div>
                                <a href="mailto:contact@tekisho.ai" className="hover:text-white transition-colors">contact@tekisho.ai</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 sm:mt-16 md:mt-20 pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium tracking-wider">
                    <p>&copy; 2026 LeadQ.AI. All rights reserved.</p>
                    <div className="flex gap-8">
                        <span className="opacity-40">System Status: Operational</span>
                        <span className="opacity-40">v1.2.4</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
