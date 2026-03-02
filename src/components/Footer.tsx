import { Linkedin as LinkedIn, Instagram, Twitter } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
    return (
        <footer className="bg-leadq-bg text-leadq-steel py-10 sm:py-12 md:py-16 px-4 sm:px-6 relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
                    {/* Logo and Description Section */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <img
                                src="/leadq-logo-main.png"
                                alt="LeadQ.AI Logo"
                                className="h-20 w-auto"
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

                            <a href="https://www.instagram.com/contact.tekisho/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                                <Instagram className="w-5 h-5 group-hover:text-pink-500 transition-colors" />
                            </a>

                            <a href="https://x.com/tekisho_ai" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                                <Twitter className="w-5 h-5 group-hover:text-sky-400 transition-colors" />
                            </a>

                        </div>


                    </div>


                    {/* Resources Section */}
                    <div className="md:col-span-1">
                        <h4 className="text-[#E5E7EB] text-xl sm:text-2xl font-semibold mb-8">Resources</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Button asChild variant="footer-link" size="footer-link"><a href="/legal/documentation" target="_blank" rel="noopener noreferrer">Documentation</a></Button></li>
                        </ul>
                    </div>

                    {/* Legal Section */}
                    <div className="md:col-span-1">
                        <h4 className="text-[#E5E7EB] text-xl sm:text-2xl font-semibold mb-8">Legal</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Button asChild variant="footer-link" size="footer-link"><a href="/legal/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></Button></li>
                            <li><Button asChild variant="footer-link" size="footer-link"><a href="/legal/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a></Button></li>
                            <li><Button asChild variant="footer-link" size="footer-link"><a href="/legal/cookie" target="_blank" rel="noopener noreferrer">Cookie Policy</a></Button></li>
                            <li><Button asChild variant="footer-link" size="footer-link"><a href="/legal/compliance" target="_blank" rel="noopener noreferrer">Compliance</a></Button></li>
                        </ul>
                    </div>
                    {/* Contact Section */}
                    <div className="md:col-span-1">
                        <h4 className="text-[#E5E7EB] text-xl sm:text-2xl font-semibold mb-8">Get In Touch</h4>
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
                    <span className="opacity-70 flex items-center gap-1.5">Proudly made in India <img src="https://flagcdn.com/w20/in.png" alt="Indian flag" className="w-5 h-auto inline-block" /></span>
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
