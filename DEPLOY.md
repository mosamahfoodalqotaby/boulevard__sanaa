# دليل استضافة مشروع Boulevard Sanaa على Railway

هذا الدليل يوضح كيفية استضافة مشروع Boulevard Sanaa (المبني باستخدام React, TypeScript, Node.js, Drizzle ORM) على منصة Railway.

## المتطلبات الأساسية

1.  **حساب Railway:** تأكد من أن لديك حسابًا على [Railway.app](https://railway.app/).
2.  **Git:** مثبت على جهازك.
3.  **CLI Railway (اختياري ولكن موصى به):** يمكنك تثبيته باستخدام `npm i -g @railway/cli`.

## خطوات النشر

### 1. إعداد المشروع محليًا

تأكد من أن مشروعك يعمل بشكل صحيح محليًا وأن جميع التبعيات مثبتة.

```bash
cd boulevard-sanaa
pnpm install # أو npm install أو yarn install
```

### 2. إنشاء مستودع Git

إذا لم يكن مشروعك في مستودع Git بالفعل، قم بإنشاء واحد:

```bash
git init
git add .
git commit -m "Initial commit"
```

ثم قم بإنشاء مستودع جديد على GitHub أو GitLab أو أي خدمة Git أخرى وادفع الكود إليه.

### 3. إنشاء مشروع جديد على Railway

#### الخيار الأول: استخدام واجهة Railway (الموصى به للمبتدئين)

1.  اذهب إلى [Dashboard Railway](https://railway.app/dashboard).
2.  انقر على `New Project`.
3.  اختر `Deploy from Git Repo`.
4.  قم بربط حسابك على GitHub/GitLab (إذا لم تكن قد فعلت ذلك بالفعل).
5.  اختر المستودع الخاص بمشروع `boulevard-sanaa`.
6.  سيقوم Railway تلقائيًا باكتشاف نوع المشروع (Node.js) وبدء عملية النشر.

#### الخيار الثاني: استخدام Railway CLI

1.  افتح الطرفية في مجلد مشروعك `boulevard-sanaa`.
2.  سجل الدخول إلى Railway:
    ```bash
    railway login
    ```
3.  أنشئ مشروعًا جديدًا:
    ```bash
    railway init
    ```
    اتبع التعليمات لربط مشروعك بمستودع Git الخاص بك.
4.  انشر المشروع:
    ```bash
    railway up
    ```

### 4. إعداد قاعدة البيانات (MySQL/TiDB)

مشروعك يستخدم Drizzle ORM مع MySQL. Railway يوفر خدمات قواعد بيانات مدمجة.

1.  في لوحة تحكم مشروعك على Railway، انقر على `New` ثم `Database`.
2.  اختر `MySQL`.
3.  سيقوم Railway بإنشاء قاعدة بيانات MySQL جديدة وتوفير متغيرات البيئة الخاصة بها (مثل `MYSQL_URL`, `MYSQL_USERNAME`, `MYSQL_PASSWORD`, `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_DATABASE`).
4.  **هام:** ستحتاج إلى ربط هذه المتغيرات بمتغير `DATABASE_URL` في مشروعك. يمكنك القيام بذلك عن طريق إضافة متغير جديد في Railway باسم `DATABASE_URL` وقيمته ستكون بناءً على متغيرات MySQL التي يوفرها Railway:
    ```
    DATABASE_URL=mysql://${MYSQL_USERNAME}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}
    ```
    تأكد من استبدال `MYSQL_USERNAME`, `MYSQL_PASSWORD`, `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_DATABASE` بالمتغيرات الفعلية التي يوفرها Railway لقاعدة بيانات MySQL الخاصة بك.

### 5. إعداد متغيرات البيئة (Environment Variables)

في لوحة تحكم مشروعك على Railway:

1.  اذهب إلى قسم `Variables`.
2.  أضف المتغيرات التالية (الموجودة في ملف `.env` المحلي الخاص بك) وتأكد من تعيين قيمها الصحيحة:
    *   `VITE_APP_ID`: `boulevard-sanaa-app` (أو أي معرف تفضله)
    *   `JWT_SECRET`: **مهم جدًا:** قم بإنشاء سلسلة عشوائية قوية جدًا لهذا المتغير (مثال: `openssl rand -base64 32`).
    *   `NODE_ENV`: `production`
    *   `VITE_PUBLIC_URL`: عنوان URL الخاص بتطبيقك على Railway (مثال: `https://your-railway-app-domain.railway.app`).
    *   `OAUTH_SERVER_URL`: (إذا كنت تستخدم Manus OAuth، وإلا يمكن تركه فارغًا)
    *   `OWNER_OPEN_ID`: (إذا كنت تستخدم Manus OAuth، وإلا يمكن تركه فارغًا)
    *   `BUILT_IN_FORGE_API_URL`: (إذا كنت تستخدم Forge API، وإلا يمكن تركه فارغًا)
    *   `BUILT_IN_FORGE_API_KEY`: (إذا كنت تستخدم Forge API، وإلا يمكن تركه فارغًا)

    **ملاحظة:** Railway سيتعامل تلقائيًا مع متغير `PORT`، لذا لا تحتاج إلى تعيينه يدويًا.

### 6. أوامر البناء والنشر (Build and Deploy Commands)

عادةً ما يكتشف Railway أوامر البناء والنشر تلقائيًا من `package.json` الخاص بك. ومع ذلك، إذا واجهت مشكلات، يمكنك تحديدها يدويًا في إعدادات الخدمة على Railway:

*   **Build Command:** `pnpm install && pnpm build` (أو `npm install && npm run build`)
*   **Start Command:** `pnpm start` (أو `npm start`)

تأكد من أن `package.json` يحتوي على السكريبتات المناسبة:

```json
{
  "name": "boulevard-sanaa",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "pnpm run start:client & pnpm run start:server",
    "start:client": "vite",
    "start:server": "tsx watch server/index.ts",
    "build": "pnpm run build:client && pnpm run build:server",
    "build:client": "vite build --outDir dist/client",
    "build:server": "tsc --project tsconfig.server.json --outDir dist/server",
    "start": "node dist/server/index.js",
    "test": "vitest",
    "drizzle:generate": "drizzle-kit generate:mysql",
    "drizzle:migrate": "tsx server/migrate.ts",
    "drizzle:push": "drizzle-kit push:mysql",
    "drizzle:studio": "drizzle-kit studio"
  },
  "dependencies": {
    "@headlessui/react": "^1.7.18",
    "@heroicons/react": "^2.1.1",
    "@manus.dev/oauth-client": "^0.0.10",
    "@manus.dev/oauth-server": "^0.0.10",
    "@manus.dev/storage": "^0.0.10",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-aspect-ratio": "^1.0.3",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-collapsible": "^1.0.3",
    "@radix-ui/react-context-menu": "^2.1.5",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-hover-card": "^1.0.7",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-menubar": "^1.0.4",
    "@radix-ui/react-navigation-menu": "^1.1.4",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-resizable": "^1.0.6",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-select": "^1.2.2",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@tanstack/react-query": "^5.17.19",
    "@trpc/client": "^10.45.0",
    "@trpc/react-query": "^10.45.0",
    "@trpc/server": "^10.45.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "cookie-parser": "^1.4.6",
    "drizzle-orm": "^0.29.3",
    "drizzle-zod": "^0.5.1",
    "express": "^4.18.2",
    "js-cookie": "^3.0.5",
    "lucide-react": "^0.312.0",
    "nanoid": "^5.0.5",
    "mysql2": "^3.7.0",
    "qrcode.react": "^3.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "sonner": "^1.3.1",
    "tailwind-merge": "^2.2.0",
    "tailwindcss-animate": "^1.0.7",
    "wouter": "^2.12.1",
    "zod": "^3.22.4",
    "zustand": "^4.4.7"
  },
  "devDependencies": {
    "@types/cookie-parser": "^1.4.6",
    "@types/express": "^4.17.21",
    "@types/js-cookie": "^3.0.6",
    "@types/node": "^20.11.5",
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.17",
    "drizzle-kit": "^0.20.13",
    "postcss": "^8.4.33",
    "tailwindcss": "^3.4.1",
    "ts-node": "^10.9.2",
    "tsx": "^4.7.0",
    "typescript": "^5.3.3",
    "vite": "^5.0.11",
    "vitest": "^1.2.1"
  }
}
```

### 7. ترحيل قاعدة البيانات (Database Migrations)

بعد نشر مشروعك وربط قاعدة البيانات، ستحتاج إلى تشغيل ترحيلات Drizzle ORM لإنشاء الجداول في قاعدة بيانات Railway.

يمكنك القيام بذلك بإحدى الطرق التالية:

*   **يدويًا عبر CLI:** بعد نشر مشروعك، يمكنك الاتصال بـ Railway CLI وتشغيل أمر الترحيل:
    ```bash
    railway run pnpm drizzle:migrate
    ```
    (تأكد من أن `drizzle:migrate` سكريبت موجود في `package.json` الخاص بك ويقوم بتشغيل ملف الترحيل الصحيح، مثل `tsx server/migrate.ts`).
*   **تلقائيًا (متقدم):** يمكنك إعداد خطاف (hook) في Railway لتشغيل أمر الترحيل بعد كل نشر ناجح. هذا يتطلب فهمًا أعمق لـ Railway hooks.

### 8. الوصول إلى التطبيق

بعد اكتمال النشر بنجاح، سيوفر لك Railway عنوان URL لتطبيقك. يمكنك الوصول إليه من لوحة تحكم المشروع.

## استكشاف الأخطاء وإصلاحها

*   **فشل البناء:** تحقق من سجلات البناء (Build Logs) في Railway لمعرفة الأخطاء. تأكد من أن جميع التبعيات مثبتة بشكل صحيح وأن أوامر البناء صحيحة.
*   **فشل التشغيل:** تحقق من سجلات التشغيل (Deploy Logs) في Railway. قد تكون هناك مشكلات في متغيرات البيئة أو في كود الخادم.
*   **مشاكل قاعدة البيانات:** تأكد من أن `DATABASE_URL` صحيح وأن قاعدة البيانات تعمل بشكل صحيح. قد تحتاج إلى تشغيل الترحيلات يدويًا.

--- 

**ملاحظة:** هذا الدليل يفترض أنك تستخدم `pnpm` كمدير حزم. إذا كنت تستخدم `npm` أو `yarn`، فاستبدل الأوامر المناسبة.
