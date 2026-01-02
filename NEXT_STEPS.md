# ⚠️ خطوات تشغيل المشروع

## ✅ تم الانتهاء من:
1. ✅ تثبيت Backend dependencies
2. ✅ تثبيت Frontend dependencies

---

## 📌 الخطوات المتبقية:

### الخطوة 1: إعداد PostgreSQL

**لديك 3 خيارات:**

#### الخيار 1: استخدام PostgreSQL المثبت على جهازك

إذا كان PostgreSQL مثبت، افتح PowerShell كمسؤول وشغل:

```powershell
# الدخول لـ PostgreSQL
psql -U postgres

# إنشاء قاعدة البيانات
CREATE DATABASE vines_trading;

# الخروج
\q

# تشغيل السكيما
cd g:\trade\backend
psql -U postgres -d vines_trading -f db/schema.sql

# ملء البيانات الأولية (6 فئات + 24 منتج)
npm run seed
```

#### الخيار 2: استخدام Supabase (مجاني - الأسهل!)

1. اذهب لـ https://supabase.com
2. أنشئ حساب مجاني
3. أنشئ مشروع جديد
4. من SQL Editor، شغل محتوى ملف `backend/db/schema.sql`
5. احصل على Connection String من Project Settings
6. حدّث ملف `backend/.env`:
```env
DB_HOST=db.xxx.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_supabase_password
```
7. شغل: `npm run seed` من مجلد backend

#### الخيار 3: SQLite بدلاً من PostgreSQL (الأسرع للتجربة)

إذا تريد تجربة سريعة بدون PostgreSQL، ممكن أحول المشروع لـ SQLite (أخبرني)

---

### الخطوة 2: تشغيل المشروع

بعد إعداد قاعدة البيانات:

**Terminal 1 - Backend:**
```powershell
cd g:\trade\backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd g:\trade\frontend
npm run dev
```

---

## 🎯 بعد التشغيل:

- **الموقع:** http://localhost:5173
- **الأدمن:** http://localhost:5173/admin
  - Username: `admin`
  - Password: `vines2024`

---

## ❓ أي خيار تفضل؟

1. **PostgreSQL محلي** (إذا مثبت عندك)
2. **Supabase** (مجاني في السحابة - أسهل!)
3. **SQLite** (أسرع للتجربة، بدون PostgreSQL)

أخبرني أي واحد تفضل وأكمل معك! 🚀
