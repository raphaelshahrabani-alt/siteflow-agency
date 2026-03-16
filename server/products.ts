// Stripe product and pricing definitions for SiteFlow Agency.
// Single plan: $500 one-time setup fee + $50/month retainer.

export const AGENCY_PLANS = {
  standard: {
    name: "Professional Website",
    description: "Custom website build + fully managed monthly retainer",
    price: 5000, // $50.00/month in cents
    interval: "month" as const,
    setupFee: 50000, // $500.00 one-time setup fee in cents
    features: [
      "Custom professional website design",
      "Mobile responsive on all devices",
      "Contact & quote request form",
      "Google Maps integration",
      "SEO-ready structure",
      "Monthly content updates",
      "Hosting & security managed",
      "Priority email & phone support",
      "You own your domain & content",
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
