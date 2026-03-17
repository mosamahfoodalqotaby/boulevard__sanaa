# إعداد بوليفارد صنعاء - التطوير المحلي

## المتطلبات الأساسية

- **Node.js**: الإصدار 18 أو أحدث
- **npm** أو **pnpm**: مدير الحزم
- **قاعدة بيانات**: MySQL 8.0+ أو PostgreSQL 12+

## خطوات الإعداد

### 1. استخراج المشروع

```bash
tar -xzf boulevard-sanaa.tar.gz
cd boulevard-sanaa
```

### 2. تثبيت المتعلقات

```bash
npm install
# أو
pnpm install
```

### 3. إعداد متغيرات البيئة

انسخ `.env.example` إلى `.env.local`:

```bash
cp .env.example .env.local
```

ثم عدّل `.env.local` بالقيم الصحيحة:

```env
# قاعدة البيانات (مثال MySQL)
DATABASE_URL=mysql://root:password@localhost:3306/boulevard_sanaa

# OAuth (استخدم قيم وهمية للتطوير المحلي)
OAUTH_SERVER_URL=http://localhost:3000
VITE_OAUTH_PORTAL_URL=http://localhost:3000
VITE_APP_ID=local_dev_app_id

# JWT Secret
JWT_SECRET=your_local_dev_secret_key_here

# Owner Info
OWNER_OPEN_ID=local_owner_id
OWNER_NAME=مدير محلي

# Forge API (استخدم قيم وهمية)
BUILT_IN_FORGE_API_URL=http://localhost:3000
BUILT_IN_FORGE_API_KEY=local_dev_key
VITE_FRONTEND_FORGE_API_URL=http://localhost:3000
VITE_FRONTEND_FORGE_API_KEY=local_dev_key

# App Config
VITE_APP_TITLE=بوليفارد صنعاء - Boulevard Sanaa
VITE_APP_LOGO=

# Node Environment
NODE_ENV=development
```

### 4. إعداد قاعدة البيانات

#### أ) إنشاء قاعدة البيانات

```bash
# MySQL
mysql -u root -p
CREATE DATABASE boulevard_sanaa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

#### ب) تشغيل Migrations

```bash
# توليد migration من schema
pnpm drizzle-kit generate

# تطبيق migration على قاعدة البيانات
pnpm drizzle-kit push
```

### 5. تشغيل المشروع

```bash
npm run dev
# أو
pnpm dev
```

سيتم تشغيل المشروع على `http://localhost:3000`

## استكشاف الأخطاء

### ❌ خطأ: "Database not available"

**الحل:**
1. تأكد من أن قاعدة البيانات تعمل
2. تحقق من `DATABASE_URL` في `.env.local`
3. شغّل migrations: `pnpm drizzle-kit push`

### ❌ خطأ: "OAUTH_SERVER_URL is not configured"

**الحل:**
تأكد من تعيين `OAUTH_SERVER_URL` في `.env.local`

### ❌ خطأ: "VITE_ANALYTICS_ENDPOINT is not defined"

**الحل:**
هذا الخطأ تم إصلاحه في آخر نسخة. إذا استمر:
1. احذف `node_modules` و `dist`
2. شغّل `npm install` مجدداً
3. شغّل `npm run dev`

### ❌ خطأ: "Error creating booking"

**الحل:**
1. تأكد من اتصال قاعدة البيانات
2. تأكد من تشغيل migrations
3. تحقق من السجلات للأخطاء التفصيلية

## الميزات الرئيسية

✅ **الصفحة الرئيسية** - معرض صور فاخر  
✅ **نظام الحجز** - إنشاء وإدارة الحجوزات  
✅ **لوحة التحكم الإدارية** - إدارة الحجوزات والمديرين  
✅ **طباعة PDF** - تصدير الحجوزات بصيغة PDF احترافية  
✅ **QR Code** - توليد وطباعة رموز QR  
✅ **WhatsApp Integration** - مشاركة الحجوزات عبر WhatsApp  
✅ **خريطة تفاعلية** - عرض موقع الفندق  

## البيانات الاختبارية

يمكنك إنشاء حجز اختباري من خلال:
1. الذهاب إلى `/admin`
2. تسجيل الدخول كمدير
3. ملء نموذج الحجز
4. النقر على "حفظ الحجز"

## الملفات المهمة

```
boulevard-sanaa/
├── client/                  # واجهة المستخدم (React)
│   ├── src/
│   │   ├── pages/          # الصفحات
│   │   ├── components/     # المكونات
│   │   └── lib/            # الأدوات والمساعدات
│   └── index.html          # HTML الرئيسي
├── server/                  # الخادم (Express + tRPC)
│   ├── routers.ts          # API endpoints
│   └── db.ts               # دوال قاعدة البيانات
├── drizzle/                # قاعدة البيانات
│   └── schema.ts           # تعريف الجداول
└── .env.local              # متغيرات البيئة المحلية
```

## الدعم والمساعدة

للمزيد من المعلومات، راجع:
- [README.md](./README.md) - نظرة عامة على المشروع
- [Drizzle ORM Docs](https://orm.drizzle.team/) - توثيق قاعدة البيانات
- [tRPC Docs](https://trpc.io/) - توثيق API

---

**ملاحظة:** هذه التعليمات للتطوير المحلي فقط. للنشر في الإنتاج، استخدم منصة Manus.
