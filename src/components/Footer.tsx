import React from 'react';
import { Twitter, Linkedin as LinkedIn, Github, ExternalLink } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#000000] text-[#9CA3AF] py-16 px-6 relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Logo and Description Section */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <img
                                src="/leadq-logo-v2.jpg"
                                alt="LeadQ.AI Logo"
                                className="h-10 w-auto rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            />
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#E5E7EB] to-[#9CA3AF]">
                                LeadQ<span className="text-blue-400">.AI</span>
                            </span>
                        </div>

                        <p className="text-sm leading-relaxed max-w-xs">
                            Building the world's most human-like voice agents to help businesses focus on human connections.
                        </p>

                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                                <Twitter className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                                <LinkedIn className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                                <Github className="w-5 h-5 group-hover:text-white transition-colors" />
                            </a>
                        </div>

                        {/* Legal Section moved here to match layout in image */}
                        <div className="pt-8">
                            <h4 className="text-[#E5E7EB] font-semibold mb-6 flex items-center gap-2">
                                Legal
                            </h4>
                            <ul className="space-y-4 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
                            </ul>
                        </div>
                    </div>


                    {/* Resources Section */}
                    <div className="md:col-span-1">
                        <h4 className="text-[#E5E7EB] font-semibold mb-8">Resources</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium tracking-wider">
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
