/* ============================================================
   Re·origen — carrito.js
   Catálogo, carrito persistente (localStorage), filtros,
   render dinámico y animaciones de revelado/contadores.
   ============================================================ */

(function () {
  "use strict";

  /* ============================================================
     1. CATÁLOGO DE PRODUCTOS
     ============================================================ */
  const PRODUCTOS = [
    { id: 1,  nombre: "Llavero hexagonal rojo",      cat: "Accesorios", mat: "Colillas",  precio: 3990,  imp_u: "53 colillas",          imp_a: "+400 L agua",  img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-llavero-hexagonal" },
    { id: 2,  nombre: "Billetera slim negra",        cat: "Accesorios", mat: "Neumático", precio: 12990, imp_u: "1 neumático",          imp_a: "-2 kg CO₂",    img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-billetera-slim" },
    { id: 3,  nombre: "Pulsera trenzada verde",      cat: "Accesorios", mat: "PET",       precio: 4990,  imp_u: "3 botellas PET",       imp_a: "+60 L agua",   img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-pulsera-trenzada" },
    { id: 4,  nombre: "Llavero rectangular café",    cat: "Accesorios", mat: "Papel",     precio: 2990,  imp_u: "papel recuperado",     imp_a: "0 árboles",    img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-llavero-rectangular" },
    { id: 5,  nombre: "Portamonedas redondo",        cat: "Accesorios", mat: "Neumático", precio: 8990,  imp_u: "½ neumático",          imp_a: "-1 kg CO₂",    img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-portamonedas" },
    { id: 6,  nombre: "Pinche para cabello",         cat: "Accesorios", mat: "Colillas",  precio: 2490,  imp_u: "18 colillas",          imp_a: "+120 L agua",  img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-pinche-cabello" },
    { id: 7,  nombre: "Macetero mediano gris",       cat: "Hogar",      mat: "Neumático", precio: 14990, imp_u: "2 neumáticos",         imp_a: "-3 kg CO₂",    img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-macetero-gris" },
    { id: 8,  nombre: "Lámpara de mesa terracota",   cat: "Hogar",      mat: "Mixto",     precio: 24990, imp_u: "12 botellas + papel",  imp_a: "+180 L agua",  img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-lampara-terracota" },
    { id: 9,  nombre: "Contenedor organizador",      cat: "Hogar",      mat: "PET",       precio: 9990,  imp_u: "8 botellas PET",       imp_a: "+120 L agua",  img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-contenedor" },
    { id: 10, nombre: "Portavelas bajo",             cat: "Hogar",      mat: "Colillas",  precio: 6990,  imp_u: "120 colillas",         imp_a: "+800 L agua",  img: null },
    { id: 11, nombre: "Bandeja decorativa",          cat: "Hogar",      mat: "Papel",     precio: 11990, imp_u: "cartón recuperado",    imp_a: "0 árboles",    img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-bandeja-decorativa" },
    { id: 12, nombre: "Macetero colgante pequeño",   cat: "Hogar",      mat: "Mixto",     precio: 8490,  imp_u: "PET + goma",           imp_a: "+90 L agua",   img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-macetero-colgante" },
    { id: 13, nombre: "Cuaderno A5 tapa kraft",      cat: "Papelería",  mat: "Papel",     precio: 7990,  imp_u: "papel 100% reciclado", imp_a: "0 árboles",    img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-cuaderno-a5" },
    { id: 14, nombre: "Libreta pequeña colores",     cat: "Papelería",  mat: "PET",       precio: 4990,  imp_u: "tapa 2 botellas",      imp_a: "+30 L agua",   img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-libreta-1" },
    { id: 15, nombre: "Block de notas adhesivas",    cat: "Papelería",  mat: "Papel",     precio: 3490,  imp_u: "papel recuperado",     imp_a: "0 árboles",    img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-block-notas" },
    { id: 16, nombre: "Agenda anual sin fecha",      cat: "Papelería",  mat: "Mixto",     precio: 13990, imp_u: "mixto",                imp_a: "+45 L agua",   img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-agenda-anual" },
    { id: 17, nombre: "Set 3 cuadernos kraft",       cat: "Papelería",  mat: "Papel",     precio: 19990, imp_u: "papel 100% reciclado", imp_a: "0 árboles",    img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-set-cuadernos" },
    { id: 18, nombre: "Lámpara de mesa verde",       cat: "Hogar",      mat: "Mixto",     precio: 24990, imp_u: "10 botellas + papel",  imp_a: "+150 L agua",  img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-lampara-verde" },
    { id: 19, nombre: "Macetero mediano relieve",    cat: "Hogar",      mat: "Neumático", precio: 15990, imp_u: "2 neumáticos",         imp_a: "-3 kg CO₂",    img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-macetero-relieve" },
    { id: 20, nombre: "Macetero mediano terracota",  cat: "Hogar",      mat: "Mixto",     precio: 14490, imp_u: "neumático + cerámica", imp_a: "-2 kg CO₂",    img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-macetero-terracota" },
    { id: 21, nombre: "Libreta colores edición B",   cat: "Papelería",  mat: "PET",       precio: 4990,  imp_u: "tapa 2 botellas",      imp_a: "+30 L agua",   img: "https://res.cloudinary.com/dp4susstj/image/upload/f_auto,q_auto/relorigen/producto-libreta-2" }
  ];

  // Mapeo material → clase CSS de gradiente
  const MAT_CLASS = {
    "Colillas":  "thumb-mat-colillas",
    "PET":       "thumb-mat-pet",
    "Neumático": "thumb-mat-neumatico",
    "Papel":     "thumb-mat-papel",
    "Mixto":     "thumb-mat-mixto"
  };

  // Letra que aparece grande en el thumb (decorativo)
  const MAT_LETTER = {
    "Colillas":  "C",
    "PET":       "P",
    "Neumático": "N",
    "Papel":     "P",
    "Mixto":     "M"
  };

  /* ============================================================
     2. UTILIDADES
     ============================================================ */
  const STORAGE_KEY = "relorigen_cart";
  const fmtCLP = n => "$" + n.toLocaleString("es-CL");
  // Extrae número de un texto tipo "+400 L agua" o "-2 kg CO₂"
  const extractNum = txt => {
    const m = String(txt).match(/-?\d+(?:[.,]\d+)?/);
    return m ? parseFloat(m[0].replace(",", ".")) : 0;
  };
  const isWaterImpact = txt => /L\s*agua/i.test(String(txt));
  const isCO2Impact   = txt => /kg\s*CO/i.test(String(txt));

  // Exponer catálogo + helpers para que checkout.js los use
  window.RELORIGEN_PRODUCTOS = PRODUCTOS;
  window.RELORIGEN_FMT = fmtCLP;

  // createElement seguro: nunca interpola HTML, los strings van como texto.
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        const v = attrs[k];
        if (v == null || v === false) continue;
        e.setAttribute(k, v);
      }
    }
    if (children != null) {
      const arr = Array.isArray(children) ? children : [children];
      for (const c of arr) {
        if (c == null || c === false) continue;
        e.appendChild(typeof c === "string" || typeof c === "number"
          ? document.createTextNode(String(c))
          : c);
      }
    }
    return e;
  }
  window.RELORIGEN_EL = el;

  /* ============================================================
     3. CARRITO (con localStorage)
     ============================================================ */
  const cart = {
    items: [],

    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        this.items = raw ? JSON.parse(raw) : [];
      } catch (e) {
        this.items = [];
      }
    },
    save() {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items)); }
      catch (e) { /* localStorage bloqueado: sigue funcionando en memoria */ }
    },
    add(prod) {
      const ex = this.items.find(i => i.id === prod.id);
      if (ex) { ex.cantidad += 1; }
      else {
        this.items.push({
          id: prod.id, nombre: prod.nombre, precio: prod.precio,
          imp_u: prod.imp_u, imp_a: prod.imp_a, cantidad: 1
        });
      }
      this.save();
    },
    remove(id) {
      this.items = this.items.filter(i => i.id !== id);
      this.save();
    },
    update(id, n) {
      const ex = this.items.find(i => i.id === id);
      if (!ex) return;
      ex.cantidad = Math.max(1, n);
      this.save();
    },
    total() {
      return this.items.reduce((s, i) => s + i.precio * i.cantidad, 0);
    },
    count() {
      return this.items.reduce((s, i) => s + i.cantidad, 0);
    },
    totalAgua() {
      return this.items.reduce((s, i) => {
        if (isWaterImpact(i.imp_a)) return s + extractNum(i.imp_a) * i.cantidad;
        return s;
      }, 0);
    },
    totalCO2() {
      return this.items.reduce((s, i) => {
        if (isCO2Impact(i.imp_a)) return s + Math.abs(extractNum(i.imp_a)) * i.cantidad;
        return s;
      }, 0);
    },
    clear() { this.items = []; this.save(); }
  };
  // Exponer al checkout.js
  window.RELORIGEN_CART = cart;

  /* ============================================================
     4. RENDER DEL CATÁLOGO (genera las 17 cards)
     ============================================================ */
  // SVG estático del icono "+" (sin datos dinámicos, seguro como markup).
  const PLUS_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';

  function buildCard(p) {
    const cls = MAT_CLASS[p.mat] || "thumb-mat-mixto";
    const letter = MAT_LETTER[p.mat] || "•";

    const thumbInner = p.img
      ? el("img", { src: p.img, alt: p.nombre, loading: "lazy", "class": "product-img" })
      : el("div", { "class": "thumb-icon" }, letter);

    const btnAdd = el("button", {
      "class": "btn-add",
      "data-add": p.id,
      "aria-label": "Agregar " + p.nombre + " al carrito"
    });
    btnAdd.innerHTML = PLUS_SVG; // markup estático
    btnAdd.appendChild(document.createTextNode("Agregar"));

    return el("article", {
      "class": "product-card",
      "data-cat": p.cat,
      "data-id": p.id
    }, [
      el("div", { "class": "product-thumb " + cls + (p.img ? " has-img" : "") }, thumbInner),
      el("div", { "class": "product-body" }, [
        el("div", { "class": "product-meta" }, [
          el("span", { "class": "tag" }, p.cat),
          el("span", { "class": "tag tag-mat" }, p.mat)
        ]),
        el("h3", { "class": "product-name" }, p.nombre),
        el("div", { "class": "product-impact" }, [
          el("span", { "class": "impact-line" }, "Hecho con " + p.imp_u),
          el("span", { "class": "impact-line impact-water" }, p.imp_a)
        ]),
        el("div", { "class": "product-bottom" }, [
          el("span", { "class": "product-price" }, fmtCLP(p.precio)),
          btnAdd
        ])
      ])
    ]);
  }

  function renderCatalog() {
    const main = document.getElementById("catalog-main");
    const extra = document.getElementById("catalog-extra");
    if (!main || !extra) return;
    const visibles = PRODUCTOS.slice(0, 9);
    const ocultos  = PRODUCTOS.slice(9);
    main.replaceChildren();
    visibles.forEach(p => main.appendChild(buildCard(p)));
    extra.replaceChildren();
    ocultos.forEach(p => extra.appendChild(buildCard(p)));

    // Wirear botones "Agregar" delegando en el contenedor
    [main, extra].forEach(c => {
      c.addEventListener("click", e => {
        const btn = e.target.closest("[data-add]");
        if (!btn) return;
        const id = parseInt(btn.dataset.add, 10);
        const prod = PRODUCTOS.find(p => p.id === id);
        if (prod) addToCart(prod, btn);
      });
    });
  }

  /* ============================================================
     5. RENDER DEL PANEL CARRITO
     ============================================================ */
  function renderCart() {
    const body = document.getElementById("cart-body");
    const summary = document.getElementById("cart-summary");
    const actions = document.getElementById("cart-actions");
    const totalEl = document.getElementById("cart-total-val");
    const impactEl = document.getElementById("cart-impact-summary");
    if (!body) return;

    if (cart.items.length === 0) {
      body.innerHTML =
        '<div class="cart-empty">' +
          '<div class="empty-icon">🧺</div>' +
          '<p>Tu carrito está vacío</p>' +
        '</div>';
      summary.style.display = "none";
      actions.style.display = "none";
      return;
    }

    body.replaceChildren();
    cart.items.forEach(it => {
      const left = el("div", null, [
        el("div", { "class": "cart-item-name" }, it.nombre),
        el("div", { "class": "cart-item-impact" }, it.imp_u + " · " + it.imp_a),
        el("div", { "class": "cart-item-controls" }, [
          el("button", { "class": "qty-btn", "data-dec": it.id, "aria-label": "Disminuir" }, "−"),
          el("span", { "class": "qty-val" }, it.cantidad),
          el("button", { "class": "qty-btn", "data-inc": it.id, "aria-label": "Aumentar" }, "+")
        ])
      ]);
      const right = el("div", { "class": "cart-item-side" }, [
        el("span", { "class": "cart-item-price" }, fmtCLP(it.precio * it.cantidad)),
        el("button", { "class": "cart-item-remove", "data-rem": it.id }, "Quitar")
      ]);
      body.appendChild(el("div", { "class": "cart-item" }, [left, right]));
    });

    // Resumen impacto
    const agua = cart.totalAgua();
    const co2 = cart.totalCO2();
    impactEl.replaceChildren();
    if (agua === 0 && co2 === 0) {
      impactEl.textContent = "♻ Estás eligiendo materiales con historia.";
    } else {
      impactEl.appendChild(document.createTextNode("♻ Con este pedido "));
      if (agua > 0) {
        impactEl.appendChild(document.createTextNode("evitarás contaminar "));
        impactEl.appendChild(el("strong", null,
          "+" + Math.round(agua).toLocaleString("es-CL") + " L de agua"));
      }
      if (agua > 0 && co2 > 0) {
        impactEl.appendChild(document.createTextNode(" y "));
      }
      if (co2 > 0) {
        impactEl.appendChild(document.createTextNode("reducirás "));
        impactEl.appendChild(el("strong", null, co2.toFixed(1) + " kg de CO₂"));
      }
      impactEl.appendChild(document.createTextNode("."));
    }

    totalEl.textContent = fmtCLP(cart.total());
    summary.style.display = "block";
    actions.style.display = "flex";
  }

  /* ============================================================
     6. PANEL CARRITO — abrir / cerrar
     ============================================================ */
  function openCart() {
    document.getElementById("cart-overlay").classList.add("open");
    document.getElementById("cart-panel").classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    document.getElementById("cart-overlay").classList.remove("open");
    document.getElementById("cart-panel").classList.remove("open");
    document.body.style.overflow = "";
  }
  window.RELORIGEN_OPEN_CART = openCart;
  window.RELORIGEN_CLOSE_CART = closeCart;

  function updateBadge() {
    const badge = document.getElementById("cart-badge");
    if (!badge) return;
    const n = cart.count();
    badge.textContent = n;
    badge.classList.toggle("show", n > 0);
  }

  function addToCart(prod, btn) {
    cart.add(prod);
    renderCart();
    updateBadge();
    openCart();
    // micro-feedback en el botón
    if (btn) {
      const original = btn.innerHTML;
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>Agregado';
      setTimeout(() => { btn.innerHTML = original; }, 900);
    }
  }
  window.RELORIGEN_ADD = addToCart;
  window.RELORIGEN_RENDER_CART = renderCart;

  /* ============================================================
     7. FILTROS POR CATEGORÍA
     ============================================================ */
  function setupFilters() {
    const filtersEl = document.getElementById("filters");
    if (!filtersEl) return;
    filtersEl.addEventListener("click", e => {
      const pill = e.target.closest(".filter-pill");
      if (!pill) return;
      const cat = pill.dataset.cat;
      filtersEl.querySelectorAll(".filter-pill").forEach(p => p.classList.toggle("active", p === pill));
      document.querySelectorAll(".product-card").forEach(card => {
        const match = (cat === "todos") || (card.dataset.cat === cat);
        card.classList.toggle("hidden-by-filter", !match);
      });
    });
  }

  /* ============================================================
     8. EXPAND DE PRODUCTOS RESTANTES
     ============================================================ */
  function setupExpand() {
    const btn = document.getElementById("expand-btn");
    const extra = document.getElementById("catalog-extra");
    if (!btn || !extra) return;
    const lbl = btn.querySelector(".lbl");
    btn.addEventListener("click", () => {
      const open = extra.classList.toggle("expanded");
      btn.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      extra.setAttribute("aria-hidden", open ? "false" : "true");
      lbl.textContent = open ? "Ver menos productos" : "Ver los 8 productos restantes";
    });
  }

  /* ============================================================
     9. NAVBAR scrolled
     ============================================================ */
  function setupNavbar() {
    const nav = document.getElementById("navbar");
    if (!nav) return;
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 60);
    }, { passive: true });
  }

  /* ============================================================
     10. SCROLL REVEAL + COUNTERS
     ============================================================ */
  function setupReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(el => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(el => io.observe(el));
  }

  function setupCounters() {
    const counters = document.querySelectorAll(".cv[data-target]");
    if (!counters.length) return;
    function animate(el) {
      const target = parseInt(el.dataset.target, 10);
      const dur = 1400, t0 = performance.now();
      const ease = t => 1 - Math.pow(1 - t, 3);
      function step(now) {
        const p = Math.min(1, (now - t0) / dur);
        el.textContent = Math.round(ease(p) * target).toLocaleString("es-CL");
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if (!("IntersectionObserver" in window)) { counters.forEach(animate); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animate(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => io.observe(c));
  }

  /* ============================================================
     11. CART CONTROLES (qty +/-, remove)
     ============================================================ */
  function setupCartControls() {
    const body = document.getElementById("cart-body");
    const overlay = document.getElementById("cart-overlay");
    const closeBtn = document.getElementById("cart-close");
    const cartBtn = document.getElementById("cart-btn");

    if (cartBtn) cartBtn.addEventListener("click", openCart);
    if (closeBtn) closeBtn.addEventListener("click", closeCart);
    if (overlay) overlay.addEventListener("click", closeCart);

    if (body) {
      body.addEventListener("click", e => {
        const inc = e.target.closest("[data-inc]");
        const dec = e.target.closest("[data-dec]");
        const rem = e.target.closest("[data-rem]");
        if (inc) {
          const id = parseInt(inc.dataset.inc, 10);
          const it = cart.items.find(i => i.id === id);
          if (it) { cart.update(id, it.cantidad + 1); renderCart(); updateBadge(); }
        }
        if (dec) {
          const id = parseInt(dec.dataset.dec, 10);
          const it = cart.items.find(i => i.id === id);
          if (it) {
            if (it.cantidad <= 1) { cart.remove(id); }
            else { cart.update(id, it.cantidad - 1); }
            renderCart(); updateBadge();
          }
        }
        if (rem) {
          const id = parseInt(rem.dataset.rem, 10);
          cart.remove(id);
          renderCart(); updateBadge();
        }
      });
    }
  }

  /* ============================================================
     12. FORMULARIO PRODUCTO PERSONALIZADO
     ============================================================ */
  function setupCustomForm() {
    const form = document.getElementById("custom-form");
    if (!form) return;
    form.addEventListener("submit", e => {
      e.preventDefault();
      const nombre  = form.nombre.value.trim();
      const prod    = form.producto.value.trim();
      const mat     = form.material.value;
      const cant    = form.cantidad.value;
      const cont    = form.contacto.value.trim();
      const msg =
        "Hola Re·origen, me llamo " + nombre + ". " +
        "Estoy buscando " + prod + ", " +
        "idealmente en " + mat + ", aproximadamente " + cant + " unidades. " +
        "Mi contacto: " + cont;
      const url = "https://wa.me/56992924314?text=" + encodeURIComponent(msg);
      window.open(url, "_blank", "noopener");
    });
  }

  /* ============================================================
     13. INIT
     ============================================================ */
  document.addEventListener("DOMContentLoaded", () => {
    cart.load();
    renderCatalog();
    renderCart();
    updateBadge();
    setupFilters();
    setupExpand();
    setupNavbar();
    setupReveal();
    setupCounters();
    setupCartControls();
    setupCustomForm();
  });
})();
