// itqan-admin.js — لوحة إدارة إتقان (المرحلة 1)
// تدير الجداول الجديدة: site_config, content_nodes, media_files, download_log
// تعتمد على Supabase Google OAuth — المدير: emoemo500700@gmail.com

(function () {
  "use strict";

  var CFG = window.ITQAN_CFG || {};
  var sb = null;
  var state = { user: null, isAdmin: false, loading: true };

  var KINDS = {
    section: "قسم رئيسي",
    grade: "صف",
    subject: "مادة",
    lesson: "درس"
  };

  var KIND_EMOJI = { section: "📁", grade: "🎓", subject: "📚", lesson: "📝" };

  function initSupabase() {
    if (!CFG.url || !CFG.key) {
      console.error("itqan-admin: ITQAN_CFG غير مضبوط");
      return false;
    }
    if (!window.supabase) {
      console.error("itqan-admin: مكتبة supabase غير محمّلة");
      return false;
    }
    sb = window.supabase.createClient(CFG.url, CFG.key, {
      auth: { persistSession: true, detectSessionInUrl: true }
    });
    return true;
  }

  function checkAdmin(email) {
    return email && email.toLowerCase() === "emoemo500700@gmail.com";
  }

  async function signInWithGoogle() {
    if (!sb) return;
    try {
      var btn = document.getElementById("btn-google");
      if (btn) { btn.disabled = true; btn.textContent = "جارٍ التحويل…"; }
      await sb.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin + window.location.pathname }
      });
    } catch (e) {
      console.error("itqan-admin: خطأ الدخول", e);
      showLoginError("تعذر تسجيل الدخول بحساب Google");
    }
  }

  async function signOut() {
    if (!sb) return;
    await sb.auth.signOut();
    state.user = null;
    state.isAdmin = false;
    showLoginScreen();
  }

  function initAuth() {
    if (!sb) { showLoginError("قاعدة البيانات غير مضبوطة"); return; }

    sb.auth.onAuthStateChange(function (event, session) {
      (async function () {
        if (session && session.user) {
          state.user = session.user;
          state.isAdmin = checkAdmin(session.user.email);
          if (state.isAdmin) {
            showAdminPanel();
          } else {
            showAccessDenied(session.user.email);
          }
        } else {
          state.user = null;
          state.isAdmin = false;
          showLoginScreen();
        }
      })();
    });

    sb.auth.getSession().then(function (r) {
      if (!r.data || !r.data.session) {
        state.loading = false;
        showLoginScreen();
      }
    });
  }

  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function toast(msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.hidden = true; }, 3000);
  }

  function showLoginScreen() {
    var root = document.getElementById("admin-root");
    if (!root) return;
    root.innerHTML =
      '<div class="adm-login-card">' +
        '<div class="adm-login-icon">🦉</div>' +
        '<h2>لوحة إدارة إتقان</h2>' +
        '<p class="adm-hint">سجّل الدخول بحساب Google الخاص بالمدير</p>' +
        '<button class="adm-btn adm-btn-primary" id="btn-google">' +
          '<span class="adm-g-icon">G</span> الدخول بحساب Google' +
        '</button>' +
        '<p class="adm-err" id="login-err"></p>' +
      '</div>';
    var btn = document.getElementById("btn-google");
    if (btn) btn.addEventListener("click", signInWithGoogle);
  }

  function showLoginError(msg) {
    var e = document.getElementById("login-err");
    if (e) e.textContent = msg;
    var btn = document.getElementById("btn-google");
    if (btn) { btn.disabled = false; btn.textContent = "الدخول بحساب Google"; }
  }

  function showAccessDenied(email) {
    var root = document.getElementById("admin-root");
    if (!root) return;
    root.innerHTML =
      '<div class="adm-login-card">' +
        '<div class="adm-login-icon">🚫</div>' +
        '<h2>لا تملك صلاحية المدير</h2>' +
        '<p class="adm-hint">الحساب <b dir="ltr">' + esc(email) + '</b> غير مصرّح له بالدخول للوحة الإدارة.</p>' +
        '<button class="adm-btn" id="btn-signout">تسجيل خروج</button>' +
      '</div>';
    var btn = document.getElementById("btn-signout");
    if (btn) btn.addEventListener("click", signOut);
  }

  var activeTab = "config";

  function showAdminPanel() {
    var root = document.getElementById("admin-root");
    if (!root) return;
    root.innerHTML =
      '<div class="adm-header">' +
        '<div class="adm-user-info">' +
          '<span>المدير: <b dir="ltr">' + esc(state.user.email) + '</b></span>' +
          '<button class="adm-btn adm-btn-sm" id="btn-signout-top">خروج</button>' +
        '</div>' +
      '</div>' +
      '<nav class="adm-tabs">' +
        '<button class="adm-tab" data-tab="config" aria-pressed="true">⚙️ إعدادات الموقع</button>' +
        '<button class="adm-tab" data-tab="content">🌳 المحتوى</button>' +
        '<button class="adm-tab" data-tab="media">📎 الملفات</button>' +
        '<button class="adm-tab" data-tab="logs">📊 سجل التحميلات</button>' +
      '</nav>' +
      '<div class="adm-body" id="adm-body"><p class="adm-hint">جارٍ التحميل…</p></div>';

    var btn = document.getElementById("btn-signout-top");
    if (btn) btn.addEventListener("click", signOut);

    var tabs = root.querySelectorAll(".adm-tab");
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        tabs.forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        t.setAttribute("aria-pressed", "true");
        activeTab = t.dataset.tab;
        loadTab();
      });
    });

    loadTab();
  }

  async function loadTab() {
    var body = document.getElementById("adm-body");
    if (!body) return;
    body.innerHTML = '<p class="adm-hint">جارٍ التحميل…</p>';
    try {
      if (activeTab === "config") await renderConfig(body);
      else if (activeTab === "content") await renderContent(body);
      else if (activeTab === "media") await renderMedia(body);
      else if (activeTab === "logs") await renderLogs(body);
    } catch (e) {
      body.innerHTML = '<p class="adm-err">خطأ: ' + esc(e.message || String(e)) + '</p>';
    }
  }

  async function renderConfig(body) {
    var r = await sb.from("site_config").select("*").eq("id", 1).maybeSingle();
    var cfg = (r.data && r.data.data) || {};

    body.innerHTML =
      '<div class="adm-card">' +
        '<h3>إعدادات الموقع</h3>' +
        '<label class="adm-field"><span>اسم الموقع</span><input class="adm-input" id="cfg-name" value="' + esc(cfg.site_name || "إتقان") + '"></label>' +
        '<label class="adm-field"><span>رابط الشعار (Logo URL)</span><input class="adm-input" id="cfg-logo" value="' + esc(cfg.logo || "") + '" dir="ltr" placeholder="https://..."></label>' +
        '<label class="adm-field"><span>نص الشريط المتحرك</span><textarea class="adm-input" id="cfg-marquee" rows="3">' + esc(cfg.marquee_text || "") + '</textarea></label>' +
        '<label class="adm-field"><span>موضع الشريط</span><select class="adm-input" id="cfg-marquee-pos">' +
          '<option value="top"' + (cfg.marquee_position === "top" ? " selected" : "") + '>أعلى الصفحة</option>' +
          '<option value="bottom"' + (cfg.marquee_position === "bottom" ? " selected" : "") + '>أسفل الصفحة</option>' +
        '</select></label>' +
        '<button class="adm-btn adm-btn-primary" id="cfg-save">💾 حفظ الإعدادات</button>' +
      '</div>';

    document.getElementById("cfg-save").addEventListener("click", async function () {
      var newData = {
        site_name: document.getElementById("cfg-name").value.trim(),
        logo: document.getElementById("cfg-logo").value.trim(),
        marquee_text: document.getElementById("cfg-marquee").value.trim(),
        marquee_position: document.getElementById("cfg-marquee-pos").value
      };
      this.disabled = true;
      this.textContent = "جارٍ الحفظ…";
      try {
        var r2 = await sb.from("site_config").update({
          data: newData,
          updated_at: new Date().toISOString()
        }).eq("id", 1);
        if (r2.error) throw r2.error;
        toast("تم حفظ الإعدادات ✅");
      } catch (e) {
        toast("خطأ في الحفظ: " + (e.message || ""));
      } finally {
        this.disabled = false;
        this.textContent = "💾 حفظ الإعدادات";
      }
    });
  }

  var contentCache = [];

  async function renderContent(body) {
    var r = await sb.from("content_nodes").select("*").order("sort", { ascending: true });
    contentCache = r.data || [];

    body.innerHTML =
      '<div class="adm-card">' +
        '<h3>إضافة عنصر محتوى</h3>' +
        '<div class="adm-form-row">' +
          '<label class="adm-field"><span>النوع</span><select class="adm-input" id="cn-kind">' +
            Object.keys(KINDS).map(function (k) {
              return '<option value="' + k + '">' + KIND_EMOJI[k] + " " + KINDS[k] + "</option>";
            }).join("") +
          '</select></label>' +
          '<label class="adm-field"><span>العنوان</span><input class="adm-input" id="cn-title" placeholder="مثال: صعوبات التعلم"></label>' +
        '</div>' +
        '<div class="adm-form-row">' +
          '<label class="adm-field"><span>إيموجي</span><input class="adm-input" id="cn-emoji" value="📁" style="max-width:80px"></label>' +
          '<label class="adm-field"><span>المدة (دقيقة)</span><input class="adm-input" id="cn-duration" type="number" value="0" min="0" style="max-width:120px"></label>' +
          '<label class="adm-field"><span>الترتيب</span><input class="adm-input" id="cn-sort" type="number" value="0" style="max-width:100px"></label>' +
        '</div>' +
        '<label class="adm-field"><span>العنصر الأب (اتركه فارغاً لقسم رئيسي)</span><select class="adm-input" id="cn-parent"><option value="">— قسم رئيسي —</option>' +
          contentCache.map(function (n) {
            return '<option value="' + n.id + '">' + esc(n.emoji || "") + " " + esc(n.title) + "</option>";
          }).join("") +
        '</select></label>' +
        '<label class="adm-check"><input type="checkbox" id="cn-published" checked> منشور</label>' +
        '<button class="adm-btn adm-btn-primary" id="cn-add">➕ إضافة</button>' +
      '</div>' +
      '<div class="adm-card">' +
        '<h3>شجرة المحتوى (' + contentCache.length + ')</h3>' +
        '<div id="cn-tree"></div>' +
      '</div>';

    document.getElementById("cn-kind").addEventListener("change", function () {
      document.getElementById("cn-emoji").value = KIND_EMOJI[this.value] || "📁";
    });

    document.getElementById("cn-add").addEventListener("click", async function () {
      var title = document.getElementById("cn-title").value.trim();
      if (!title) return toast("اكتب عنواناً");
      var parentId = document.getElementById("cn-parent").value || null;
      var node = {
        title: title,
        emoji: document.getElementById("cn-emoji").value.trim() || "📁",
        kind: document.getElementById("cn-kind").value,
        duration_min: parseInt(document.getElementById("cn-duration").value) || 0,
        sort: parseInt(document.getElementById("cn-sort").value) || 0,
        published: document.getElementById("cn-published").checked,
        parent_id: parentId
      };
      this.disabled = true;
      try {
        var r2 = await sb.from("content_nodes").insert(node);
        if (r2.error) throw r2.error;
        toast("تمت الإضافة ✅");
        await loadTab();
      } catch (e) {
        toast("خطأ: " + (e.message || ""));
        this.disabled = false;
      }
    });

    renderContentTree();
  }

  function renderContentTree() {
    var container = document.getElementById("cn-tree");
    if (!container) return;

    var byParent = {};
    contentCache.forEach(function (n) {
      var pid = n.parent_id || "root";
      if (!byParent[pid]) byParent[pid] = [];
      byParent[pid].push(n);
    });

    function renderNode(node, depth) {
      var children = byParent[node.id] || [];
      var indent = depth * 24;
      return (
        '<div class="cn-node" style="margin-inline-start:' + indent + 'px">' +
          '<div class="cn-row">' +
            '<span class="cn-emoji">' + esc(node.emoji || "📁") + '</span>' +
            '<span class="cn-title">' + esc(node.title) + '</span>' +
            '<span class="cn-kind">' + KINDS[node.kind] + '</span>' +
            (node.duration_min > 0 ? '<span class="cn-dur">' + node.duration_min + ' د</span>' : '') +
            '<span class="cn-pub ' + (node.published ? "pub-on" : "pub-off") + '">' + (node.published ? "منشور" : "مخفي") + '</span>' +
            '<div class="cn-actions">' +
              '<button class="adm-btn adm-btn-sm" data-cn-edit="' + node.id + '">✏️</button>' +
              '<button class="adm-btn adm-btn-sm adm-btn-danger" data-cn-del="' + node.id + '">🗑️</button>' +
            '</div>' +
          '</div>' +
          (children.length ? children.map(function (c) { return renderNode(c, depth + 1); }).join("") : "") +
        '</div>'
      );
    }

    var roots = byParent["root"] || [];
    container.innerHTML = roots.length
      ? roots.map(function (n) { return renderNode(n, 0); }).join("")
      : '<p class="adm-hint">لا توجد عناصر محتوى بعد.</p>';

    container.querySelectorAll("[data-cn-del]").forEach(function (btn) {
      btn.addEventListener("click", async function () {
        if (!confirm("حذف هذا العنصر وكل ما تحته؟")) return;
        try {
          var r = await sb.from("content_nodes").delete().eq("id", this.dataset.cnDel);
          if (r.error) throw r.error;
          toast("تم الحذف");
          await loadTab();
        } catch (e) {
          toast("خطأ: " + (e.message || ""));
        }
      });
    });

    container.querySelectorAll("[data-cn-edit]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = this.dataset.cnEdit;
        var node = contentCache.find(function (n) { return n.id === id; });
        if (!node) return;
        showEditNodeModal(node);
      });
    });
  }

  function showEditNodeModal(node) {
    var body = document.getElementById("adm-body");
    body.insertAdjacentHTML("beforeend",
      '<div class="adm-modal" id="edit-modal">' +
        '<div class="adm-modal-card">' +
          '<h3>تعديل: ' + esc(node.title) + '</h3>' +
          '<label class="adm-field"><span>العنوان</span><input class="adm-input" id="ed-title" value="' + esc(node.title) + '"></label>' +
          '<div class="adm-form-row">' +
            '<label class="adm-field"><span>إيموجي</span><input class="adm-input" id="ed-emoji" value="' + esc(node.emoji) + '" style="max-width:80px"></label>' +
            '<label class="adm-field"><span>المدة</span><input class="adm-input" id="ed-dur" type="number" value="' + node.duration_min + '" style="max-width:120px"></label>' +
            '<label class="adm-field"><span>الترتيب</span><input class="adm-input" id="ed-sort" type="number" value="' + node.sort + '" style="max-width:100px"></label>' +
          '</div>' +
          '<label class="adm-check"><input type="checkbox" id="ed-pub"' + (node.published ? " checked" : "") + '> منشور</label>' +
          '<div class="adm-form-row" style="margin-top:12px">' +
            '<button class="adm-btn adm-btn-primary" id="ed-save">💾 حفظ</button>' +
            '<button class="adm-btn" id="ed-cancel">إلغاء</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );

    var modal = document.getElementById("edit-modal");
    document.getElementById("ed-cancel").addEventListener("click", function () { modal.remove(); });
    document.getElementById("ed-save").addEventListener("click", async function () {
      this.disabled = true;
      try {
        var r = await sb.from("content_nodes").update({
          title: document.getElementById("ed-title").value.trim(),
          emoji: document.getElementById("ed-emoji").value.trim() || "📁",
          duration_min: parseInt(document.getElementById("ed-dur").value) || 0,
          sort: parseInt(document.getElementById("ed-sort").value) || 0,
          published: document.getElementById("ed-pub").checked
        }).eq("id", node.id);
        if (r.error) throw r.error;
        toast("تم الحفظ ✅");
        modal.remove();
        await loadTab();
      } catch (e) {
        toast("خطأ: " + (e.message || ""));
        this.disabled = false;
      }
    });
  }

  async function renderMedia(body) {
    var r = await sb.from("media_files").select("*,content_nodes(title)").order("created_at", { ascending: false }).limit(200);
    var files = r.data || [];
    var nodes = contentCache.length ? contentCache : (await sb.from("content_nodes").select("id,title,emoji").order("sort")).data || [];

    body.innerHTML =
      '<div class="adm-card">' +
        '<h3>إضافة ملف</h3>' +
        '<div class="adm-form-row">' +
          '<label class="adm-field"><span>اسم الملف</span><input class="adm-input" id="mf-name" placeholder="مثال: درس الكسور.pptx"></label>' +
          '<label class="adm-field"><span>النوع (MIME)</span><input class="adm-input" id="mf-mime" value="application/octet-stream" dir="ltr"></label>' +
        '</div>' +
        '<div class="adm-form-row">' +
          '<label class="adm-field"><span>مسار التخزين (Storage Path)</span><input class="adm-input" id="mf-path" dir="ltr" placeholder="files/lesson1.pptx"></label>' +
          '<label class="adm-field"><span>العنصر المرتبط</span><select class="adm-input" id="mf-node"><option value="">— بدون —</option>' +
            nodes.map(function (n) { return '<option value="' + n.id + '">' + esc(n.emoji || "") + " " + esc(n.title) + "</option>"; }).join("") +
          '</select></label>' +
        '</div>' +
        '<label class="adm-field"><span>الحجم (bytes)</span><input class="adm-input" id="mf-size" type="number" value="0" style="max-width:160px"></label>' +
        '<button class="adm-btn adm-btn-primary" id="mf-add">➕ إضافة ملف</button>' +
      '</div>' +
      '<div class="adm-card">' +
        '<h3>الملفات (' + files.length + ')</h3>' +
        (files.length
          ? '<div class="adm-table-wrap"><table class="adm-table"><thead><tr><th>الاسم</th><th>العنصر</th><th>النوع</th><th>الحجم</th><th>التاريخ</th><th></th></tr></thead><tbody>' +
            files.map(function (f) {
              var nodeTitle = f.content_nodes ? esc(f.content_nodes.title) : "—";
              var size = f.size_bytes ? (f.size_bytes / 1024).toFixed(0) + " KB" : "—";
              return '<tr><td>' + esc(f.name) + '</td><td>' + nodeTitle + '</td><td dir="ltr">' + esc(f.mime) + '</td><td>' + size + '</td><td>' + new Date(f.created_at).toLocaleDateString("ar") + '</td><td><button class="adm-btn adm-btn-sm adm-btn-danger" data-mf-del="' + f.id + '">🗑️</button></td></tr>';
            }).join("") +
          '</tbody></table></div>'
          : '<p class="adm-hint">لا توجد ملفات بعد.</p>') +
      '</div>';

    document.getElementById("mf-add").addEventListener("click", async function () {
      var name = document.getElementById("mf-name").value.trim();
      var path = document.getElementById("mf-path").value.trim();
      if (!name || !path) return toast("أدخل اسم الملف ومساره");
      this.disabled = true;
      try {
        var r2 = await sb.from("media_files").insert({
          name: name,
          mime: document.getElementById("mf-mime").value.trim() || "application/octet-stream",
          storage_path: path,
          size_bytes: parseInt(document.getElementById("mf-size").value) || null,
          node_id: document.getElementById("mf-node").value || null
        });
        if (r2.error) throw r2.error;
        toast("تمت الإضافة ✅");
        await loadTab();
      } catch (e) {
        toast("خطأ: " + (e.message || ""));
        this.disabled = false;
      }
    });

    body.querySelectorAll("[data-mf-del]").forEach(function (btn) {
      btn.addEventListener("click", async function () {
        if (!confirm("حذف هذا الملف؟")) return;
        try {
          var r = await sb.from("media_files").delete().eq("id", this.dataset.mfDel);
          if (r.error) throw r.error;
          toast("تم الحذف");
          await loadTab();
        } catch (e) {
          toast("خطأ: " + (e.message || ""));
        }
      });
    });
  }

  async function renderLogs(body) {
    var r = await sb.from("download_log").select("*,media_files(name)").order("created_at", { ascending: false }).limit(200);
    var logs = r.data || [];
    var cnt = await sb.from("download_log").select("id", { count: "exact", head: true });

    body.innerHTML =
      '<div class="adm-card">' +
        '<h3>سجل التحميلات</h3>' +
        '<div class="adm-stats">' +
          '<div class="adm-stat"><b>' + (cnt.count || 0) + '</b> إجمالي التحميلات</div>' +
        '</div>' +
        '<div class="adm-form-row" style="margin-block:12px">' +
          '<button class="adm-btn" id="dl-cleanup">🧹 حذف السجلات الأقدم من 30 يوماً</button>' +
        '</div>' +
        (logs.length
          ? '<div class="adm-table-wrap"><table class="adm-table"><thead><tr><th>الملف</th><th>التاريخ والوقت</th></tr></thead><tbody>' +
            logs.map(function (l) {
              var fname = l.media_files ? esc(l.media_files.name) : "ملف محذوف";
              return '<tr><td>' + fname + '</td><td>' + new Date(l.created_at).toLocaleString("ar") + '</td></tr>';
            }).join("") +
          '</tbody></table></div>'
          : '<p class="adm-hint">لا توجد تحميلات بعد.</p>') +
      '</div>';

    var cleanupBtn = document.getElementById("dl-cleanup");
    if (cleanupBtn) {
      cleanupBtn.addEventListener("click", async function () {
        if (!confirm("سيتم حذف كل السجلات الأقدم من 30 يوماً. متابعة؟")) return;
        this.disabled = true;
        try {
          var r2 = await sb.rpc("cleanup_download_log");
          if (r2.error) throw r2.error;
          toast("تم التنظيف ✅");
          await loadTab();
        } catch (e) {
          toast("خطأ: " + (e.message || ""));
          this.disabled = false;
        }
      });
    }
  }

  function injectStyles() {
    var style = document.createElement("style");
    style.textContent = `
.adm-login-card{max-width:400px;margin:80px auto;background:#fff;border-radius:20px;padding:32px 24px;text-align:center;box-shadow:0 12px 40px rgba(0,0,0,.12);direction:rtl}
.adm-login-icon{font-size:56px;margin-bottom:12px}
.adm-login-card h2{font-size:22px;margin:0 0 8px;color:#0f2b2e}
.adm-hint{color:#4f6f72;font-size:14px;margin:4px 0 12px;line-height:1.7}
.adm-err{color:#b3261e;font-size:14px;min-height:20px;margin-top:8px}
.adm-btn{border:0;border-radius:12px;padding:10px 18px;font:inherit;font-weight:700;font-size:15px;cursor:pointer;background:#e2f4f1;color:#0f2b2e;transition:transform .12s}
.adm-btn:active{transform:translateY(2px)}
.adm-btn:disabled{opacity:.5;cursor:default}
.adm-btn-sm{padding:6px 10px;font-size:13px}
.adm-btn-primary{background:#0e8f8a;color:#fff}
.adm-btn-danger{background:#fee;color:#b3261e}
.adm-g-icon{display:inline-block;width:20px;height:20px;background:#fff;color:#4285f4;border-radius:50%;font-weight:800;font-size:14px;line-height:20px;margin-inline-end:8px;vertical-align:middle}
.adm-header{display:flex;justify-content:flex-end;padding:10px 0;border-bottom:2px solid #d3e7e3;margin-bottom:16px}
.adm-user-info{display:flex;align-items:center;gap:12px;font-size:14px}
.adm-tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:18px}
.adm-tab{border:2px solid #d3e7e3;background:#fff;border-radius:999px;padding:8px 16px;font:inherit;font-weight:700;font-size:14px;cursor:pointer;color:#4f6f72}
.adm-tab[aria-pressed="true"]{background:#0e8f8a;color:#fff;border-color:#0e8f8a}
.adm-body{min-height:300px}
.adm-card{background:#fff;border:2px solid #d3e7e3;border-radius:18px;padding:18px;margin-bottom:16px}
.adm-card h3{font-size:18px;margin:0 0 14px;color:#0f2b2e}
.adm-field{display:flex;flex-direction:column;gap:4px;margin-bottom:12px;font-size:13px;font-weight:700;color:#4f6f72}
.adm-input{border:2px solid #d3e7e3;background:#f1faf8;border-radius:10px;padding:8px 10px;font:inherit;font-size:15px;color:#0f2b2e;width:100%;box-sizing:border-box}
.adm-input:focus{outline:3px solid #ff7a2f;outline-offset:1px;border-color:#0e8f8a}
.adm-form-row{display:flex;gap:10px;flex-wrap:wrap}
.adm-form-row .adm-field{flex:1;min-width:160px}
.adm-check{display:flex;align-items:center;gap:8px;font-size:15px;font-weight:700;margin-bottom:12px;cursor:pointer}
.adm-check input{width:20px;height:20px}
.cn-node{margin-bottom:4px}
.cn-row{display:flex;align-items:center;gap:8px;padding:8px 10px;background:#f1faf8;border-radius:10px;flex-wrap:wrap}
.cn-emoji{font-size:20px}
.cn-title{font-weight:800;font-size:15px;flex:1;min-width:100px}
.cn-kind{font-size:12px;color:#0e8f8a;background:#e2f4f1;border-radius:8px;padding:2px 8px;font-weight:700}
.cn-dur{font-size:12px;color:#4f6f72}
.cn-pub{font-size:12px;padding:2px 8px;border-radius:8px;font-weight:700}
.cn-pub.pub-on{background:#e6f9ed;color:#2f9e44}
.cn-pub.pub-off{background:#fff0f0;color:#b3261e}
.cn-actions{display:flex;gap:4px}
.adm-table-wrap{overflow-x:auto}
.adm-table{width:100%;border-collapse:collapse;font-size:14px}
.adm-table th{text-align:start;padding:8px 10px;background:#e2f4f1;font-weight:800;color:#0f2b2e;border-bottom:2px solid #d3e7e3}
.adm-table td{padding:8px 10px;border-bottom:1px solid #d3e7e3}
.adm-table tr:hover{background:#f1faf8}
.adm-stats{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px}
.adm-stat{background:#e2f4f1;border-radius:14px;padding:8px 16px;font-weight:700;font-size:14px}
.adm-stat b{font-size:22px;color:#0e8f8a}
.adm-modal{position:fixed;inset:0;z-index:100;background:rgba(5,25,27,.5);display:flex;align-items:center;justify-content:center;padding:16px}
.adm-modal-card{background:#fff;border-radius:20px;padding:20px;width:min(500px,100%);max-height:85vh;overflow-y:auto}
@media(max-width:600px){.adm-form-row{flex-direction:column}}
`;
    document.head.appendChild(style);
  }

  function boot() {
    injectStyles();
    if (!initSupabase()) {
      var root = document.getElementById("admin-root");
      if (root) root.innerHTML = '<div class="adm-login-card"><div class="adm-login-icon">⚠️</div><h2>خطأ في الإعداد</h2><p class="adm-hint">تعذر الاتصال بقاعدة البيانات. تأكد من ملف config.js</p></div>';
      return;
    }
    initAuth();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
