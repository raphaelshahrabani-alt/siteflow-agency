import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

// Mock Stripe
vi.mock("stripe", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      checkout: {
        sessions: {
          create: vi.fn().mockResolvedValue({
            id: "cs_test_123",
            url: "https://checkout.stripe.com/test/cs_test_123",
          }),
        },
      },
    })),
  };
});

// Mock notification
vi.mock("../_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: { origin: "https://example.com" },
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("agency.contact", () => {
  it("accepts a valid contact form submission", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agency.contact({
      name: "Joe Smith",
      email: "joe@example.com",
      business: "Joe's Auto Shop",
      message: "I'm interested in the Growth plan.",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects contact with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.agency.contact({
        name: "Joe Smith",
        email: "not-an-email",
      })
    ).rejects.toThrow();
  });

  it("rejects contact with missing name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.agency.contact({
        name: "",
        email: "joe@example.com",
      })
    ).rejects.toThrow();
  });
});

describe("agency.createCheckout", () => {
  it("creates a checkout session for the starter plan", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agency.createCheckout({
      planId: "starter",
      origin: "https://example.com",
    });

    expect(result).toHaveProperty("url");
    expect(result.url).toContain("checkout.stripe.com");
  });

  it("creates a checkout session for the growth plan", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agency.createCheckout({
      planId: "growth",
      origin: "https://example.com",
    });

    expect(result).toHaveProperty("url");
  });

  it("creates a checkout session for the premium plan", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agency.createCheckout({
      planId: "premium",
      origin: "https://example.com",
    });

    expect(result).toHaveProperty("url");
  });

  it("rejects an invalid plan ID", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.agency.createCheckout({
        planId: "invalid" as "starter",
        origin: "https://example.com",
      })
    ).rejects.toThrow();
  });
});
