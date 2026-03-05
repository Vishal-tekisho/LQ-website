import * as React from "react"
import { m } from "framer-motion"
import { buttonVariants, type ButtonProps } from "./button"
import { cn } from "@/lib/utils"

interface MotionButtonProps extends ButtonProps {
  whileHover?: any
  whileTap?: any
  animate?: any
  initial?: any
  transition?: any
  asChild?: boolean
}

const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({
    whileHover,
    whileTap,
    animate,
    initial,
    transition,
    className,
    variant = "default",
    size = "default",
    children,
    ...props
  }, ref) => {
    const buttonClass = cn(buttonVariants({ variant, size, className }))

    return (
      <m.button
        ref={ref}
        whileHover={whileHover}
        whileTap={whileTap}
        animate={animate}
        initial={initial}
        transition={transition}
        className={buttonClass}
        {...props}
      >
        {children}
      </m.button>
    )
  },
)

MotionButton.displayName = "MotionButton"

export { MotionButton }
