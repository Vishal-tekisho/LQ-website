import { cn } from "@/lib/utils"

interface SpotlightButtonProps {
    children: React.ReactNode
    className?: string
    onClick?: () => void
}

export function SpotlightButton({ children, className, onClick }: SpotlightButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn("spotlight-btn", className)}
        >
            <span className="spotlight-btn__base">
                {children}
            </span>
        </button>
    )
}
