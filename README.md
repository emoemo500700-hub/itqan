# تفعيل رسالة التأكيد بالبريد (خطوة واحدة مطلوبة منك)

سبب أن تسجيل الدخول لا يرسل رسالة: ملف `config.js` لم يكن موجوداً في المستودع، فيعمل الموقع بوضع تجريبي محلي.

1. أنشئ مشروعاً مجانياً في supabase.com
2. SQL Editor ← الصق محتوى `supabase-setup.sql` ← Run
3. Authentication ← URL Configuration:
   - Site URL: `https://itqan-emad.vercel.app`
   - Redirect URLs: `https://itqan-emad.vercel.app/**`
4. Authentication ← Providers ← Email: فعّل Email (ومعه Magic Link / OTP)
5. Project Settings ← API: انسخ `Project URL` و `anon public` والصقهما في `config.js`
6. (اختياري) أضف بريدك مديراً: `insert into admins(email) values ('بريدك');`
7. ارفع الملفات إلى GitHub (Vercel ينشر تلقائياً)

بعدها: المستخدم يكتب بريده ← تصله رسالة ← يضغط الرابط ← يفتح الموقع تلقائياً وهو داخل.

ملاحظة: خدمة البريد المجانية في Supabase محدودة العدد في الساعة؛ عند الإطلاق الواسع اربط SMTP خاص (Resend مثلاً) من Authentication ← SMTP.

## الملفات
- `index.html` (تعديل: وسوم المشاركة og + تحميل الملفين الجديدين)
- `itqan-addon.js` (تعديل: شخصيات معلم/طالب/طالبة/ولي أمر + شريط المناهج)
- `itqan-v3.js` (جديد: الخلفية، الموسيقى، الدخول، الألعاب، المناهج، واجهة الموبايل)
- `itqan-curriculum.js` (جديد: محرك الدروس وملفات PowerPoint وأوراق العمل)
- بعد الرفع: افتح رابط الموقع مرة بـ Ctrl+Shift+R لتحديث الكاش. ولمعاينة صورة المشاركة بعد التحديث استخدم أداة إعادة المسح في واتساب/فيسبوك Sharing Debugger (غيّرت رابط الصورة إلى ?v=3 لتتجاوز الكاش القديم).
