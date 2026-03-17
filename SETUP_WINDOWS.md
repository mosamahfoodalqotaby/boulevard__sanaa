# دليل الإعداد على Windows - بوليفارد صنعاء

## المتطلبات الأساسية

### 1. تثبيت Node.js
- اذهب إلى [nodejs.org](https://nodejs.org/)
- حمل النسخة LTS (Long Term Support)
- ثبت البرنامج واتبع التعليمات

### 2. تثبيت Python (مطلوب لـ better-sqlite3)
- اذهب إلى [python.org](https://python.org/)
- حمل Python 3.8 أو أحدث
- **أثناء التثبيت، تأكد من تحديد "Add Python to PATH"**

### 3. تثبيت Visual Studio Build Tools (مطلوب لـ better-sqlite3)
```bash
# افتح PowerShell كمسؤول وشغل:
npm install --global windows-build-tools
```

أو قم بتحميل [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/) يدويًا

---

## خطوات الإعداد

### الخطوة 1: استخراج المشروع
```bash
# استخرج ملف boulevard-sanaa.tar.gz
# استخدم 7-Zip أو WinRAR أو أي برنامج ضغط

# انتقل إلى مجلد المشروع
cd boulevard-sanaa
```

### الخطوة 2: تثبيت المكتبات
```bash
# تثبيت جميع المكتبات المطلوبة
npm install

# إذا واجهت مشكلة، جرب:
npm install --legacy-peer-deps
```

### الخطوة 3: إنشاء ملف البيئة
أنشئ ملف باسم `.env.local` في جذر المشروع:

```env
# قاعدة البيانات
DATABASE_URL=sqlite:./dev.db

# OAuth (للإنتاج فقط)
OAUTH_SERVER_URL=https://api.manus.im
VITE_APP_ID=dev_app_id
JWT_SECRET=dev_secret_key

# معلومات المالك
OWNER_NAME=بوليفارد صنعاء
OWNER_OPEN_ID=owner_123
```

### الخطوة 4: تشغيل المشروع
```bash
# شغل خادم التطوير
npm run dev
```

**النتيجة المتوقعة:**
```
Server running on http://localhost:3000/
```

---

## حل المشاكل الشائعة

### ❌ خطأ: "Cannot find module 'better-sqlite3'"

**السبب**: لم يتم تثبيت المكتبة بشكل صحيح

**الحل**:
```bash
# 1. احذف المجلدات
rmdir /s /q node_modules
del package-lock.json

# 2. أعد التثبيت
npm install

# 3. إذا استمرت المشكلة، ثبت يدويًا:
npm install better-sqlite3 --build-from-source
```

### ❌ خطأ: "Python not found"

**السبب**: Python غير مثبت أو غير في PATH

**الحل**:
1. تحقق من تثبيت Python: `python --version`
2. إذا لم يعمل، أعد تثبيت Python مع تحديد "Add Python to PATH"
3. أعد تشغيل PowerShell بعد التثبيت

### ❌ خطأ: "Port 3000 is already in use"

**السبب**: هناك برنامج آخر يستخدم المنفذ 3000

**الحل**:
```bash
# استخدم منفذ مختلف
set PORT=3001
npm run dev

# أو أغلق البرنامج الذي يستخدم المنفذ 3000
```

### ❌ خطأ: "Database not available"

**السبب**: قاعدة البيانات لم تُهيأ بشكل صحيح

**الحل**:
```bash
# احذف ملف قاعدة البيانات القديم
del dev.db

# أعد تشغيل المشروع (سيُنشئ ملف جديد)
npm run dev
```

### ❌ خطأ: "EACCES: permission denied"

**السبب**: مشكلة في الصلاحيات

**الحل**:
```bash
# شغل PowerShell كمسؤول
# ثم أعد التثبيت
npm install
```

---

## اختبار إنشاء حجز

### الخطوة 1: فتح التطبيق
اذهب إلى: `http://localhost:3000/bookings`

### الخطوة 2: إضافة حجز جديد
انقر على زر "إضافة حجز جديد" وملء البيانات:

```
الاسم: أحمد محمد
الهاتف: 967123456789
نوع الخدمة: شاليه
تاريخ الحجز: 2026-03-15
عدد الضيوف: 5
السعر الإجمالي: 2500
```

### الخطوة 3: التحقق من الحفظ
- ستظهر رسالة نجاح
- سيظهر الحجز في القائمة
- يمكنك طباعة الحجز كـ PDF

---

## الأوامر المهمة

| الأمر | الوصف |
|------|-------|
| `npm run dev` | تشغيل خادم التطوير |
| `npm run build` | بناء المشروع للإنتاج |
| `npm test` | تشغيل الاختبارات |
| `npm run lint` | فحص الكود |
| `npm run format` | تنسيق الكود |

---

## الملفات المهمة

```
boulevard-sanaa/
├── client/                    # واجهة المستخدم
│   ├── src/
│   │   ├── pages/            # الصفحات
│   │   ├── components/       # المكونات
│   │   └── App.tsx           # التطبيق الرئيسي
│   └── index.html            # ملف HTML الرئيسي
├── server/                    # الخادم
│   ├── db.ts                 # دوال قاعدة البيانات
│   ├── routers.ts            # API endpoints
│   └── _core/                # الملفات الأساسية
├── drizzle/                   # قاعدة البيانات
│   └── schema.ts             # هيكل الجداول
├── dev.db                     # ملف قاعدة البيانات SQLite
├── package.json              # المكتبات المطلوبة
└── .env.local                # متغيرات البيئة
```

---

## نصائح مهمة ⭐

1. **احفظ البيانات**: انسخ ملف `dev.db` قبل حذفه
2. **استخدم الإصدار الصحيح من Node**: استخدم v18 أو أحدث
3. **تحديث المكتبات**: شغل `npm update` بانتظام
4. **حل المشاكل**: افتح console المتصفح (F12) وتحقق من الأخطاء
5. **الأداء**: قاعدة البيانات SQLite مناسبة للتطوير فقط

---

## الدعم

إذا واجهت مشكلة:
1. تحقق من أن جميع المتطلبات مثبتة
2. افتح console المتصفح (F12) وابحث عن الأخطاء
3. تحقق من ملف السجل: `.manus-logs/devserver.log`
4. أعد تشغيل المشروع: `npm run dev`

---

**آخر تحديث**: مارس 2026
**الإصدار**: 1.0.0
