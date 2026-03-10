import { useEffect, useState } from "react"
import { m, AnimatePresence } from "framer-motion"
import { LucideIcon, Sparkles, Briefcase, ScanLine, UserPlus, LayoutDashboard, Calendar, PenLine, Bot, DollarSign, HelpCircle, Mail, Menu as MenuIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Menu, MenuItem, MenuLink, MenuSection } from "./navbar-menu"
import { Link } from "react-router-dom"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
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
      { name: "Features", url: "#features", icon: Sparkles, description: "Explore powerful AI tools." },
      { name: "Use Cases", url: "#use-cases", icon: Briefcase, description: "Real-world sales scenarios." },
      { name: "Lead Capture", url: "#lead-capture", icon: ScanLine, description: "Capture and qualify leads in real time." },
      { name: "Research", url: "#profile-research", icon: UserPlus, description: "AI-driven prospect intelligence." },
      { name: "Dashboard", url: "#dashboard", icon: LayoutDashboard, description: "Visualize your performance metrics." },
      { name: "Meetings", url: "#bookings-meeting", icon: Calendar, description: "Manage appointments and schedules." },
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

// Determine which nav element is currently active based on activeTab
type ActiveNavElement = "Solutions" | "Pricing" | "FAQ" | "Contact" | null

function getActiveNavElement(activeTab: string): ActiveNavElement {
  // Check if activeTab is in Solutions group
  if (menuGroups.solutions.items.some(item => item.name === activeTab)) {
    return "Solutions"
  }
  // Check direct links
  if (directLinks.some(item => item.name === activeTab)) {
    return activeTab as ActiveNavElement
  }
  return null
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name || "")
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  // Handle link click
  const handleLinkClick = (name: string) => {
    setActiveTab(name)
    setActiveMenu(null)
    setMobileMenuOpen(false)
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

  const activeNavElement = getActiveNavElement(activeTab)

  // Lamp effect component
  const LampEffect = () => (
    <m.div
      layoutId="navbar-lamp"
      className="absolute inset-0 w-full bg-[#7B6FD4]/5 rounded-full -z-10"
      initial={false}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#7B6FD4] rounded-t-full">
        <div className="absolute w-12 h-6 bg-[#7B6FD4]/30 rounded-full blur-md -top-2 -left-2" />
        <div className="absolute w-8 h-6 bg-[#7B6FD4]/30 rounded-full blur-md -top-1" />
        <div className="absolute w-4 h-4 bg-[#7B6FD4]/30 rounded-full blur-sm top-0 left-2" />
      </div>
    </m.div>
  )

  // All navigation items combined for mobile
  const allNavItems = [
    ...menuGroups.solutions.items,
    ...directLinks
  ]

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full z-[100] pt-4 md:pt-6 px-4",
        className
      )}
    >
      {/* Logo - Desktop (fixed top-left, same level as login/signup) */}
      <div className="hidden md:flex items-center gap-2 fixed top-4 left-4 z-[101]">
        <Link to="/" className="flex items-center gap-2" aria-label="LeadQ.AI Home">
          <img
            src="/leadq-logo-v2.jpg"
            alt="LeadQ.AI"
            className="h-8 w-auto"
          />
          <span className="text-base font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-leadq-platinum to-leadq-steel">
            LeadQ<span className="text-[#A89FE0]">.AI</span>
          </span>
        </Link>
      </div>

      {/* Login & Sign Up Buttons - Desktop */}
      <div className="hidden md:flex items-center gap-3 fixed top-4 right-4 z-[101]">
        <button className="px-6 py-2.5 text-sm rounded-lg font-semibold bg-gradient-to-r from-[#7B6FD4] to-[#A89FE0] text-white shadow-[0_0_20px_rgba(123,111,212,0.5)] hover:shadow-[0_0_30px_rgba(123,111,212,0.7)] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7B6FD4] focus:ring-offset-2 focus:ring-offset-black whitespace-nowrap">
          Login
        </button>

        <button className="px-6 py-2.5 text-sm rounded-lg font-semibold bg-gradient-to-r from-[#7B6FD4] to-[#A89FE0] text-white shadow-[0_0_20px_rgba(123,111,212,0.5)] hover:shadow-[0_0_30px_rgba(123,111,212,0.7)] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7B6FD4] focus:ring-offset-2 focus:ring-offset-black whitespace-nowrap">
          Sign Up
        </button>
      </div>

      {/* Mobile Header with Hamburger */}
      <div className="md:hidden flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="LeadQ.AI Home">
          <img
            src="/leadq-logo-v2.jpg"
            alt="LeadQ.AI"
            className="h-8 w-auto"
          />
          <span className="text-base font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-leadq-platinum to-leadq-steel">
            LeadQ<span className="text-[#A89FE0]">.AI</span>
          </span>
        </Link>
        <button
          onClick={toggleMobileMenu}
          className="p-3 text-white hover:text-leadq-silver transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-leadq-silver"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-xl z-[99] overflow-y-auto"
          >
            <div className="px-4 py-6 space-y-2">
              {/* All Navigation Items */}
              {allNavItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.name
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    onClick={() => handleLinkClick(item.name)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-4 rounded-xl transition-all",
                      isActive
                        ? "bg-[#7B6FD4]/10 text-[#7B6FD4] border border-[#7B6FD4]/30"
                        : "text-leadq-silver hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      isActive ? "bg-leadq-silver/20" : "bg-white/10"
                    )}>
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <span className="text-base font-medium">{item.name}</span>
                  </a>
                )
              })}

              {/* Mobile Login & Sign Up */}
              <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
                <button className="w-full px-4 py-4 rounded-xl font-semibold bg-gradient-to-r from-[#7B6FD4] to-[#A89FE0] text-white shadow-[0_0_20px_rgba(123,111,212,0.5)] hover:shadow-[0_0_30px_rgba(123,111,212,0.7)] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7B6FD4] focus:ring-offset-2 focus:ring-offset-black text-base">
                  Login
                </button>
                <button className="w-full px-4 py-4 rounded-xl font-semibold bg-gradient-to-r from-[#7B6FD4] to-[#A89FE0] text-white shadow-[0_0_20px_rgba(123,111,212,0.5)] hover:shadow-[0_0_30px_rgba(123,111,212,0.7)] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7B6FD4] focus:ring-offset-2 focus:ring-offset-black text-base">
                  Sign Up
                </button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <div className="hidden md:flex max-w-4xl mx-auto items-center justify-center">
        {/* Navigation Items */}
        <div className="flex items-center bg-black/60 border border-white/10 backdrop-blur-xl py-1.5 px-2 rounded-full shadow-lg">
          <Menu setActive={setActiveMenu}>


            {/* Solutions Dropdown */}
            <div className="relative">
              <MenuItem
                setActive={setActiveMenu}
                active={activeMenu}
                item="Solutions"
                icon={menuGroups.solutions.icon}
                wideDropdown={true}
                buttonClassName=""
              >
                <div className="flex gap-6">
                  <div className="w-[160px]">
                    <MenuSection>
                      {menuGroups.solutions.items.slice(0, 4).map((item) => (
                        <MenuLink
                          key={item.name}
                          href={item.url}
                          icon={item.icon}
                          description={item.description}
                          onClick={() => handleLinkClick(item.name)}
                        >
                          {item.name}
                        </MenuLink>
                      ))}
                    </MenuSection>
                  </div>
                  <div className="w-[160px]">
                    <MenuSection>
                      {menuGroups.solutions.items.slice(4).map((item) => (
                        <MenuLink
                          key={item.name}
                          href={item.url}
                          icon={item.icon}
                          description={item.description}
                          onClick={() => handleLinkClick(item.name)}
                        >
                          {item.name}
                        </MenuLink>
                      ))}
                    </MenuSection>
                  </div>
                </div>
              </MenuItem>
              {activeNavElement === "Solutions" && <LampEffect />}
            </div>

            {/* Direct Links */}
            {directLinks.map((item) => {
              const Icon = item.icon
              const isActive = activeNavElement === item.name

              return (
                <a
                  key={item.name}
                  href={item.url}
                  onClick={() => handleLinkClick(item.name)}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors whitespace-nowrap flex items-center gap-2",
                    "text-leadq-silver hover:text-[#7B6FD4]",
                    isActive && "text-[#7B6FD4]"
                  )}
                >
                  <Icon size={18} strokeWidth={2} className="hidden md:block" />
                  <span>{item.name}</span>
                  {isActive && <LampEffect />}
                </a>
              )
            })}
          </Menu>
        </div>
      </div>
    </div>
  )
}

