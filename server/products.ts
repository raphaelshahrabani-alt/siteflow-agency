// Stripe product and pricing definitions for SiteFlow Agency retainer plans.
// These are used to create checkout sessions and display pricing on the frontend.

export const AGENCY_PLANS = {
  starter: {
    name: "Starter Plan",
    description: "5-page professional website with monthly management",
    price: 14900, // $149.00 in cents
    interval: "month" as const,
    setupFee: 29900, // $299.00 one-time setup fee
    features: [
      "5-page professional website",
      "Mobile responsive design",
      "Contact & quote form",
      "Google Maps integration",
      "Basic SEO setup",
      "Monthly updates (1hr)",
      "Email support",
    ],
  },
  growth: {
    name: "Growth Plan",
    description: "10-page website with booking system and monthly management",
    price: 24900, // $249.00 in cents
    interval: "month" as const,
    setupFee: 29900,
    features: [
      "10-page professional website",
      "Custom design & branding",
      "Online booking / quote system",
      "Before & after gallery",
      "Google Reviews integration",
      "Monthly updates (3hrs)",
      "Priority support",
      "Monthly performance report",
    ],
  },
  premium: {
    name: "Premium Plan",
    description: "Unlimited pages with full-service digital presence",
    price: 44900, // $449.00 in cents
    interval: "month" as const,
    setupFee: 29900,
    features: [
      "Unlimited pages",
      "Full custom design",
      "E-commerce / payments",
      "Blog & content management",
      "Advanced SEO & analytics",
      "Monthly updates (8hrs)",
      "Dedicated account manager",
      "Monthly strategy call",
      "Social media integration",
    ],
  },
} as const;

export type PlanId = keyof typeof AGENCY_PLANS;

export function getPlan(planId: string) {
  if (planId in AGENCY_PLANS) {
    return AGENCY_PLANS[planId as PlanId];
  }
  return null;
}
