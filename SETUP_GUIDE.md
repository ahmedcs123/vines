# 🚀 دليل الإعداد السريع - The Vines Trading Setup Guide

## ✅ ما تم إنجازه

تم إنشاء جميع ملفات المشروع بنجاح! المشروع يتكون من:

### Backend (Node.js + Express + PostgreSQL) ✓
- ✅ Server configuration
- ✅ Database schema & connection
- ✅ API routes (Products, Categories, Auth)
- ✅ File upload system
- ✅ Database seed script with all products

### Frontend (React + Vite + Tailwind) ✓
- ✅ React application setup
- ✅ Bilingual support (EN/AR with RTL)
- ✅ All pages (Home, Products, Contact, Admin)
- ✅ All components (Navbar, Footer, ProductCard, etc.)
- ✅ API integration

---

## 📋 الخطوات التالية - Next Steps

### الخطوة 1️⃣: تثبيت PostgreSQL

**هل لديك PostgreSQL مثبت؟**
- إذا لا، حمله من: https://www.postgresql.org/download/
- أو استخدم XAMPP/WAMP الذي يحتوي على PostgreSQL

**بدائل سهلة إذا لم يكن لديك PostgreSQL:**
- استخدم **Supabase** (مجاني - يعطيك PostgreSQL في السحابة)
- استخدم **ElephantSQL** (مجاني - قاعدة بيانات PostgreSQL مجانية)

---

### الخطوة 2️⃣: إنشاء قاعدة البيانات

افتح PowerShell كمسؤول (Run as Administrator) وقم بتشغيل:

```powershell
# تسجيل الدخول إلى PostgreSQL
psql -U postgres

# إنشاء قاعدة البيانات
CREATE DATABASE vines_trading;

# الخروج
\q
```

ثم قم بتشغيل السكيما:
```powershell
cd g:\trade\backend
psql -U postgres -d vines_trading -f db/schema.sql
```

---

### الخطوة 3️⃣: تحديث إعدادات قاعدة البيانات

افتح ملف `backend/.env.example` وقم بنسخه إلى `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vines_trading
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE
```

⚠️ **مهم**: ضع كلمة مرور PostgreSQL الخاصة بك

---

### الخطوة 4️⃣: تثبيت المكتبات

افتح **PowerShell** في مجلد المشروع:

```powershell
# Backend Dependencies
cd g:\trade\backend
npm install

# Frontend Dependencies
cd g:\trade\frontend
npm install
```

---

### الخطوة 5️⃣: ملء قاعدة البيانات بالبيانات الأولية

```powershell
cd g:\trade\backend
npm run seed
```

سيقوم هذا بإضافة:
- ✅ 6 فئات (Categories)
- ✅ 24 منتج (Products)

---

### الخطوة 6️⃣: تشغيل المشروع

**Terminal 1 - Backend:**
```powershell
cd g:\trade\backend
npm run dev
```
سيعمل على: http://localhost:5000

**Terminal 2 - Frontend:**
```powershell
cd g:\trade\frontend
npm run dev
```
سيعمل على: http://localhost:5173

---

## 🔐 معلومات تسجيل الدخول للأدمن

- **Username:** `admin`
- **Password:** `vines2024`

الرابط: http://localhost:5173/admin

---

## 🌐 للنشر على Hostinger

### خيار 1: استخدام PostgreSQL على Hostinger

1. أنشئ قاعدة بيانات PostgreSQL من لوحة التحكم
2. ارفع ملفات `backend` عبر FTP
3. حدّث ملف `.env` ببيانات قاعدة البيانات
4. شغل الباك إند من Node.js App Manager
5. اعمل Build للفرونت إند:
   ```powershell
   cd g:\trade\frontend
   npm run build
   ```
6. ارفع محتويات مجلد `dist` إلى `public_html`

### خيار 2: استخدام Supabase (أسهل ومجاني)

1. أنشئ حساب مجاني على https://supabase.com
2. أنشئ مشروع جديد
3. استيراد السكيما من `backend/db/schema.sql`
4. احصل على رابط قاعدة البيانات
5. حدّث `.env` بالرابط من Supabase
6. انشر الباك إند على Render.com (مجاني)
7. انشر الفرونت إند على Netlify/Vercel (مجاني)

---

## 📁 هيكل المشروع

```
trade/
├── backend/           (Node.js API)
│   ├── db/           (Database files)
│   ├── routes/       (API endpoints)
│   ├── scripts/      (Seed script)
│   ├── uploads/      (Product images)
│   └── server.js     (Main server)
│
├── frontend/          (React App)
│   ├── src/
│   │   ├── components/  (UI Components)
│   │   ├── pages/       (Pages)
│   │   └── services/    (API calls)
│   └── dist/         (Build output)
│
└── README.md
```

---

## ❓ مشاكل شائعة وحلولها

### ❌ Error: PostgreSQL connection failed
**الحل:** تأكد من:
- PostgreSQL يعمل (خدمات Windows)
- كلمة المرور صحيحة في `.env`
- اسم قاعدة البيانات صحيح

### ❌ Error: Cannot find module 'express'
**الحل:** 
```powershell
cd backend
npm install
```

### ❌ Frontend لا يتصل بالـ Backend
**الحل:** تأكد من:
- Backend يعمل على http://localhost:5000
- ملف `frontend/.env` يحتوي على `VITE_API_URL=http://localhost:5000/api`

---

## 📞 اتصل بنا

إذا واجهت أي مشكلة، يمكنك:
1. فحص ملف `README.md` للتفاصيل الكاملة
2. التواصل معنا

---

## 🎉 بعد التشغيل

1. افتح http://localhost:5173
2. استعرض المنتجات
3. جرّب البحث والفلترة
4. بدّل اللغة بين EN/AR
5. سجّل دخول للأدمن: http://localhost:5173/admin
6. أضف منتجات جديدة

**ملاحظة:** جميع 24 منتج مع 6 فئات موجودة مسبقاً من السكريبت!
