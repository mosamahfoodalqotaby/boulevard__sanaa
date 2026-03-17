# البدء السريع - بوليفارد صنعاء

## 🚀 التشغيل السريع

### الخطوة 1: استخراج المشروع
```bash
tar -xzf boulevard-sanaa.tar.gz
cd boulevard-sanaa
```

### الخطوة 2: تثبيت المتعلقات
```bash
npm install
```

### الخطوة 3: إعداد قاعدة البيانات

**اختر أحد الخيارات:**

#### ✅ الخيار 1: استخدام SQLite (الأسهل للتطوير)
```bash
# لا تحتاج إلى إعداد إضافي
# فقط شغّل المشروع
npm run dev
```

#### ✅ الخيار 2: استخدام MySQL
```bash
# 1. أنشئ قاعدة البيانات
mysql -u root -p
CREATE DATABASE boulevard_sanaa;
EXIT;

# 2. عدّل DATABASE_URL في .env.local
# DATABASE_URL=mysql://root:password@localhost:3306/boulevard_sanaa

# 3. شغّل migrations
pnpm drizzle-kit push

# 4. شغّل المشروع
npm run dev
```

### الخطوة 4: الوصول إلى التطبيق
```
🌐 http://localhost:3000
```

---

## 📋 متغيرات البيئة المطلوبة

أنشئ ملف `.env.local` بهذا المحتوى:

```env
# قاعدة البيانات
DATABASE_URL=sqlite:./dev.db

# OAuth (استخدم قيم وهمية للتطوير)
OAUTH_SERVER_URL=http://localhost:3000
VITE_OAUTH_PORTAL_URL=http://localhost:3000
VITE_APP_ID=dev_app_id

# JWT Secret
JWT_SECRET=dev_secret_key_change_in_production

# Owner Info
OWNER_OPEN_ID=dev_owner_id
OWNER_NAME=مدير محلي

# Forge API
BUILT_IN_FORGE_API_URL=http://localhost:3000
BUILT_IN_FORGE_API_KEY=dev_key
VITE_FRONTEND_FORGE_API_URL=http://localhost:3000
VITE_FRONTEND_FORGE_API_KEY=dev_key

# App Config
VITE_APP_TITLE=بوليفارد صنعاء - Boulevard Sanaa
VITE_APP_LOGO=

# Environment
NODE_ENV=development
```

---

## ⚠️ الأخطاء الشائعة والحلول

### ❌ "Database not available"
```bash
# الحل:
pnpm drizzle-kit push
npm run dev
```

### ❌ "OAUTH_SERVER_URL is not configured"
```bash
# تأكد من وجود OAUTH_SERVER_URL في .env.local
OAUTH_SERVER_URL=http://localhost:3000
```

### ❌ "Cannot find module"
```bash
# الحل:
rm -rf node_modules
npm install
npm run dev
```

### ❌ "Port 3000 is already in use"
```bash
# استخدم port مختلف:
PORT=3001 npm run dev
```

---

## 🎯 الميزات الرئيسية

| الميزة | الوصول |
|--------|--------|
| 🏠 الصفحة الرئيسية | http://localhost:3000 |
| 📋 الحجوزات | http://localhost:3000/bookings |
| 🔐 لوحة التحكم | http://localhost:3000/admin |
| 📍 الموقع | http://localhost:3000/location |
| 📱 QR Scanner | http://localhost:3000/qr-code-scanner |

---

## 📝 إنشاء حجز اختباري

1. اذهب إلى http://localhost:3000/admin
2. ملء نموذج الحجز:
   - الاسم: أحمد محمد
   - الهاتف: +967 123 456 789
   - نوع الخدمة: شاليه فاخر
   - تاريخ الوصول: اختر تاريخ
   - عدد الضيوف: 10
   - المبلغ المدفوع: 5000
   - المبلغ المتبقي: 2500
3. انقر "حفظ الحجز"
4. انقر "طباعة PDF" لعرض الفاتورة

---

## 🛠️ الأوامر المفيدة

```bash
# تشغيل المشروع
npm run dev

# بناء للإنتاج
npm run build

# تشغيل الاختبارات
npm run test

# توليد migrations
pnpm drizzle-kit generate

# تطبيق migrations
pnpm drizzle-kit push

# عرض قاعدة البيانات
pnpm drizzle-kit studio
```

---

## 📚 المراجع

- [SETUP_LOCAL.md](./SETUP_LOCAL.md) - تعليمات إعداد تفصيلية
- [README.md](./README.md) - نظرة عامة على المشروع
- [Drizzle ORM](https://orm.drizzle.team/) - توثيق قاعدة البيانات
- [tRPC](https://trpc.io/) - توثيق API

---

## ❓ هل تحتاج إلى مساعدة؟

إذا واجهت مشاكل:
1. تحقق من [SETUP_LOCAL.md](./SETUP_LOCAL.md)
2. تأكد من تثبيت جميع المتعلقات
3. تحقق من متغيرات البيئة
4. جرّب حذف `node_modules` وإعادة التثبيت

---

**مرحباً بك في بوليفارد صنعاء! 🎉**
