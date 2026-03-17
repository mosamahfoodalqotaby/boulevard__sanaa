import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "sample-user",
    email: "sample@example.com",
    name: "Sample User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("bookings", () => {
  it("creates a new booking", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.bookings.create({
      name: "أحمد محمد",
      phone: "967712345678",
      serviceType: "chalet",
      checkInDate: "2026-03-15",
      eventDate: "2026-03-15",
      guestCount: 10,
      totalPrice: "5000",
      paidAmount: "2500",
      remainingAmount: "2500",
      specialRequests: "طلب خاص",
      additionalDetails: "تفاصيل إضافية",
      generateQRCode: true,
    });

    expect(result).toHaveProperty("success", true);
    expect(result).toHaveProperty("id");
  });

  it("retrieves all bookings", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a booking first
    await caller.bookings.create({
      name: "فاطمة علي",
      phone: "967787654321",
      serviceType: "hall",
      checkInDate: "2026-03-20",
      guestCount: 20,
      totalPrice: "10000",
    });

    // Retrieve all bookings
    const bookings = await caller.bookings.getAll();

    expect(Array.isArray(bookings)).toBe(true);
    expect(bookings.length).toBeGreaterThan(0);
    expect(bookings[0]).toHaveProperty("id");
    expect(bookings[0]).toHaveProperty("name");
    expect(bookings[0]).toHaveProperty("phone");
  });

  it("deletes a booking", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a booking first
    const createResult = await caller.bookings.create({
      name: "محمد سالم",
      phone: "967712345678",
      serviceType: "both",
      checkInDate: "2026-03-25",
      guestCount: 15,
      totalPrice: "7500",
    });

    // Delete the booking
    const deleteResult = await caller.bookings.delete({
      id: createResult.id as number,
    });

    expect(deleteResult).toHaveProperty("success", true);
  });

  it("retrieves activity logs", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a booking to generate activity logs
    await caller.bookings.create({
      name: "سارة يوسف",
      phone: "967712345678",
      serviceType: "chalet",
      checkInDate: "2026-03-30",
      guestCount: 8,
      totalPrice: "4000",
    });

    // Retrieve activity logs
    const logs = await caller.bookings.getActivityLogs();

    expect(Array.isArray(logs)).toBe(true);
    // Should have at least one log from the create operation
    expect(logs.length).toBeGreaterThanOrEqual(1);
  });

  it("updates a booking", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a booking first
    const createResult = await caller.bookings.create({
      name: "علي محمود",
      phone: "967712345678",
      serviceType: "chalet",
      checkInDate: "2026-04-05",
      guestCount: 12,
      totalPrice: "6000",
    });

    // Update the booking
    const updateResult = await caller.bookings.update({
      id: createResult.id as number,
      status: "confirmed",
      notes: "تم التأكيد",
    });

    expect(updateResult).toHaveProperty("success", true);
  });
});
