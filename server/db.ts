import { InsertUser, users, customers, bookings, activityLogs, feedback, qrContent, packages, invoices } from "../drizzle/schema";
import { ENV } from './_core/env';
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { eq } from "drizzle-orm";

let _db: any = null;

// In-memory storage for development if no DATABASE_URL is provided
const inMemoryData = {
  users: new Map<number, any>(),
  customers: new Map<number, any>(),
  bookings: new Map<number, any>(),
  activityLogs: new Map<number, any>(),
  feedback: new Map<number, any>(),
  qrContent: new Map<number, any>(),
  packages: new Map<number, any>(),
  invoices: new Map<number, any>(),
};

let nextIds = {
  users: 1,
  customers: 1,
  bookings: 1,
  activityLogs: 1,
  feedback: 1,
  qrContent: 1,
  packages: 1,
  invoices: 1,
};

export async function getDb() {
  if (!_db) {
    if (ENV.databaseUrl) {
      console.log("[Database] Using MySQL Database");
      const poolConnection = mysql.createPool(ENV.databaseUrl);
      _db = drizzle(poolConnection, { mode: "default", schema: { users, customers, bookings, activityLogs, feedback, qrContent, packages, invoices } });
      console.log("[Database] Connected to MySQL Database");
    } else {
      console.log("[Database] Using In-Memory Storage (Development Mode)");
      _db = {
        insert: (table: any) => ({
          values: (data: any) => {
            const tableName = table._.name;
            const id = nextIds[tableName as keyof typeof nextIds]++;
            const record = { id, ...data };
            inMemoryData[tableName as keyof typeof inMemoryData].set(id, record);
            console.log(`[Database] Inserted into ${tableName}:`, record);
            return { insertId: id, changes: 1 };
          }
        }),
        select: (table: any) => ({
          from: (fromTable: any) => ({
            where: (condition: any) => {
              const tableName = fromTable._.name;
              const records = Array.from(inMemoryData[tableName as keyof typeof inMemoryData].values());
              // Simple in-memory filtering based on condition (needs improvement for complex queries)
              if (condition && condition.field && condition.value) {
                return records.filter(rec => rec[condition.field] === condition.value);
              }
              return records;
            },
            limit: (limit: number) => {
              const tableName = fromTable._.name;
              const records = Array.from(inMemoryData[tableName as keyof typeof inMemoryData].values());
              return records.slice(0, limit);
            }
          }),
          execute: () => {
            const tableName = table._.name;
            return Array.from(inMemoryData[tableName as keyof typeof inMemoryData].values());
          }
        }),
        update: (table: any) => ({
          set: (data: any) => ({
            where: (condition: any) => {
              const tableName = table._.name;
              const records = Array.from(inMemoryData[tableName as keyof typeof inMemoryData].values());
              if (condition && condition.field && condition.value) {
                const recordIndex = records.findIndex(rec => rec[condition.field] === condition.value);
                if (recordIndex !== -1) {
                  Object.assign(records[recordIndex], data);
                  inMemoryData[tableName as keyof typeof inMemoryData].set(records[recordIndex].id, records[recordIndex]);
                  console.log(`[Database] Updated record in ${tableName}:`, records[recordIndex]);
                }
              }
              return { changes: 1 };
            }
          })
        }),
        delete: (table: any) => ({
          where: (condition: any) => {
            const tableName = table._.name;
            const records = Array.from(inMemoryData[tableName as keyof typeof inMemoryData].values());
            if (condition && condition.field && condition.value) {
              const initialSize = inMemoryData[tableName as keyof typeof inMemoryData].size;
              inMemoryData[tableName as keyof typeof inMemoryData] = new Map(records.filter(rec => rec[condition.field] !== condition.value).map(rec => [rec.id, rec]));
              console.log(`[Database] Deleted records from ${tableName} where ${condition.field} = ${condition.value}`);
              return { changes: initialSize - inMemoryData[tableName as keyof typeof inMemoryData].size };
            }
            return { changes: 0 };
          }
        })
      };
    }
  }
  return _db;
}

// Initialize database tables on startup
export async function initializeDatabase() {
  try {
    const db = await getDb();
    if (!db) {
      console.warn("[Database] Cannot initialize: database not available");
      return;
    }
    
    console.log("[Database] Database initialized successfully");
  } catch (error) {
    console.error("[Database] Failed to initialize database:", error);
  }
}

export async function upsertUser(user: InsertUser): Promise<void> {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    await db.insert(users).values(user).onDuplicateKeyUpdate({ set: user });
  } else {
    if (!user.openId) {
      throw new Error("User openId is required for upsert");
    }

    const existingUser = Array.from(inMemoryData.users.values()).find(u => u.openId === user.openId);
    
    if (existingUser) {
      Object.assign(existingUser, user);
      console.log("[Database] Updated user:", existingUser);
    } else {
      const id = nextIds.users++;
      const newUser = { id, ...user, createdAt: new Date(), updatedAt: new Date() };
      inMemoryData.users.set(id, newUser);
      console.log("[Database] Created user:", newUser);
    }
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
    return result[0] || undefined;
  } else {
    const user = Array.from(inMemoryData.users.values()).find(u => u.openId === openId);
    return user || undefined;
  }
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0] || undefined;
  } else {
    return inMemoryData.users.get(id) || undefined;
  }
}

// دوال العملاء (Customers)
export async function createCustomer(data: any) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    const result = await db.insert(customers).values(data);
    return result.insertId;
  } else {
    try {
      const id = nextIds.customers++;
      const customer = { id, ...data, createdAt: new Date(), updatedAt: new Date() };
      inMemoryData.customers.set(id, customer);
      console.log("[Database] Created customer:", customer);
      return id;
    } catch (error) {
      console.error("[Database] Failed to create customer:", error);
      throw error;
    }
  }
}

export async function getCustomerByQRCode(qrCode: string) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    const result = await db.select().from(customers).where(eq(customers.qrCode, qrCode)).limit(1);
    return result[0] || undefined;
  } else {
    try {
      const customer = Array.from(inMemoryData.customers.values()).find(c => c.qrCode === qrCode);
      return customer || undefined;
    } catch (error) {
      console.error("[Database] Failed to get customer by QR code:", error);
      return undefined;
    }
  }
}

export async function getCustomerById(id: number) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    const result = await db.select().from(customers).where(eq(customers.id, id)).limit(1);
    return result[0] || undefined;
  } else {
    const customer = inMemoryData.customers.get(id);
    return customer || undefined;
  }
}

// دوال الحجوزات (Bookings)
export async function createBooking(data: any) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    const result = await db.insert(bookings).values(data);
    return result.insertId;
  } else {
    try {
      const id = nextIds.bookings++;
      const booking = { id, ...data, createdAt: new Date(), updatedAt: new Date() };
      inMemoryData.bookings.set(id, booking);
      console.log("[Database] Created booking:", booking);
      return id;
    } catch (error) {
      console.error("[Database] Failed to create booking:", error);
      throw error;
    }
  }
}

export async function getBookingsByCustomerId(customerId: number) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    return db.select().from(bookings).where(eq(bookings.customerId, customerId));
  } else {
    try {
      const bookings = Array.from(inMemoryData.bookings.values()).filter(b => b.customerId === customerId);
      return bookings;
    } catch (error) {
      console.error("[Database] Failed to get bookings:", error);
      return [];
    }
  }
}

export async function getAllBookings() {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    return db.select().from(bookings);
  } else {
    try {
      return Array.from(inMemoryData.bookings.values());
    } catch (error) {
      console.error("[Database] Failed to get all bookings:", error);
      return [];
    }
  }
}

export async function getBookingById(id: number) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    const result = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
    return result[0] || undefined;
  } else {
    try {
      const booking = inMemoryData.bookings.get(id);
      return booking || undefined;
    } catch (error) {
      console.error("[Database] Failed to get booking:", error);
      return undefined;
    }
  }
}

export async function updateBooking(id: number, data: any) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    await db.update(bookings).set(data).where(eq(bookings.id, id));
    const updatedBooking = await getBookingById(id);
    return updatedBooking;
  } else {
    try {
      const booking = inMemoryData.bookings.get(id);
      if (booking) {
        Object.assign(booking, data, { updatedAt: new Date() });
        console.log("[Database] Updated booking:", booking);
        return booking;
      }
      return undefined;
    } catch (error) {
      console.error("[Database] Failed to update booking:", error);
      throw error;
    }
  }
}

export async function deleteBooking(id: number) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    const result = await db.delete(bookings).where(eq(bookings.id, id));
    return result.rowsAffected > 0;
  } else {
    try {
      const deleted = inMemoryData.bookings.delete(id);
      console.log("[Database] Deleted booking:", id);
      return deleted;
    } catch (error) {
      console.error("[Database] Failed to delete booking:", error);
      throw error;
    }
  }
}

// دوال الفواتير (Invoices)
export async function createInvoice(data: any) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    const result = await db.insert(invoices).values(data);
    return result.insertId;
  } else {
    try {
      const id = nextIds.invoices++;
      const invoice = { id, ...data, createdAt: new Date(), updatedAt: new Date() };
      inMemoryData.invoices.set(id, invoice);
      console.log("[Database] Created invoice:", invoice);
      return id;
    } catch (error) {
      console.error("[Database] Failed to create invoice:", error);
      throw error;
    }
  }
}

export async function getInvoicesByBookingId(bookingId: number) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    return db.select().from(invoices).where(eq(invoices.bookingId, bookingId));
  } else {
    try {
      const invoices = Array.from(inMemoryData.invoices.values()).filter(i => i.bookingId === bookingId);
      return invoices;
    } catch (error) {
      console.error("[Database] Failed to get invoices:", error);
      return [];
    }
  }
}

export async function getInvoiceById(id: number) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    const result = await db.select().from(invoices).where(eq(invoices.id, id)).limit(1);
    return result[0] || undefined;
  } else {
    try {
      const invoice = inMemoryData.invoices.get(id);
      return invoice || undefined;
    } catch (error) {
      console.error("[Database] Failed to get invoice:", error);
      return undefined;
    }
  }
}

// دوال سجل العمليات (Activity Log)
export async function logActivity(data: any) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    const result = await db.insert(activityLogs).values(data);
    return result.insertId;
  } else {
    try {
      const id = nextIds.activityLogs++;
      const log = {
        id,
        userId: data.userId || 1,
        action: data.action || 'unknown',
        entityType: data.entityType || '',
        entityId: data.entityId || null,
        details: data.details || '',
        createdAt: new Date(),
      };
      inMemoryData.activityLogs.set(id, log);
      console.log("[Database] Logged activity:", log);
      return id;
    } catch (error) {
      console.error("[Database] Failed to log activity:", error);
      throw error;
    }
  }
}

export async function getActivityLogs(limit: number = 100) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    return db.select().from(activityLogs).limit(limit);
  } else {
    try {
      const logs = Array.from(inMemoryData.activityLogs.values()).slice(-limit);
      return logs;
    } catch (error) {
      console.error("[Database] Failed to get activity logs:", error);
      return [];
    }
  }
}

// دوال الملاحظات (Feedback)
export async function createFeedback(data: any) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    const result = await db.insert(feedback).values(data);
    return result.insertId;
  } else {
    try {
      const id = nextIds.feedback++;
      const feedbackRecord = { id, ...data, createdAt: new Date() };
      inMemoryData.feedback.set(id, feedbackRecord);
      console.log("[Database] Created feedback:", feedbackRecord);
      return id;
    } catch (error) {
      console.error("[Database] Failed to create feedback:", error);
      throw error;
    }
  }
}

export async function getFeedback() {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    return db.select().from(feedback);
  } else {
    try {
      return Array.from(inMemoryData.feedback.values());
    } catch (error) {
      console.error("[Database] Failed to get feedback:", error);
      return [];
    }
  }
}

// دوال محتوى QR (QR Content)
export async function createQRContent(data: any) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    const result = await db.insert(qrContent).values(data);
    return result.insertId;
  } else {
    try {
      const id = nextIds.qrContent++;
      const qr = { id, ...data, createdAt: new Date() };
      inMemoryData.qrContent.set(id, qr);
      console.log("[Database] Created QR content:", qr);
      return id;
    } catch (error) {
      console.error("[Database] Failed to create QR content:", error);
      throw error;
    }
  }
}

export async function getQRContent(qrCode: string) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    const result = await db.select().from(qrContent).where(eq(qrContent.qrCode, qrCode)).limit(1);
    return result[0] || undefined;
  } else {
    try {
      const qr = Array.from(inMemoryData.qrContent.values()).find(q => q.qrCode === qrCode);
      return qr || undefined;
    } catch (error) {
      console.error("[Database] Failed to get QR content:", error);
      return undefined;
    }
  }
}

// دوال الحزم (Packages)
export async function createPackage(data: any) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    const result = await db.insert(packages).values(data);
    return result.insertId;
  } else {
    try {
      const id = nextIds.packages++;
      const pkg = { id, ...data, createdAt: new Date(), updatedAt: new Date() };
      inMemoryData.packages.set(id, pkg);
      console.log("[Database] Created package:", pkg);
      return id;
    } catch (error) {
      console.error("[Database] Failed to create package:", error);
      throw error;
    }
  }
}

export async function getAllPackages() {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    return db.select().from(packages);
  } else {
    try {
      return Array.from(inMemoryData.packages.values());
    } catch (error) {
      console.error("[Database] Failed to get packages:", error);
      return [];
    }
  }
}

export async function getPackageById(id: number) {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    const result = await db.select().from(packages).where(eq(packages.id, id)).limit(1);
    return result[0] || undefined;
  } else {
    try {
      const pkg = inMemoryData.packages.get(id);
      return pkg || undefined;
    } catch (error) {
      console.error("[Database] Failed to get package:", error);
      return undefined;
    }
  }
}

// دالة للحصول على الإحصائيات
export async function getStatistics() {
  const db = await getDb();
  if (!db) return;

  if (ENV.databaseUrl) {
    const allBookings = await db.select().from(bookings);
    const totalBookings = allBookings.length;
    const totalRevenue = allBookings.reduce((sum, b) => sum + (parseFloat(b.price) || 0), 0);
    const confirmedBookings = allBookings.filter(b => b.status === 'confirmed').length;
    
    return {
      totalBookings,
      totalRevenue,
      confirmedBookings,
      pendingBookings: allBookings.filter(b => b.status === 'pending').length,
      completedBookings: allBookings.filter(b => b.status === 'completed').length,
      cancelledBookings: allBookings.filter(b => b.status === 'cancelled').length,
    };
  } else {
    try {
      const bookings = Array.from(inMemoryData.bookings.values());
      const totalBookings = bookings.length;
      const totalRevenue = bookings.reduce((sum, b) => sum + (parseFloat(b.price) || 0), 0);
      const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
      
      return {
        totalBookings,
        totalRevenue,
        confirmedBookings,
        pendingBookings: bookings.filter(b => b.status === 'pending').length,
        completedBookings: bookings.filter(b => b.status === 'completed').length,
        cancelledBookings: bookings.filter(b => b.status === 'cancelled').length,
      };
    } catch (error) {
      console.error("[Database] Failed to get statistics:", error);
      return {
        totalBookings: 0,
        totalRevenue: 0,
        confirmedBookings: 0,
        pendingBookings: 0,
        completedBookings: 0,
        cancelledBookings: 0,
      };
    }
  }
}
