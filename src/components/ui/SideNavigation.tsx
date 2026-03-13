"use client"

import React, { useEffect, useState } from "react"
import { m } from "framer-motion"
import { cn } from "@/lib/utils"

interface Section {
    id: string
    label: string
}

const sections: Section[] = [
    { id: "hero", label: "Home" },
    { id: "what-leadq-does", label: "What LeadQ.AI Does" },
    { id: "agents", label: "Solutions" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
]

export function SideNavigation() {
    const [activeSection, setActiveSection] = useState<string>("hero")

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            {
                rootMargin: "-50% 0px -50% 0px",
                threshold: 0,
            }
        )

        sections.forEach((section) => {
            const element = document.getElementById(section.id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault()
        const element = document.getElementById(id)
        if (element) {
            // Use instant scroll to match the navbar behavior and avoid scroll trapping
            window.scrollTo({
                top: element.offsetTop,
                behavior: "instant" as ScrollBehavior
            })
        }
    }

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-8">
            <div className="relative">
                {/* Connector Line */}
                <div className="absolute right-[11px] top-0 bottom-0 w-[1px] bg-white/10" />

                <div className="flex flex-col gap-6">
                    {sections.map((section) => {
                        const isActive = activeSection === section.id
                        return (
                            <div key={section.id} className="relative group flex items-center justify-end">
                                <button
                                    onClick={(e) => handleClick(e, section.id)}
                                    className="relative z-10 flex items-center outline-none focus:outline-none flex-row-reverse"
                                    aria-label={`Navigate to ${section.label}`}
                                >
                                    {/* Indicator Line/Dot */}
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        <m.div
                                            className={cn(
                                                "transition-all duration-300 rounded-full",
                                                isActive
                                                    ? "w-1.5 h-1.5 bg-[#7B6FD4] shadow-[0_0_10px_rgba(123,111,212,0.8)]"
                                                    : "w-1 h-1 bg-leadq-silver/40 group-hover:bg-leadq-silver/80 group-hover:w-1.5 group-hover:h-1.5"
                                            )}
                                            layoutId="activeSectionIndicator"
                                        />
                                    </div>

                                    {/* Label */}
                                    <span
                                        className={cn(
                                            "mr-4 text-xs font-medium tracking-wider uppercase transition-all duration-300 absolute right-6 w-max pointer-events-none text-right",
                                            isActive
                                                ? "text-white opacity-100 translate-x-0"
                                                : "text-leadq-silver opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                                        )}
                                    >
                                        {section.label}
                                    </span>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="absolute -right-[5px] -top-12 text-[10px] font-bold tracking-[0.2em] text-leadq-silver/40 uppercase -rotate-90 origin-right translate-y-full w-max">
                Navigate
            </div>
        </div>
    )
}
