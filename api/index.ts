import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";
import Stripe from "stripe";
import { notifyOwner } from "../server/_core/notification";

const app = express();

// Stripe webhook MUST use raw body — register BEFORE express.json()
app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-02-25.clover" });
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret!);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[Stripe Webhook] Signature verification failed:", msg);
    res.status(400).send(`Webhook Error: ${msg}`);
    return;
  }

  // Test event passthrough for Stripe webhook verification
  if (event.id.startsWith("evt_test_")) {
    res.json({ verified: true });
    return;
  }

  console.log(`[Stripe Webhook] Event: ${event.type} | ID: ${event.id}`);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const planId = session.metadata?.plan_id || "unknown";
    const planName = session.metadata?.plan_name || "Unknown Plan";
    await notifyOwner({
      title: `New Client Payment: ${planName}`,
      content: `A new client has paid!\n\nSession ID: ${session.id}\nPlan: ${planId}\nAmount: $${((session.amount_total || 0) / 100).toFixed(2)}\nCustomer Email: ${session.customer_email || "N/A"}`,
    });
  }

  res.json({ received: true });
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// OAuth routes
registerOAuthRoutes(app);

// tRPC API
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export default app;
