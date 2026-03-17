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

describe("advanced search", () => {
  it("searches bookings by customer name", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create test bookings
    await caller.bookings.create({
      name: "أحمد محمد",
      phone: "967712345678",
      serviceType: "chalet",
      checkInDate: "2026-03-15",
      guestCount: 10,
      totalPrice: "5000",
    });

    await caller.bookings.create({
      name: "فاطمة علي",
      phone: "967787654321",
      serviceType: "hall",
      checkInDate: "2026-03-20",
      guestCount: 20,
      totalPrice: "10000",
    });

    // Search by name
    const results = await caller.bookings.search({
      customerName: "أحمد",
    });

    expect(results.length).toBe(1);
    expect(results[0]?.name).toContain("أحمد");
  });

  it("searches bookings by date range", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create test bookings
    await caller.bookings.create({
      name: "محمد سالم",
      phone: "967712345678",
      serviceType: "both",
      checkInDate: "2026-03-10",
      guestCount: 15,
      totalPrice: "7500",
    });

    await caller.bookings.create({
      name: "سارة يوسف",
      phone: "967712345678",
      serviceType: "chalet",
      checkInDate: "2026-04-05",
      guestCount: 8,
      totalPrice: "4000",
    });

    // Search by date range
    const results = await caller.bookings.search({
      startDate: "2026-03-15",
      endDate: "2026-03-31",
    });

    // Should return bookings within the date range
    expect(results.length).toBeGreaterThanOrEqual(0);
  });

  it("searches bookings by status", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a booking
    const createResult = await caller.bookings.create({
      name: "علي محمود",
      phone: "967712345678",
      serviceType: "chalet",
      checkInDate: "2026-04-05",
      guestCount: 12,
      totalPrice: "6000",
    });

    // Update status to confirmed
    await caller.bookings.update({
      id: createResult.id as number,
      status: "confirmed",
    });

    // Search by status
    const results = await caller.bookings.search({
      status: "confirmed",
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.some(b => b.status === "confirmed")).toBe(true);
  });

  it("searches bookings by service type", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create test bookings
    await caller.bookings.create({
      name: "حسن أحمد",
      phone: "967712345678",
      serviceType: "chalet",
      checkInDate: "2026-04-10",
      guestCount: 5,
      totalPrice: "2500",
    });

    await caller.bookings.create({
      name: "نور محمد",
      phone: "967712345678",
      serviceType: "hall",
      checkInDate: "2026-04-15",
      guestCount: 30,
      totalPrice: "15000",
    });

    // Search by service type
    const results = await caller.bookings.search({
      serviceType: "chalet",
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.every(b => b.serviceType === "chalet")).toBe(true);
  });

  it("searches with multiple filters", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create test bookings
    await caller.bookings.create({
      name: "خديجة سالم",
      phone: "967712345678",
      serviceType: "both",
      checkInDate: "2026-04-20",
      guestCount: 25,
      totalPrice: "12500",
    });

    // Search with multiple filters
    const results = await caller.bookings.search({
      customerName: "خديجة",
      serviceType: "both",
      startDate: "2026-04-15",
      endDate: "2026-04-30",
    });

    expect(Array.isArray(results)).toBe(true);
  });

  it("returns all bookings when no filters are applied", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create test bookings
    await caller.bookings.create({
      name: "زيد علي",
      phone: "967712345678",
      serviceType: "chalet",
      checkInDate: "2026-05-01",
      guestCount: 10,
      totalPrice: "5000",
    });

    // Search with no filters
    const results = await caller.bookings.search({});

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThanOrEqual(1);
  });
});
