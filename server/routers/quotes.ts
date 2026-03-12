import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";

export const quotesRouter = router({
  sendQuote: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        phone: z.string().min(10, "Phone number must be at least 10 digits"),
        vehicle: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Send notification to owner
        const message = `
New Quote Request from ${input.name}

Email: ${input.email}
Phone: ${input.phone}
Vehicle: ${input.vehicle || "Not specified"}

Please contact them to provide a quote.
        `.trim();

        await notifyOwner({
          title: "New Quote Request",
          content: message,
        });

        return {
          success: true,
          message: "Quote request sent successfully",
        };
      } catch (error) {
        console.error("Failed to send quote:", error);
        throw new Error("Failed to process quote request");
      }
    }),
});
