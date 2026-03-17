import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { nanoid } from "nanoid";
import { getSessionCookieOptions, COOKIE_NAME } from "./_core/cookies";

// دالة للتحقق من توفر التاريخ
async function checkDateAvailability(eventDate: Date, bookings: any[]): Promise<boolean> {
  const eventDateStr = eventDate.toISOString().split('T')[0];
  const hasConflict = bookings.some(booking => {
    const bookingEventDate = booking.eventDate ? new Date(booking.eventDate).toISOString().split('T')[0] : new Date(booking.startDate).toISOString().split('T')[0];
    return bookingEventDate === eventDateStr && booking.status !== 'cancelled';
  });
  return !hasConflict;
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // إجراءات الحجوزات (Bookings)
  bookings: router({
    create: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        phone: z.string().min(1),
        serviceType: z.enum(['chalet', 'hall', 'both']),
        checkInDate: z.string(),
        eventDate: z.string().optional(),
        guestCount: z.number().min(1),
        totalPrice: z.string().optional(),
        paidAmount: z.string().optional(),
        remainingAmount: z.string().optional(),
        specialRequests: z.string().optional(),
        additionalDetails: z.string().optional(),
        generateQRCode: z.boolean().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        try {
          // التحقق من صحة التاريخ
          const checkInDate = new Date(input.checkInDate);
          const eventDate = input.eventDate ? new Date(input.eventDate) : checkInDate;

          if (isNaN(checkInDate.getTime())) {
            throw new Error('تاريخ الوصول غير صحيح');
          }

          if (isNaN(eventDate.getTime())) {
            throw new Error('تاريخ المناسبة غير صحيح');
          }

          // التحقق من أن تاريخ المناسبة لا يكون قبل تاريخ الوصول
          if (eventDate < checkInDate) {
            throw new Error('تاريخ المناسبة يجب أن يكون بعد أو مساوياً لتاريخ الوصول');
          }

          // التحقق من توفر التاريخ
          const allBookings = await db.getAllBookings();
          const isAvailable = await checkDateAvailability(eventDate, allBookings || []);
          if (!isAvailable) {
            throw new Error('هذا التاريخ محجوز بالفعل. يرجى اختيار تاريخ آخر');
          }

          // حفظ الحجز في قاعدة البيانات
          const result = await db.createBooking({
            customerId: 1,
            type: input.serviceType,
            startDate: checkInDate,
            eventDate: eventDate,
            price: parseFloat(input.totalPrice || '0'),
            paidAmount: input.paidAmount || '',
            remainingAmount: input.remainingAmount || '',
            notes: input.specialRequests,
            additionalDetails: input.additionalDetails,
            guestCount: input.guestCount,
            customerName: input.name,
            customerPhone: input.phone,
            generateQRCode: input.generateQRCode || false,
            status: 'pending',
            createdBy: ctx.user?.id || 1,
          });

          // تسجيل العملية
          try {
            await db.logActivity({
              userId: ctx.user?.id || 1,
              action: 'create',
              entityType: 'booking',
              details: JSON.stringify(input),
            });
          } catch (logError) {
            console.warn('Failed to log activity:', logError);
          }

          return { success: true, id: result };
        } catch (error) {
          console.error('Error creating booking:', error);
          const errorMessage = error instanceof Error ? error.message : 'حدث خطأ أثناء إضافة الحجز';
          throw new Error(errorMessage);
        }
      }),

    getAll: publicProcedure.query(async () => {
      try {
        const bookings = await db.getAllBookings();
        if (!bookings || bookings.length === 0) {
          return [];
        }
        // تحويل البيانات من قاعدة البيانات إلى الصيغة المتوقعة من الواجهة
        return bookings.map((booking: any) => ({
          id: booking.id,
          name: booking.customerName || '',
          phone: booking.customerPhone || '',
          serviceType: booking.type,
          checkInDate: booking.startDate ? new Date(booking.startDate).toISOString().split('T')[0] : '',
          eventDate: booking.eventDate ? new Date(booking.eventDate).toISOString().split('T')[0] : '',
          guestCount: booking.guestCount || 0,
          totalPrice: booking.price?.toString() || '',
          paidAmount: booking.paidAmount || '',
          remainingAmount: booking.remainingAmount || '',
          specialRequests: booking.notes || '',
          additionalDetails: booking.additionalDetails || '',
          generateQRCode: booking.generateQRCode || false,
          status: booking.status,
          createdAt: booking.createdAt ? new Date(booking.createdAt).toISOString() : new Date().toISOString(),
        }));
      } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
      }
    }),

    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        try {
          await db.deleteBooking(input.id);
          try {
            await db.logActivity({
              userId: ctx.user?.id || 1,
              action: 'delete',
              entityType: 'booking',
              entityId: input.id,
              details: JSON.stringify({ bookingId: input.id }),
            });
          } catch (logError) {
            console.warn('Failed to log activity:', logError);
          }
          return { success: true };
        } catch (error) {
          console.error('Error deleting booking:', error);
          throw error;
        }
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['pending', 'confirmed', 'cancelled']).optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        try {
          await db.updateBooking(input.id, {
            status: input.status,
            notes: input.notes,
          });
          try {
            await db.logActivity({
              userId: ctx.user?.id || 1,
              action: 'update',
              entityType: 'booking',
              entityId: input.id,
              details: JSON.stringify(input),
            });
          } catch (logError) {
            console.warn('Failed to log activity:', logError);
          }
          return { success: true };
        } catch (error) {
          console.error('Error updating booking:', error);
          throw error;
        }
      }),

    search: publicProcedure
      .input(z.object({
        customerName: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        status: z.enum(['all', 'pending', 'confirmed', 'cancelled']).optional(),
        serviceType: z.enum(['all', 'chalet', 'hall', 'both']).optional(),
      }))
      .query(async ({ input }) => {
        try {
          const bookings = await db.getAllBookings();
          if (!bookings || bookings.length === 0) {
            return [];
          }

          const filtered = bookings.filter((booking: any) => {
            if (input.customerName && input.customerName.trim() !== '') {
              const name = (booking.customerName || '').toLowerCase();
              if (!name.includes(input.customerName.toLowerCase())) {
                return false;
              }
            }

            if (input.startDate && input.startDate.trim() !== '') {
              const bookingDate = new Date(booking.startDate);
              const filterDate = new Date(input.startDate);
              if (bookingDate < filterDate) {
                return false;
              }
            }

            if (input.endDate && input.endDate.trim() !== '') {
              const bookingDate = new Date(booking.startDate);
              const filterDate = new Date(input.endDate);
              if (bookingDate > filterDate) {
                return false;
              }
            }

            if (input.status && input.status !== 'all') {
              if (booking.status !== input.status) {
                return false;
              }
            }

            if (input.serviceType && input.serviceType !== 'all') {
              if (booking.type !== input.serviceType) {
                return false;
              }
            }

            return true;
          });

          return filtered.map((booking: any) => ({
            id: booking.id,
            name: booking.customerName || '',
            phone: booking.customerPhone || '',
            serviceType: booking.type,
            checkInDate: booking.startDate ? new Date(booking.startDate).toISOString().split('T')[0] : '',
            eventDate: booking.eventDate ? new Date(booking.eventDate).toISOString().split('T')[0] : '',
            guestCount: booking.guestCount || 0,
            totalPrice: booking.price?.toString() || '',
            paidAmount: booking.paidAmount || '',
            remainingAmount: booking.remainingAmount || '',
            specialRequests: booking.notes || '',
            additionalDetails: booking.additionalDetails || '',
            generateQRCode: booking.generateQRCode || false,
            status: booking.status,
            createdAt: booking.createdAt ? new Date(booking.createdAt).toISOString() : new Date().toISOString(),
          }));
        } catch (error) {
          console.error('Error searching bookings:', error);
          throw error;
        }
      }),

    getActivityLogs: publicProcedure.query(async () => {
      try {
        const logs = await db.getActivityLogs(100);
        return logs.map(log => ({
          id: log.id,
          action: log.action,
          user: log.userId || 'نظام',
          timestamp: log.createdAt?.toISOString() || new Date().toISOString(),
          details: log.details,
          entityType: log.entityType,
          entityId: log.entityId,
        }));
      } catch (error) {
        console.error('Error fetching activity logs:', error);
        return [];
      }
    }),
  }),

  // سجل العمليات (Activity Logs)
  activityLogs: router({
    getAll: publicProcedure.query(async () => {
      try {
        const logs = await db.getActivityLogs(100);
        return logs.map(log => ({
          id: log.id,
          action: log.action,
          user: log.userId || 'نظام',
          timestamp: log.createdAt?.toISOString() || new Date().toISOString(),
          details: log.details,
          entityType: log.entityType,
          entityId: log.entityId,
        }));
      } catch (error) {
        console.error('Error fetching activity logs:', error);
        return [];
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
