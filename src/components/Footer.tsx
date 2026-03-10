import { Linkedin as LinkedIn, Instagram, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const XLogo = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={className}
    >
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.636 7.584H.477l8.6-9.83L0 1.153h7.594l5.243 6.932 6.064-6.932Zm-1.29 19.494h2.04L6.486 3.24H4.298l13.313 17.407Z" />
    </svg>
);

const Footer = () => {
    return (
        <footer id="footer" className="bg-leadq-bg text-leadq-steel py-10 sm:py-12 md:py-16 px-4 sm:px-6 relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
                    {/* Logo and Description Section */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <img
                                src="/leadq-logo-main.png"
                                alt="LeadQ.AI Logo"
                                className="h-16 w-auto"
                            />
                        </div>

                        <p className="text-sm leading-relaxed max-w-xs">
                            Unifying leads, conversations, and workflows in one intelligent platform, LeadQ.AI automates everything from first touch to closed deal so your team can focus on relationships, not busywork. It's technology designed to scale revenue without ever sacrificing the human touch.
                        </p>

                        <div className="flex gap-4">

                            <a href="https://www.linkedin.com/company/tekisho/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                                <LinkedIn className="w-5 h-5 group-hover:text-[#7B6FD4] transition-colors" />
                            </a>

                            <a href="https://www.instagram.com/leadq_ai/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                                <Instagram className="w-5 h-5 group-hover:text-pink-500 transition-colors" />
                            </a>

                            <a href="https://x.com/LeadQ_AI" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                                <XLogo className="w-5 h-5 group-hover:text-white transition-colors" />
                            </a>

                        </div>


                    </div>


                    {/* Resources Section */}
                    <div className="md:col-span-1">
                        <h4 className="text-[#E5E7EB] text-xl sm:text-2xl font-semibold mb-8">Resources</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Button asChild variant="footer-link" size="footer-link"><Link to="/legal/documentation">Documentation</Link></Button></li>
                            <li><Button asChild variant="footer-link" size="footer-link"><Link to="/download">Download App</Link></Button></li>
                            <li><Button asChild variant="footer-link" size="footer-link"><Link to="/support">Support</Link></Button></li>
                        </ul>
                    </div>

                    {/* Legal Section */}
                    <div className="md:col-span-1">
                        <h4 className="text-[#E5E7EB] text-xl sm:text-2xl font-semibold mb-8">Legal</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Button asChild variant="footer-link" size="footer-link"><Link to="/legal/privacy">Privacy Policy</Link></Button></li>
                            <li><Button asChild variant="footer-link" size="footer-link"><Link to="/legal/terms">Terms of Service</Link></Button></li>
                            <li><Button asChild variant="footer-link" size="footer-link"><Link to="/legal/cookie">Cookie Policy</Link></Button></li>
                            <li><Button asChild variant="footer-link" size="footer-link"><Link to="/legal/compliance">Compliance</Link></Button></li>
                        </ul>
                    </div>
                    {/* Contact Section */}
                    <div className="md:col-span-1">
                        <h4 className="text-[#E5E7EB] text-xl sm:text-2xl font-semibold mb-8">Get In Touch</h4>
                        <div className="space-y-6 text-sm">
                            <div className="space-y-2">
                                <p className="font-semibold text-white">USA Office</p>
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=5005+W+Royal+Ln+Suite+288+Irving+TX+75063"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-2 hover:text-white transition-colors"
                                >
                                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#A89FE0] group-hover:scale-110 transition-transform" />
                                    <div className="space-y-1 group-hover:underline underline-offset-2 decoration-[#A89FE0]">
                                        <p>Tekisho Infotech Inc.</p>
                                        <p>5005 W Royal Ln, Suite 288,</p>
                                        <p>Irving, TX. 75063</p>
                                    </div>
                                </a>
                            </div>

                            <div className="space-y-2">
                                <p className="font-semibold text-white">India Office</p>
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Tekisho+Infotech+505+A+5th+Floor+Techno+1+Gachibowli+Road+Raidurg+Hyderabad+Telangana+500032"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-2 hover:text-white transition-colors"
                                >
                                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#A89FE0] group-hover:scale-110 transition-transform" />
                                    <div className="space-y-1 group-hover:underline underline-offset-2 decoration-[#A89FE0]">
                                        <p>Tekisho Infotech Pvt. Ltd.</p>
                                        <p>505 A, 5th Floor, Techno 1,</p>
                                        <p>Gachibowli Road, Raidurg,</p>
                                        <p>Hyderabad, Telangana - 500032</p>
                                    </div>
                                </a>
                                <p>+91 7331104192</p>
                            </div>

                            <div>
                                <a href="mailto:contact@tekisho.ai" className="hover:text-white transition-colors">contact@tekisho.ai</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 sm:mt-16 md:mt-20 pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium tracking-wider">
                    <p>&copy; 2026 LeadQ.AI. All rights reserved.</p>
                    <span className="opacity-70 flex items-center gap-2">
                        Proudly made in India
                        <span
                            aria-label="Indian flag"
                            role="img"
                            className="relative inline-block w-7 h-5 rounded-[3px] overflow-hidden border border-white/25"
                        >
                            <span className="absolute inset-x-0 top-0 h-1/3 bg-[#FF9933]" />
                            <span className="absolute inset-x-0 top-1/3 h-1/3 bg-white" />
                            <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[#138808]" />
                            <svg
                                viewBox="0 0 24 24"
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[9px] h-[9px] text-[#000080]"
                                aria-hidden="true"
                            >
                                <circle cx="12" cy="12" r="5.2" fill="none" stroke="currentColor" strokeWidth="1" />
                                <circle cx="12" cy="12" r="1" fill="currentColor" />
                                <line x1="12" y1="12" x2="12" y2="6.5" stroke="currentColor" strokeWidth="0.8" />
                                <line x1="12" y1="12" x2="12" y2="17.5" stroke="currentColor" strokeWidth="0.8" />
                                <line x1="12" y1="12" x2="17.5" y2="12" stroke="currentColor" strokeWidth="0.8" />
                                <line x1="12" y1="12" x2="6.5" y2="12" stroke="currentColor" strokeWidth="0.8" />
                                <line x1="12" y1="12" x2="15.89" y2="8.11" stroke="currentColor" strokeWidth="0.8" />
                                <line x1="12" y1="12" x2="8.11" y2="15.89" stroke="currentColor" strokeWidth="0.8" />
                                <line x1="12" y1="12" x2="15.89" y2="15.89" stroke="currentColor" strokeWidth="0.8" />
                                <line x1="12" y1="12" x2="8.11" y2="8.11" stroke="currentColor" strokeWidth="0.8" />
                                <line x1="12" y1="12" x2="13.42" y2="6.69" stroke="currentColor" strokeWidth="0.7" />
                                <line x1="12" y1="12" x2="10.58" y2="17.31" stroke="currentColor" strokeWidth="0.7" />
                                <line x1="12" y1="12" x2="17.31" y2="13.42" stroke="currentColor" strokeWidth="0.7" />
                                <line x1="12" y1="12" x2="6.69" y2="10.58" stroke="currentColor" strokeWidth="0.7" />
                                <line x1="12" y1="12" x2="16.76" y2="9.25" stroke="currentColor" strokeWidth="0.7" />
                                <line x1="12" y1="12" x2="7.24" y2="14.75" stroke="currentColor" strokeWidth="0.7" />
                                <line x1="12" y1="12" x2="14.75" y2="16.76" stroke="currentColor" strokeWidth="0.7" />
                                <line x1="12" y1="12" x2="9.25" y2="7.24" stroke="currentColor" strokeWidth="0.7" />
                                <line x1="12" y1="12" x2="14.11" y2="6.92" stroke="currentColor" strokeWidth="0.7" />
                                <line x1="12" y1="12" x2="9.89" y2="17.08" stroke="currentColor" strokeWidth="0.7" />
                                <line x1="12" y1="12" x2="17.08" y2="14.11" stroke="currentColor" strokeWidth="0.7" />
                                <line x1="12" y1="12" x2="6.92" y2="9.89" stroke="currentColor" strokeWidth="0.7" />
                                <line x1="12" y1="12" x2="16.24" y2="7.76" stroke="currentColor" strokeWidth="0.7" />
                                <line x1="12" y1="12" x2="7.76" y2="16.24" stroke="currentColor" strokeWidth="0.7" />
                                <line x1="12" y1="12" x2="16.24" y2="16.24" stroke="currentColor" strokeWidth="0.7" />
                                <line x1="12" y1="12" x2="7.76" y2="7.76" stroke="currentColor" strokeWidth="0.7" />
                            </svg>
                        </span>
                    </span>
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
