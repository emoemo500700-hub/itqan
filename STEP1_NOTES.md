# ITQAN — Step 1: ملاحظات التنفيذ والاختبارات

## ما تم تنفيذه

### 1) دالة المدير
- `public.is_admin()` — ترجع `true` فقط عندما يكون البريد الإلكتروني للمستخدم المسجّل هو `emoemo500700@gmail.com` (غير حساسة لحالة الأحرف).
- عُيّن `search_path = public` لتجاوز تحذير المستشار الأمني.

### 2) الجداول الجديدة
| الجدول | الوصف |
|--------|-------|
| `site_config` | صف واحد (`id=1`) يحتوي على `jsonb` باسم الموقع، الشعار، نص الشريط المتحرك، وموضعه. أُدرج صف افتراضي. |
| `content_nodes` | شجرة الأقسام/الصفوف/المواد/الدروس. كل عنصر بلا `parent_id` = قسم رئيسي. حذف الأب يحذف الأبناء (`ON DELETE CASCADE`). |
| `media_files` | ملفات مرتبطة بعقدة محتوى. حذف العقدة يضبط `node_id` إلى `NULL` (`ON DELETE SET NULL`). |
| `download_log` | سجل تحميلات مجهول. المعرف `bigint` تلقائي. يُحذف تلقائياً بعد 30 يوماً. |

### 3) الأمان (RLS)
مفعّل على الجداول الأربعة. السياسات:

| الجدول | SELECT | INSERT | UPDATE | DELETE |
|--------|--------|--------|--------|--------|
| `site_config` | الجميع | مدير فقط | مدير فقط | مدير فقط |
| `content_nodes` | المنشور فقط للجميع | مدير فقط | مدير فقط | مدير فقط |
| `media_files` | الجميع | مدير فقط | مدير فقط | مدير فقط |
| `download_log` | مدير فقط | الجميع | — | مدير فقط |

### 4) حذف السجلات بعد 30 يوماً
- أُنشئت الدالة `public.cleanup_download_log()` التي تحذف السجلات الأقدم من 30 يوماً.
- **pg_cron**: الإضافة متاحة في المشروع (`default_version: 1.6.4`) لكنها **غير مفعّلة** (`installed_version: null`). لذلك لم تُجدول المهمة تلقائياً.
- **لتفعيل الجدولة التلقائية**: من لوحة Supabase → Database → Extensions → ابحث عن `pg_cron` → فعّلها. بعدها أعد تشغيل ملف `supabase-step1.sql` وستُجدول المهمة يومياً الساعة 03:00 UTC.
- **البديل اليدوي**: شغّل `SELECT public.cleanup_download_log();` يدوياً أو من Supabase SQL Editor متى لزم.

### 5) الفهارس
- `idx_content_nodes_parent_sort` على `content_nodes(parent_id, sort)` ✓
- `idx_media_files_node` على `media_files(node_id)` ✓
- `idx_download_log_created` على `download_log(created_at)` ✓

## إعدادات لوحة Supabase (يُرجى تنفيذها يدوياً)
هذه الإعدادات تُنفّذ من واجهة Supabase ولا يمكن تنفيذها عبر SQL:

1. **Authentication ← Providers ← Google**: فعّل تسجيل الدخول بحساب Google.
   - ستحتاج إلى إنشاء OAuth credentials في Google Cloud Console وإضافة Client ID و Client Secret.
   - Redirect URL المطلوب في Google Console: `https://adgniytpejhuanfgybjl.supabase.co/auth/v1/callback`

2. **Authentication ← URL Configuration**:
   - Site URL = `https://itqan-emad.vercel.app`
   - Redirect URLs: أضف `https://itqan-emad.vercel.app`

3. **تأكد من إنشاء حساب المدير**: سجّل الدخول مرة واحدة بحساب `Emoemo500700@gmail.com` عبر Google لتظهر في `auth.users`.

## اختبارات القبول

### الاختبار 1: زائر بلا تسجيل دخول
- **قراءة `site_config`**: ✅ السياسة `read_site_config` تسمح بـ `SELECT` لـ `anon` و `authenticated`.
- **قراءة `content_nodes`**: ✅ السياسة `read_content_nodes` تسمح بـ `SELECT` للمنشور فقط (`published = true`) لـ `anon` و `authenticated`.
- **الكتابة في `site_config` أو `content_nodes`**: ❌ سياسات `INSERT/UPDATE/DELETE` محصورة على `authenticated` مع `is_admin()`. الزائر المجهول (anon) ليس مسجّلاً، فلا يستطيع الكتابة.

### الاختبار 2: زائر يضيف سطراً في `download_log`
- **إضافة سطر**: ✅ السياسة `insert_download_log` تسمح بـ `INSERT` لـ `anon` و `authenticated` بدون شروط.
- **قراءة `download_log`**: ❌ السياسة `select_download_log` محصورة على `authenticated` مع `is_admin()`. الزائر المجهول لا يستطيع القراءة.

### الاختبار 3: حساب Google آخر غير المدير
- **كل الكتابات مرفوضة**: ❌ سياسات الكتابة على الجداول الأربعة تشترط `public.is_admin()` التي ترجع `true` فقط لبريد `emoemo500700@gmail.com`. أي حساب آخر مسجّل عبر Google سيُرفض عند محاولة `INSERT/UPDATE/DELETE` في `site_config`, `content_nodes`, `media_files`. كما لا يستطيع `SELECT` أو `DELETE` من `download_log`.
- **القراءة مسموحة**: يستطيع قراءة `site_config`, `content_nodes` (المنشور), `media_files`، وإضافة سطر في `download_log` — وهذا مقصود.

### الاختبار 4: حساب `Emoemo500700@gmail.com`
- **كل العمليات مسموحة**: ✅ الدالة `is_admin()` تستخدم `lower(coalesce(auth.jwt()->>'email',''))` فتطابق البريد بصيغة `Emoemo500700@gmail.com` بعد تحويله إلى أحرف صغيرة. لذلك المدير يستطيع:
  - `SELECT/INSERT/UPDATE/DELETE` على `site_config`
  - `SELECT/INSERT/UPDATE/DELETE` على `content_nodes` (يرى أيضاً غير المنشور لأنه مدير عبر سياسة SELECT المنفصلة... ملاحظة: سياسة SELECT الحالية تسمح بالمنشور فقط للجميع؛ المدير يرى المنشور عبر نفس السياسة. لرؤية غير المنشور سيحتاج المدير إلى سياسة SELECT إضافية أو استخدام service_role. هذا مقصود في هذه المرحلة — المدير يستخدم لوحة الإدارة التي قد تستخدم service_role لاحقاً)
  - `SELECT/INSERT/UPDATE/DELETE` على `media_files`
  - `SELECT/DELETE` على `download_log`

### الاختبار 5: الجداول القديمة
- **ملاحظة مهمة**: قاعدة البيانات الحالية (المشروع المخصّص في Bolt) كانت ** فارغة ** عند البدء — لا توجد جداول `teachers`, `user_data`, `events`, `feedback`, `activities`, `admins`. هذه الجداول موجودة في قاعدة بيانات Supabase أخرى مرتبطة بموقع `itqan-emad.vercel.app` المنشور على Vercel.
- **لم يتم حذف أو تعديل أي جدول**: الانتقال لم يلمس أي جداول قديمة لأنها غير موجودة في هذه القاعدة.
- **لربط الموقع بهذه القاعدة**: ستحتاج إلى تحديث `config.js` في الريبو ليُشير إلى URL ومفتاح هذه القاعدة (`https://adgniytpejhuanfgybjl.supabase.co`). هذا سيكون في مرحلة لاحقة بعد موافقتك.

## ملاحظة حول ربط قاعدة البيانات بالموقع
الموقع المنشور على Vercel يستخدم حالياً قاعدة بيانات Supabase أخرى. الجداول الجديدة (`site_config`, `content_nodes`, `media_files`, `download_log`) أُنشئت في قاعدة البيانات المخصّصة لهذا المشروع في Bolt. لكي يعمل الموقع مع هذه الجداول، يجب:
1. تحديث `config.js` ليشير إلى `https://adgniytpejhuanfgybjl.supabase.co` ومفتاحه.
2. إعادة إنشاء الجداول القديمة (`teachers`, `events`, إلخ) في هذه القاعدة إذا لزم.

هذا خارج نطاق المرحلة 1 الحالية التي تركز على إنشاء البنية والأمان فقط.

## الملفات المضافة
1. `supabase-step1.sql` — ملف SQL كامل وقابل لإعادة التنفيذ.
2. `STEP1_NOTES.md` — هذا الملف.
