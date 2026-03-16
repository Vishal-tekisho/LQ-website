import { useEffect, useState } from "react"
import { m, AnimatePresence } from "framer-motion"
import { LucideIcon, Menu as MenuIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

interface NavItem {
    name: string
    url: string
    icon?: LucideIcon
    description?: string
}

interface NavBarProps {
    items: NavItem[]
    className?: string
}

const directLinks = [
    { name: "AI Agents", url: "#agents" },
    { name: "Features", url: "#what-leadq-does" },
    { name: "Resources", url: "#resources" },
    { name: "Pricing", url: "#pricing" },
]

export function StandardNavbar({ items, className }: NavBarProps) {
    const [activeTab, setActiveTab] = useState("")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    // Handle scroll effect for navbar background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Intersection Observer to update active tab on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id
                        const matchingItem = items.find(
                            (item) => item.url === `#${sectionId}`
                        )
                        if (matchingItem) {
                            setActiveTab(matchingItem.name)
                        }
                    }
                })
            },
            {
                rootMargin: "-50% 0px -50% 0px",
                threshold: 0,
            }
        )

        items.forEach((item) => {
            const sectionId = item.url.replace("#", "")
            const section = document.getElementById(sectionId)
            if (section) observer.observe(section)
        })

        return () => observer.disconnect()
    }, [items])

    // Handle link click with instant scroll to avoid observer interference
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string, name: string) => {
        e.preventDefault()
        setActiveTab(name)
        setMobileMenuOpen(false)

        if (url.startsWith("#")) {
            const targetId = url.replace("#", "")
            const element = document.getElementById(targetId)
            if (element) {
                // Use instant behavior to skip over animations that might trigger during smooth scroll
                window.scrollTo({
                    top: element.offsetTop,
                    behavior: "instant" as ScrollBehavior
                })
                // Update URL without scrolling
                window.history.pushState(null, "", url)
            }
        }
    }

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [mobileMenuOpen])

    // All navigation items combined for mobile
    const allNavItems = directLinks

    return (
        <div
            className={cn(
                "fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b border-white/10 backdrop-blur-xl",
                isScrolled || mobileMenuOpen ? "bg-[#0e1117]/80" : "bg-[#0e1117]/58",
                className
            )}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-0.2 z-[101]" aria-label="LeadQ.AI Home">
                        <img
                            src="/leadq-logo-main.png"
                            alt="LeadQ.AI"
                            className="h-[68px] md:h-[78px]"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex flex-1 justify-center items-center gap-6">
                            {/* Direct Links */}
                            {directLinks.map((item) => {
                                const isActive = activeTab === item.name
                                return (
                                    <a
                                        key={item.name}
                                        href={item.url}
                                        onClick={(e) => handleLinkClick(e, item.url, item.name)}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-full [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]",
                                            isActive ? "text-white bg-white/12" : "text-white/90 hover:text-white hover:bg-white/8"
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                )
                            })}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center">
                        <button className="px-6 py-2 text-sm rounded-full font-medium bg-[#1a1d24]/95 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.6)] hover:bg-[#2a2d34] transition-colors whitespace-nowrap">
                            Login
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 text-leadq-silver hover:text-white transition-colors z-[101]"
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden fixed inset-0 top-0 bg-black/95 backdrop-blur-xl z-[100] flex flex-col overflow-hidden"
                    >
                        {/* Spacer for Top Navbar height */}
                        <div className="h-16 md:h-20 shrink-0 border-b border-white/5 bg-transparent" />

                        {/* Scrollable Content Area */}
                        <div className="flex-1 overflow-y-auto px-6 py-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="text-xs font-semibold text-leadq-silver/50 uppercase tracking-wider mb-4">Navigation</div>
                                    {allNavItems.map((item) => {
                                        const isActive = activeTab === item.name
                                        return (
                                            <a
                                                key={item.name}
                                                href={item.url}
                                                onClick={(e) => handleLinkClick(e, item.url, item.name)}
                                                className={cn(
                                                    "flex items-center gap-4 p-3 rounded-xl transition-all",
                                                    isActive
                                                        ? "bg-white/10 text-white border border-white/20"
                                                        : "text-white/70 hover:bg-white/5 hover:text-white"
                                                )}
                                            >
                                                <span className="text-base font-medium">{item.name}</span>
                                            </a>
                                        )
                                    })}
                                </div>

                                <div className="pt-6 border-t border-white/10 space-y-4">
                                    <button className="w-full py-4 font-bold bg-[#1a1d24] text-white hover:bg-[#2a2d34] transition-colors rounded-xl">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    )
}
