(function () {
  "use strict";

  const app = document.getElementById("app");
  const params = new URLSearchParams(location.search);
  let players = clamp(parseInt(params.get("p"), 10) || 4, 2, 6);

  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function store(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, val);
    } catch (e) { return null; }
  }
  const byId = (id) => window.CHARACTERS.find((c) => c.id === id);

  // ---------- Biểu tượng SVG ----------
  const ICONS = {
    attack: { c: "var(--sword)", d: '<path d="M14 34 L34 14 M30 12 l6 0 0 6 M16 26 l6 6 M10 38 l5-5" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none"/>' },
    shield: { c: "var(--shield)", d: '<path d="M24 10 L36 14 V24 C36 31 30 36 24 38 C18 36 12 31 12 24 V14 Z" fill="#fff"/>' },
    heart: { c: "var(--heart)", d: '<path d="M24 36 C14 29 11 24 11 19 a6.5 6.5 0 0 1 13-1 a6.5 6.5 0 0 1 13 1 c0 5-3 10-13 17z" fill="#fff"/>' },
    draw: { c: "var(--draw)", d: '<rect x="15" y="11" width="15" height="21" rx="3" fill="#fff" opacity=".6"/><rect x="19" y="16" width="15" height="21" rx="3" fill="#fff"/>' },
    bolt: { c: "var(--bolt)", d: '<path d="M27 9 L15 27 H23 L20 39 L33 20 H25 Z" fill="#fff"/>' },
    power: { c: "var(--power)", d: '<path d="M24 10 l3.6 8.6 9.4.8-7.1 6.2 2.1 9.2L24 30l-8 4.8 2.1-9.2-7.1-6.2 9.4-.8z" fill="#fff"/>' },
  };
  function icon(id, cls) {
    const i = ICONS[id];
    return `<svg class="icon ${cls || ""}" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22" fill="${i.c}" stroke="#23201C" stroke-width="3"/>${i.d}</svg>`;
  }
  const symName = (id) => (window.SYMBOLS.find((s) => s.id === id) || {}).name || id;

  // ---------- Khung chung cho người chơi ----------
  function shell(step, inner, bottom) {
    const chosen = store("dm-char");
    const steps = [
      { n: 1, href: "#/chon", label: "Chọn nhân vật" },
      { n: 2, href: chosen ? `#/nv/${chosen}` : "#/chon", label: "Lá bài của bạn" },
      { n: 3, href: "#/luat", label: "Luật chơi" },
    ];
    return `
      <header class="topbar"><div class="topbar-inner">
        <a class="brand" href="#/chon">Dungeon <b>Mayhem</b></a>
        <nav class="steps" aria-label="Các bước">
          ${steps.map((s) => `<a href="${s.href}" aria-label="Bước ${s.n}: ${s.label}" ${s.n === step ? 'aria-current="step"' : ""}>${s.n}</a>`).join("")}
        </nav>
      </div></header>
      <div class="wrap">${inner}</div>
      ${bottom ? `<nav class="bottom"><div class="bottom-inner">${bottom}</div></nav>` : ""}`;
  }

  // ---------- Màn hình chủ bàn ----------
  function viewHome() {
    document.title = "Dungeon Mayhem – Hướng dẫn tại bàn";
    app.innerHTML = `
      <section class="host"><div class="host-inner">
        <div>
          <h1 class="logo">Dungeon <span>Mayhem</span></h1>
          <p class="lede">Đặt máy này giữa bàn. Mọi người quét mã QR để chọn nhân vật, xem ý nghĩa lá bài và luật chơi ngay trên điện thoại.</p>
        </div>
        <div class="panel">
          <h2>Ván này mấy người?</h2>
          <p class="help">Từ 5 người trở lên sẽ có thêm luật chỉ đánh người ngồi cạnh.</p>
          <div class="counts" role="group" aria-label="Số người chơi">
            ${[2, 3, 4, 5, 6].map((n) => `<button class="count" data-n="${n}" aria-pressed="${n === players}">${n}</button>`).join("")}
          </div>
          <button class="btn block" id="start">Bắt đầu ván mới</button>
          <p style="margin-top:14px;text-align:center"><a href="#/chon" style="color:var(--ink-soft)">Xem hướng dẫn trên máy này</a></p>
        </div>
      </div></section>`;

    app.querySelectorAll(".count").forEach((b) =>
      b.addEventListener("click", () => {
        players = +b.dataset.n;
        app.querySelectorAll(".count").forEach((x) => x.setAttribute("aria-pressed", String(+x.dataset.n === players)));
      })
    );
    app.querySelector("#start").addEventListener("click", () => {
      try { history.replaceState(null, "", `${location.pathname}?p=${players}#/qr`); route(); } catch (e) { location.hash = "#/qr"; }
    });
  }

  // ---------- Màn hình QR ----------
  function joinUrl() {
    return `${location.origin}${location.pathname}?p=${players}#/chon`;
  }
  function viewQR() {
    document.title = "Quét để tham gia – Dungeon Mayhem";
    const url = joinUrl();
    app.innerHTML = `
      <section class="qr-stage"><div>
        <div class="qr-card">
          <h2>Quét để vào bàn</h2>
          <div id="qr" role="img" aria-label="Mã QR mở hướng dẫn"></div>
          <span class="table-badge">Bàn ${players} người</span>
          <p class="qr-url">${esc(url)}</p>
        </div>
        <div class="qr-meta">
          <button class="btn ghost" id="copy">Sao chép link</button>
          <a class="btn light" href="#/">Ván mới</a>
        </div>
      </div></section>`;

    const box = app.querySelector("#qr");
    if (typeof window.qrcode === "function") {
      const qr = window.qrcode(0, "M");
      qr.addData(url);
      qr.make();
      box.innerHTML = qr.createSvgTag({ cellSize: 8, margin: 2, scalable: true });
      const svg = box.querySelector("svg");
      if (svg) { svg.style.width = "100%"; svg.style.height = "100%"; svg.querySelectorAll("rect").forEach((r) => r.setAttribute("fill", "#FBF7EE")); svg.querySelectorAll("path").forEach((p) => p.setAttribute("fill", "#23201C")); }
    } else {
      box.innerHTML = `<p style="padding:20px">Không tạo được mã QR. Hãy gửi link bên dưới cho mọi người.</p>`;
    }
    app.querySelector("#copy").addEventListener("click", async (e) => {
      try { await navigator.clipboard.writeText(url); e.target.textContent = "Đã sao chép"; }
      catch { e.target.textContent = "Hãy chép link thủ công"; }
    });
  }

  // ---------- Bước 1: chọn nhân vật ----------
  function viewChoose() {
    document.title = "Chọn nhân vật – Dungeon Mayhem";
    const groups = Object.keys(window.SETS).map((key) => {
      const set = window.SETS[key];
      const list = window.CHARACTERS.filter((c) => c.set === key);
      return `
        <div class="set-head"><h2>${esc(set.name)}</h2><span>${esc(set.note)}</span></div>
        <div class="char-grid">
          ${list.map((c) => `
            <a class="char-tile" href="#/nv/${c.id}" style="--c:${c.color}">
              <div class="band" aria-hidden="true">${c.emoji}</div>
              <div class="txt"><h3>${esc(c.name)}</h3><p>${esc(c.role)}</p></div>
            </a>`).join("")}
        </div>`;
    }).join("");

    app.innerHTML = shell(1, `
      <h1 class="page-title">Bạn cầm bộ bài nào?</h1>
      <p class="page-sub">Chạm vào nhân vật có màu giống bộ bài trước mặt bạn.</p>
      ${groups}`);
  }

  // ---------- Bước 2: nhân vật + lá bài ----------
  function viewCharacter(id) {
    const c = byId(id);
    if (!c) { location.hash = "#/chon"; return; }
    store("dm-char", c.id);
    document.title = `${c.name} – Dungeon Mayhem`;

    const symbols = window.SYMBOLS.map((s) => `
      <div class="sym">${icon(s.id)}<div><h3>${esc(s.name)}</h3><p>${esc(s.short)}</p></div></div>`).join("");

    app.innerHTML = shell(2, `
      <article class="hero-card" style="--c:${c.color}">
        <div class="hero-top">
          <div class="hero-emoji" aria-hidden="true">${c.emoji}</div>
          <div><h1>${esc(c.name)}</h1><p>${esc(c.role)}</p>${c.title ? `<p>${esc(c.name)} ${esc(c.title)}</p>` : ""}</div>
        </div>
        <div class="hero-body">
          <h2>Lối chơi</h2>
          <p class="style">${esc(c.style)}</p>
          <div class="chips">${c.strengths.map((s) => `<span class="chip">${icon(s, "sm")}Mạnh về ${esc(symName(s).toLowerCase())}</span>`).join("")}</div>

          <h2>Lá đặc biệt của bạn</h2>
          ${c.powers.map((p) => `<div class="power"><h3>${icon("power", "sm")}${esc(p.name)}</h3><p>${esc(p.desc)}</p></div>`).join("")}
          ${c.extra ? `<p class="extra">${esc(c.extra)}</p>` : ""}

          <h2>Mẹo chơi</h2>
          <ul class="tips">${c.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>

          <h2>Biểu tượng trên mọi lá bài</h2>
          <div class="sym-list">${symbols}</div>
          <p class="note">Đây là tóm tắt. Khi chữ in trên lá khác với tóm tắt, làm theo lá bài.</p>
        </div>
      </article>`,
      `<a class="btn ghost" href="#/chon">Đổi nhân vật</a><a class="btn" href="#/luat">Xem luật chơi</a>`);
    window.scrollTo(0, 0);
  }

  // ---------- Bước 3: luật chơi ----------
  function viewRules() {
    document.title = "Luật chơi – Dungeon Mayhem";
    const R = window.RULES;
    const li = (arr) => arr.map((x) => `<li>${esc(x)}</li>`).join("");
    const chosen = store("dm-char");

    app.innerHTML = shell(3, `
      <h1 class="page-title">Luật cơ bản</h1>
      <p class="page-sub">Mỗi người bắt đầu với 10 máu. ${esc(R.win)}</p>

      <section class="rule-block"><h2>Chuẩn bị</h2><ol>${li(R.setup)}</ol></section>
      <section class="rule-block"><h2>Lượt của bạn</h2><ol>${li(R.turn)}</ol></section>
      <section class="rule-block"><h2>Khiên hoạt động thế nào</h2><ul>${li(R.shields)}</ul></section>
      ${players >= 5 ? `<section class="rule-block alert"><h2>Bàn ${players} người</h2><ul>${li(R.bigTable)}</ul></section>` : ""}
      <section class="rule-block"><h2>Hay hỏi</h2>
        ${R.faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}
      </section>
      <p class="win">Người cuối cùng đứng vững là người thắng!</p>`,
      `${chosen ? `<a class="btn ghost" href="#/nv/${chosen}">Lá bài của tôi</a>` : `<a class="btn ghost" href="#/chon">Chọn nhân vật</a>`}`);
    window.scrollTo(0, 0);
  }

  // ---------- Điều hướng ----------
  function route() {
    const h = location.hash.replace(/^#\/?/, "");
    const [page, arg] = h.split("/");
    switch (page) {
      case "qr": return viewQR();
      case "chon": return viewChoose();
      case "nv": return viewCharacter(arg);
      case "luat": return viewRules();
      default: return viewHome();
    }
  }
  window.addEventListener("hashchange", route);
  route();
})();
