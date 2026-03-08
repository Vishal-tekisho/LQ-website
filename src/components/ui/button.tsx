import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                "footer-link": "text-leadq-steel hover:text-white transition-colors text-left",
                "toggle-sm": "text-leadq-silver bg-leadq-silver/20 hover:bg-leadq-silver/30",
                "nav-small": "text-leadq-silver hover:text-leadq-silver transition-colors",
                "gradient-silver": "bg-gradient-to-br from-leadq-deep-blue via-leadq-navy-mid to-leadq-purple text-white border border-leadq-purple/30 shadow-md shadow-leadq-purple/25 hover:shadow-lg hover:shadow-leadq-purple/45 focus-visible:ring-leadq-purple focus-visible:ring-offset-black",
                "gradient-blue": "bg-gradient-to-r from-leadq-purple-dark to-leadq-purple text-white hover:shadow-xl hover:shadow-leadq-purple/30 focus-visible:ring-leadq-purple",
                "white-primary": "bg-white text-leadq-purple-dark hover:bg-white/90 shadow-xl hover:shadow-2xl focus-visible:ring-white focus-visible:ring-offset-leadq-deep-blue",
                "glass-secondary": "glass hover:bg-white/10 text-leadq-silver focus-visible:ring-leadq-purple",
                "cookie-modal": "bg-gradient-to-r from-leadq-purple-dark to-leadq-purple text-white font-semibold shadow-glow hover:shadow-glow-strong",
            },
            size: {
                default: "h-10 px-4 py-2 rounded-md text-sm",
                sm: "h-9 rounded-md px-3 text-sm",
                lg: "h-11 rounded-md px-8 text-lg",
                "header-sm": "h-10 px-6 py-2 rounded-lg",
                "header-md": "h-auto px-6 py-3 rounded-lg",
                "contact-lg": "w-full py-4 rounded-lg text-lg",
                "cta-lg": "px-6 sm:px-10 py-3 sm:py-4 rounded-lg text-base sm:text-lg",
                "footer-link": "h-auto p-0 text-sm",
                "compact-sm": "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs",
                "compact-md": "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs",
                "compact-lg": "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    },
)
Button.displayName = "Button"

export { Button, buttonVariants }
