import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import Stripe from "stripe";
import { notifyOwner } from "../_core/notification";
import { getPlan } from "../products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export const agencyRouter = router({
  // Contact form submission — notifies the owner
  contact: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        business: z.string().optional(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await notifyOwner({
        title: `New Contact: ${input.name}`,
        content: `
**Name:** ${input.name}
**Email:** ${input.email}
**Business:** ${input.business || "Not provided"}
**Message:** ${input.message || "No message"}
        `.trim(),
      });
      return { success: true };
    }),

  // Create a Stripe Checkout Session — $500 setup fee + $50/month retainer
  createCheckout: publicProcedure
    .input(
      z.object({
        planId: z.enum(["standard"]),
        origin: z.string().url(),
      })
    )
    .mutation(async ({ input }) => {
      const plan = getPlan(input.planId);
      if (!plan) throw new Error("Invalid plan selected");

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        allow_promotion_codes: true,
        line_items: [
          // One-time $500 setup fee
          {
            price_data: {
              currency: "cad",
              product_data: {
                name: "Website Setup Fee",
                description: "One-time custom website build & design",
              },
              unit_amount: plan.setupFee, // $500.00
            },
            quantity: 1,
          },
          // First month retainer ($50) billed upfront
          {
            price_data: {
              currency: "cad",
              product_data: {
                name: "Monthly Retainer — First Month",
                description: "Hosting, updates & support (first month)",
              },
              unit_amount: plan.price, // $50.00
            },
            quantity: 1,
          },
        ],
        metadata: {
          plan_id: input.planId,
          plan_name: plan.name,
          setup_fee: plan.setupFee.toString(),
          monthly_retainer: plan.price.toString(),
        },
        client_reference_id: input.planId,
        success_url: `${input.origin}/payment-success?plan=${input.planId}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${input.origin}/#pricing`,
      });

      return { url: session.url };
    }),
});
