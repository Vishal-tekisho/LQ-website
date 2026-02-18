import { useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface SpotlightButtonProps {
    children: React.ReactNode
    className?: string
    onClick?: () => void
}

export function SpotlightButton({ children, className, onClick }: SpotlightButtonProps) {
    const btnRef = useRef<HTMLButtonElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 })

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (!btnRef.current) return
        const rect = btnRef.current.getBoundingClientRect()
        setSpotlightPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }, [])

    const handleMouseEnter = useCallback(() => setIsHovered(true), [])
    const handleMouseLeave = useCallback(() => setIsHovered(false), [])

    return (
        <button
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={cn("spotlight-btn", className)}
        >
            {/* Base layer — muted default state */}
            <span className="spotlight-btn__base">
                {children}
            </span>

            {/* Reveal layer — bright version, masked by spotlight */}
            <span
                className="spotlight-btn__reveal"
                style={{
                    opacity: isHovered ? 1 : 0,
                    maskImage: `radial-gradient(circle 90px at ${spotlightPos.x}px ${spotlightPos.y}px, black 30%, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(circle 90px at ${spotlightPos.x}px ${spotlightPos.y}px, black 30%, transparent 100%)`,
                }}
            >
                {children}
            </span>

            {/* Subtle glow orb that follows cursor */}
            <span
                className="spotlight-btn__glow"
                style={{
                    opacity: isHovered ? 1 : 0,
                    left: `${spotlightPos.x}px`,
                    top: `${spotlightPos.y}px`,
                }}
            />
        </button>
    )
}
