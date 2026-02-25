"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, ChevronDown } from "lucide-react";

const transition = {
    type: "spring" as const,
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

export const MenuItem = ({
    setActive,
    active,
    item,
    icon: Icon,
    children,
    wideDropdown = false,
}: {
    setActive: (item: string | null) => void;
    active: string | null;
    item: string;
    icon?: LucideIcon;
    children?: React.ReactNode;
    wideDropdown?: boolean;
}) => {
    return (
        <div
            onMouseEnter={() => setActive(item)}
            onMouseLeave={() => setActive(null)}
            className="relative"
        >
            <motion.button
                type="button"
                transition={{ duration: 0.3 }}
                onClick={() => setActive(active === item ? null : item)}
                className="cursor-pointer text-leadq-silver hover:text-white flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-white/5 transition-colors"
            >
                {Icon && <Icon size={18} strokeWidth={2} />}
                <span>{item}</span>
                {children && (
                    <ChevronDown
                        size={14}
                        strokeWidth={2}
                        className={`transition-transform duration-300 ${active === item ? "rotate-180" : "rotate-0"}`}
                    />
                )}
            </motion.button>
            <AnimatePresence>
                {active === item && children && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={transition}
                        className={`absolute top-[calc(100%_+_0.5rem)] z-50 pointer-events-auto ${wideDropdown
                            ? "left-0"
                            : "left-1/2 transform -translate-x-1/2"
                            }`}
                        onMouseEnter={() => setActive(item)}
                        onMouseLeave={() => setActive(null)}
                    >
                        <div className="bg-black/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/50 p-4">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const Menu = ({
    setActive,
    children,
}: {
    setActive: (item: string | null) => void;
    children: React.ReactNode;
}) => {
    return (
        <nav
            onMouseLeave={() => setActive(null)}
            className="relative flex items-center"
        >
            {children}
        </nav>
    );
};

export const MenuLink = ({
    href,
    icon: Icon,
    children,
    description,
    onClick,
}: {
    href: string;
    icon?: LucideIcon;
    children: React.ReactNode;
    description?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
    return (
        <a
            href={href}
            onClick={onClick}
            className="flex items-start gap-3 p-3 rounded-lg text-leadq-silver hover:text-white hover:bg-white/10 transition-all group"
        >
            {Icon && (
                <div className="w-8 h-8 rounded-md bg-leadq-silver/10 flex items-center justify-center group-hover:bg-leadq-silver/20 transition-colors flex-shrink-0 mt-0.5">
                    <Icon size={16} className="text-leadq-silver" />
                </div>
            )}
            <div className="flex flex-col gap-1">
                <span className="text-sm font-medium leading-none">{children}</span>
                {description && (
                    <span className="text-xs text-leadq-silver/60 group-hover:text-leadq-silver/80 transition-colors font-normal leading-snug">
                        {description}
                    </span>
                )}
            </div>
        </a>
    );
};

export const MenuSection = ({
    title,
    children,
}: {
    title?: string;
    children: React.ReactNode;
}) => {
    return (
        <div>
            {title && (
                <p className="text-[10px] font-semibold text-leadq-silver/70 uppercase tracking-wider mb-2 px-3">
                    {title}
                </p>
            )}
            <div className="flex flex-col gap-0.5">{children}</div>
        </div>
    );
};

