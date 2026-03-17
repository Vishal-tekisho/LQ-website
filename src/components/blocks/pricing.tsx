"use client";

import { buttonVariants } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function PricingBlock({
  plans,
  title = "Simple, Transparent Pricing (Not Finalized) ",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);
  const titleWords = title.trim().split(/\s+/);
  const highlightedWord = titleWords.pop() ?? "";
  const leadingTitle = titleWords.join(" ");

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "#7B6FD4",
          "#A89FE0",
          "#4ade80",
          "#9ca3af",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div className="container pt-0 pb-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 max-w-2xl mx-auto"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 text-white">
          {leadingTitle}{leadingTitle ? ' ' : ''}
          <span className="text-[#A89FE0]">{highlightedWord}</span>
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-leadq-silver whitespace-pre-line leading-relaxed">
          {description}
        </p>
      </motion.div>

      <div className="flex justify-center mb-10">
        <div className="relative flex items-center p-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-inner">
          <button
            onClick={() => {
              if (!isMonthly) handleToggle(false);
            }}
            className={cn(
              "relative w-32 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 z-10",
              isMonthly ? "text-white" : "text-leadq-silver hover:text-white"
            )}
          >
            Monthly
          </button>

          <button
            onClick={() => {
              if (isMonthly) handleToggle(true);
            }}
            className={cn(
              "relative w-44 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 z-10 flex items-center justify-center gap-2",
              !isMonthly ? "text-white" : "text-leadq-silver hover:text-white"
            )}
            ref={switchRef as any}
          >
            Annually <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors", !isMonthly ? "bg-white/20 text-white" : "bg-[#A89FE0]/20 text-[#A89FE0]")}>Save 20%</span>
          </button>

          <div
            className="absolute top-1.5 bottom-1.5 left-1.5 bg-[#7B6FD4] rounded-full shadow-[0_0_15px_rgba(123,111,212,0.4)] transition-transform duration-300 ease-out z-0 pointer-events-none"
            style={{
              width: isMonthly ? "128px" : "176px",
              transform: isMonthly ? "translateX(0)" : "translateX(128px)"
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 sm:2 gap-4">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                  y: plan.isPopular ? -20 : 0,
                  opacity: 1,
                  x: index === 2 ? -30 : index === 0 ? 30 : 0,
                  scale: index === 0 || index === 2 ? 0.94 : 1.0,
                }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `rounded-2xl border-[1px] p-6 bg-leadq-bg text-center lg:flex lg:flex-col lg:justify-center relative text-white backdrop-blur-sm`,
              plan.isPopular ? "border-[#A89FE0] border-2 bg-gradient-to-b from-[#7B6FD4]/10 to-transparent" : "border-white/10",
              "flex flex-col",
              !plan.isPopular && "mt-5",
              index === 0 || index === 2
                ? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
                : "z-10",
              index === 0 && "origin-right",
              index === 2 && "origin-left"
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-[#7B6FD4] py-0.5 px-3 rounded-bl-xl rounded-tr-lg flex items-center shadow-lg">
                <Star className="text-white h-3.5 w-3.5 fill-current" />
                <span className="text-white ml-1 font-sans font-semibold text-xs tracking-wide">
                  Popular
                </span>
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <p className="text-base font-semibold text-leadq-silver">
                {plan.name}
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-5xl font-display font-bold tracking-tight text-white">
                  <NumberFlow
                    value={
                      isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                    }
                    format={{
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }}
                    transformTiming={{
                      duration: 500,
                      easing: "ease-out",
                    }}
                    willChange
                    className="font-variant-numeric: tabular-nums"
                  />
                </span>
                {plan.period !== "Next 3 months" && (
                  <span className="text-sm font-semibold leading-6 tracking-wide text-leadq-silver/80">
                    / {plan.period}
                  </span>
                )}
              </div>

              <p className="text-xs leading-5 text-leadq-silver/60">
                {isMonthly ? "billed monthly" : "billed annually"}
              </p>

              <ul className="mt-8 gap-3 flex flex-col mb-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-[#A89FE0] mt-1 flex-shrink-0" />
                    <span className="text-left text-sm text-gray-300 leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="w-full my-4 border-white/10" />

              <Link
                to={plan.href}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                  "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter mt-auto border-none",
                  "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-[#7B6FD4] hover:ring-offset-1 hover:bg-[#7B6FD4] hover:text-white",
                  plan.isPopular
                    ? "bg-[#7B6FD4] text-white hover:bg-[#8F84E6]"
                    : "bg-white/5 text-white hover:bg-white/10"
                )}
              >
                {plan.buttonText}
              </Link>
              <p className="mt-4 text-xs leading-5 text-leadq-silver/60">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
