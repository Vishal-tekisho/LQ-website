"use client";

import { PricingBlock } from "@/components/blocks/pricing";

const demoPlans = [
  {
    name: "STARTER",
    price: "50",
    yearlyPrice: "40",
    period: "per month",
    features: [
      "Up to 10 projects",
      "Basic analytics",
      "48-hour support response time",
      "Limited API access",
      "Community support",
    ],
    description: "Perfect for individuals and small projects",
    buttonText: "Start Free Trial",
    href: "/#contact",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "99",
    yearlyPrice: "79",
    period: "per month",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "24-hour support response time",
      "Full API access",
      "Priority support",
      "Team collaboration",
      "Custom integrations",
    ],
    description: "Ideal for growing teams and businesses",
    buttonText: "Get Started",
    href: "/#contact",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: "299",
    yearlyPrice: "239",
    period: "per month",
    features: [
      "Everything in Professional",
      "Custom solutions",
      "Dedicated account manager",
      "1-hour support response time",
      "SSO Authentication",
      "Advanced security",
      "Custom contracts",
      "SLA agreement",
    ],
    description: "For large organizations with specific needs",
    buttonText: "Contact Sales",
    href: "/#contact",
    isPopular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="relative z-10 w-full flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-7xl mx-auto rounded-lg">
        <PricingBlock 
          plans={demoPlans}
          title="Simple, Transparent Pricing"
          description={"Choose the plan that works for you.\nAll plans include access to our platform, lead generation tools, and dedicated support."}
        />
      </div>
    </section>
  );
}

export default Pricing;
