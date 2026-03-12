import { describe, expect, it, vi } from "vitest";
import { quotesRouter } from "./quotes";
import type { TrpcContext } from "../_core/context";

// Mock the notification module
vi.mock("../_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("quotes router", () => {
  it("should successfully send a quote request with valid data", async () => {
    const ctx = createPublicContext();
    const caller = quotesRouter.createCaller(ctx);

    const result = await caller.sendQuote({
      name: "John Doe",
      email: "john@example.com",
      phone: "5145551234",
      vehicle: "2020 Honda Civic",
    });

    expect(result).toEqual({
      success: true,
      message: "Quote request sent successfully",
    });
  });

  it("should reject invalid email", async () => {
    const ctx = createPublicContext();
    const caller = quotesRouter.createCaller(ctx);

    try {
      await caller.sendQuote({
        name: "John Doe",
        email: "invalid-email",
        phone: "5145551234",
        vehicle: "2020 Honda Civic",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Invalid email");
    }
  });

  it("should reject missing name", async () => {
    const ctx = createPublicContext();
    const caller = quotesRouter.createCaller(ctx);

    try {
      await caller.sendQuote({
        name: "",
        email: "john@example.com",
        phone: "5145551234",
        vehicle: "2020 Honda Civic",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Name is required");
    }
  });

  it("should reject short phone number", async () => {
    const ctx = createPublicContext();
    const caller = quotesRouter.createCaller(ctx);

    try {
      await caller.sendQuote({
        name: "John Doe",
        email: "john@example.com",
        phone: "123",
        vehicle: "2020 Honda Civic",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Phone number must be at least 10 digits");
    }
  });

  it("should accept optional vehicle field", async () => {
    const ctx = createPublicContext();
    const caller = quotesRouter.createCaller(ctx);

    const result = await caller.sendQuote({
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "5145551234",
    });

    expect(result).toEqual({
      success: true,
      message: "Quote request sent successfully",
    });
  });
});
