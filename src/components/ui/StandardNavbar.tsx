import { useEffect, useState } from "react"
import { m, AnimatePresence } from "framer-motion"
import { LucideIcon, Sparkles, Briefcase, ScanLine, UserPlus, LayoutDashboard, Calendar, PenLine, Bot, DollarSign, HelpCircle, Mail, Menu as MenuIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Menu, MenuItem, MenuLink, MenuSection } from "./navbar-menu"
import { Link } from "react-router-dom"
import { SpotlightButton } from "./SpotlightButton"

interface NavItem {
    name: string
    url: string
    icon: LucideIcon
    description?: string
}

interface NavBarProps {
    items: NavItem[]
    className?: string
}

// Group definitions for dropdown menus
const menuGroups = {
    solutions: {
        label: "Solutions",
        icon: Briefcase,
        items: [
            { name: "Features", url: "#features", icon: Sparkles, description: "Explore the core capabilities of LeadQ.AI." },
            { name: "Use Cases", url: "#use-cases", icon: Briefcase, description: "See how LeadQ.AI solves real-world problems." },
            { name: "Lead Capture", url: "#lead-capture", icon: ScanLine, description: "Capture and manage leads efficiently." },
            { name: "Research", url: "#profile-research", icon: UserPlus, description: "Deep dive into prospect data." },
            { name: "Dashboard", url: "#dashboard", icon: LayoutDashboard, description: "Visualize your performance metrics." },
            { name: "Bookings", url: "#bookings-meeting", icon: Calendar, description: "Manage appointments and schedules." },
            { name: "Email Draft", url: "#email-draft", icon: PenLine, description: "AI-powered email composition." },
            { name: "AI Agents", url: "#agents", icon: Bot, description: "Automate tasks with intelligent agents." },
        ]
    }
}

// Direct links (not in dropdowns)
const directLinks = [
    { name: "Pricing", url: "#pricing", icon: DollarSign },
    { name: "FAQ", url: "#faq", icon: HelpCircle },
    { name: "Contact", url: "#contact", icon: Mail },
]

export function StandardNavbar({ items, className }: NavBarProps) {
    const [activeTab, setActiveTab] = useState("")
    const [activeMenu, setActiveMenu] = useState<string | null>(null)
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
        setActiveMenu(null)
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
    const allNavItems = [
        ...menuGroups.solutions.items,
        ...directLinks
    ]

    return (
        <div
            className={cn(
                "fixed top-0 left-0 w-full z-[100] transition-all duration-300 backdrop-blur-xl border-b border-white/10",
                isScrolled || mobileMenuOpen ? "bg-black/30" : "bg-black/5",
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
                            className="h-14 w-auto"
                        />
                        <span className="text-lg font-bold font-display text-white">
                            LeadQ.AI
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        <Menu setActive={setActiveMenu}>
                            {/* Solutions Dropdown */}
                            <MenuItem
                                setActive={setActiveMenu}
                                active={activeMenu}
                                item="Solutions"
                                icon={menuGroups.solutions.icon}
                                wideDropdown={true}
                                buttonClassName="animate-pulse-glow-silver"
                            >
                                <div className="flex gap-6 min-w-[480px]">
                                    <div className="flex-1">
                                        <MenuSection>
                                            {menuGroups.solutions.items.slice(0, 4).map((item) => (
                                                <MenuLink
                                                    key={item.name}
                                                    href={item.url}
                                                    icon={item.icon}
                                                    onClick={(e) => handleLinkClick(e, item.url, item.name)}
                                                    description={item.description}
                                                >
                                                    {item.name}
                                                </MenuLink>
                                            ))}
                                        </MenuSection>
                                    </div>
                                    <div className="flex-1">
                                        <MenuSection>
                                            {menuGroups.solutions.items.slice(4).map((item) => (
                                                <MenuLink
                                                    key={item.name}
                                                    href={item.url}
                                                    icon={item.icon}
                                                    onClick={(e) => handleLinkClick(e, item.url, item.name)}
                                                    description={item.description}
                                                >
                                                    {item.name}
                                                </MenuLink>
                                            ))}
                                        </MenuSection>
                                    </div>
                                </div>
                            </MenuItem>

                            {/* Direct Links */}
                            {directLinks.map((item) => {
                                const isActive = activeTab === item.name
                                return (
                                    <a
                                        key={item.name}
                                        href={item.url}
                                        onClick={(e) => handleLinkClick(e, item.url, item.name)}
                                        className={cn(
                                            "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                                            isActive ? "text-white bg-white/10" : "text-leadq-silver hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                )
                            })}
                        </Menu>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <button className="px-6 py-2.5 text-sm rounded-lg font-semibold bg-gradient-to-r from-leadq-deep-blue to-leadq-royal-blue text-white shadow-[0_0_20px_rgba(39,81,169,0.5)] hover:shadow-[0_0_30px_rgba(39,81,169,0.7)] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-leadq-royal-blue focus:ring-offset-2 focus:ring-offset-black whitespace-nowrap">
                            Login
                        </button>
                        <SpotlightButton>
                            Sign Up
                        </SpotlightButton>
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
                        className="md:hidden fixed inset-0 top-0 bg-black/95 backdrop-blur-xl z-[100] pt-20 overflow-y-auto"
                    >
                        <div className="px-6 py-8 space-y-6">
                            <div className="space-y-2">
                                <div className="text-xs font-semibold text-leadq-silver/50 uppercase tracking-wider mb-4">Navigation</div>
                                {allNavItems.map((item) => {
                                    const Icon = item.icon
                                    const isActive = activeTab === item.name
                                    return (
                                        <a
                                            key={item.name}
                                            href={item.url}
                                            onClick={(e) => handleLinkClick(e, item.url, item.name)}
                                            className={cn(
                                                "flex items-center gap-4 p-3 rounded-xl transition-all",
                                                isActive
                                                    ? "bg-leadq-royal-blue/10 text-leadq-royal-blue border border-leadq-royal-blue/30"
                                                    : "text-leadq-silver hover:bg-white/5 hover:text-white"
                                            )}
                                        >
                                            <Icon size={20} strokeWidth={2} />
                                            <span className="text-base font-medium">{item.name}</span>
                                        </a>
                                    )
                                })}
                            </div>

                            <div className="pt-6 border-t border-white/10 space-y-4">
                                <button className="w-full py-4 font-bold bg-gradient-to-r from-leadq-deep-blue to-leadq-royal-blue text-white rounded-xl shadow-lg shadow-leadq-royal-blue/20">
                                    Login
                                </button>
                                <button className="w-full py-4 font-bold bg-gradient-to-r from-leadq-deep-blue to-leadq-royal-blue text-white rounded-xl shadow-lg shadow-leadq-royal-blue/20">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    )
}
