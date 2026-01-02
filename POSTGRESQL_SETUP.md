# 🗄️ خطوات إعداد PostgreSQL

## الخطوة 1: التحقق من تثبيت PostgreSQL

افتح PowerShell **كمسؤول** (Run as Administrator) وجرب:

```powershell
psql --version
```

### إذا ظهر رقم الإصدار ✅
- PostgreSQL مثبت! كمل للخطوة 2

### إذا ظهر خطأ "psql is not recognized" ❌

**الحل:** PostgreSQL غير مثبت. اختر واحد:

#### أ) تحميل PostgreSQL (15-20 دقيقة)
1. حمل من: https://www.postgresql.org/download/windows/
2. شغل الـ Installer
3. اختر كلمة مرور قوية للـ postgres user (احفظها!)
4. بعد التثبيت، ارجع للخطوة 1

#### ب) استخدام Supabase بدلاً (5 دقائق - أسهل!)
- راجع ملف `NEXT_STEPS.md` - الخيار 2

---

## الخطوة 2: إنشاء قاعدة البيانات

في PowerShell كمسؤول:

```powershell
# الدخول لـ PostgreSQL
psql -U postgres

# سيطلب منك كلمة المرور - اكتبها واضغط Enter
```

بعد الدخول، شغل:

```sql
CREATE DATABASE vines_trading;
\q
```

---

## الخطوة 3: تشغيل السكيما (Database Schema)

```powershell
cd g:\trade\backend
psql -U postgres -d vines_trading -f db/schema.sql
```

سيطلب كلمة المرور مرة أخرى.

---

## الخطوة 4: تحديث ملف .env

افتح ملف `g:\trade\backend\.env` وتأكد من:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vines_trading
DB_USER=postgres
DB_PASSWORD=كلمة_المرور_اللي_حطيتها
```

⚠️ **مهم جداً:** ضع كلمة المرور الصحيحة!

---

## الخطوة 5: ملء البيانات (Seed)

```powershell
cd g:\trade\backend
npm run seed
```

سيضيف:
- ✅ 6 فئات
- ✅ 24 منتج

---

## الخطوة 6: تشغيل المشروع

**Terminal 1 - Backend:**
```powershell
cd g:\trade\backend
npm run dev
```

انتظر حتى ترى: `🚀 Server running on http://localhost:5000`

**Terminal 2 - Frontend:**
```powershell
cd g:\trade\frontend
npm run dev
```

---

## 🎯 بعد التشغيل

افتح: http://localhost:5173

---

## ❌ مشكلة؟

إذا صعب عليك PostgreSQL، **بديل سهل:**
- استخدم Supabase (مجاني، 5 دقائق فقط)
- أو أحول المشروع لـ SQLite

أخبرني إذا واجهتك أي مشكلة! 🚀
