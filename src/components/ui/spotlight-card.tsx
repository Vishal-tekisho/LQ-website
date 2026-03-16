import React from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
