/* ============================================================
   Re·origen — checkout.js
   - Botón WhatsApp: arma el pedido y abre wa.me prellenado
   - Botón Mercado Pago: muestra modal con resumen + flujo simulado
   ============================================================ */

/* ============================================================
   ACTIVAR MERCADO PAGO REAL
   ============================================================
   Esta demo simula la experiencia de Checkout Pro de MP, pero
   no procesa pagos. Para activar el pago real:

   1. Crear cuenta en mercadopago.cl/developers
   2. Crear aplicación → obtener PUBLIC_KEY y ACCESS_TOKEN de prueba
   3. Desde backend (Node, PHP, Python, etc.) llamar a:
        POST https://api.mercadopago.com/checkout/preferences
        body: { items: [...], back_urls: {...}, auto_return: 'approved' }
        header: Authorization: Bearer ACCESS_TOKEN
        → retorna { id: 'preference_id' }
   4. En este archivo, reemplazar showMPModal() por:

        const mp = new MercadoPago('TU_PUBLIC_KEY', { locale: 'es-CL' });
        mp.checkout({
          preference: { id: preference_id },
          render: { container: '#mp-btn', label: 'Pagar con Mercado Pago' }
        });

   5. En index.html, antes de </body>:
        <script src="https://sdk.mercadopago.com/js/v2"></script>

   Sin backend no es posible generar preference_id de forma segura
   porque expone el ACCESS_TOKEN. El sandbox de MP requiere también
   dos cuentas (vendedor y comprador) configuradas en el panel.
   ============================================================ */

(function () {
  "use strict";

  const cart = window.RELORIGEN_CART;
  const fmtCLP = window.RELORIGEN_FMT;
  const el = window.RELORIGEN_EL;

  if (!cart) {
    console.warn("checkout.js: carrito no disponible");
    return;
  }

  /* ============================================================
     1. WhatsApp — arma mensaje y abre URL
     ============================================================ */
  function buildWhatsAppMessage() {
    if (cart.items.length === 0) return null;
    let msg = "Hola Re·origen, quiero hacer el siguiente pedido:\n\n";
    cart.items.forEach(it => {
      msg += "- " + it.nombre + " x" + it.cantidad + " → " + fmtCLP(it.precio * it.cantidad) + "\n";
    });
    msg += "\nTOTAL: " + fmtCLP(cart.total()) + "\n";
    const agua = cart.totalAgua();
    const co2 = cart.totalCO2();
    if (agua > 0 || co2 > 0) {
      msg += "\n♻ Con este pedido ";
      const partes = [];
      if (agua > 0) partes.push("evitarás contaminar +" + Math.round(agua).toLocaleString("es-CL") + " litros de agua");
      if (co2 > 0) partes.push("reducirás " + co2.toFixed(1) + " kg de CO₂");
      msg += partes.join(" y ") + ".";
    }
    return msg;
  }

  function goToWhatsApp() {
    const msg = buildWhatsAppMessage();
    if (!msg) return;
    const url = "https://wa.me/56992924314?text=" + encodeURIComponent(msg);
    window.open(url, "_blank", "noopener");
  }

  /* ============================================================
     2. Mercado Pago — modal con resumen + flujo simulado
     ============================================================ */
  function renderMPSummary() {
    const sum = document.getElementById("mp-summary");
    if (!sum) return;
    sum.replaceChildren();

    cart.items.forEach(it => {
      sum.appendChild(el("div", { "class": "mp-summary-item" }, [
        el("span", { "class": "name" }, it.nombre),
        el("span", { "class": "qty" }, "×" + it.cantidad),
        el("span", { "class": "val" }, fmtCLP(it.precio * it.cantidad))
      ]));
    });

    // Bloque de impacto
    const agua = cart.totalAgua();
    const co2  = cart.totalCO2();
    if (agua > 0 || co2 > 0) {
      const partes = [];
      if (agua > 0) partes.push("+" + Math.round(agua).toLocaleString("es-CL") + " L de agua protegidos");
      if (co2 > 0)  partes.push(co2.toFixed(1) + " kg CO₂ evitados");
      sum.appendChild(el("div", { "class": "mp-summary-impact" }, partes.join(" · ")));
    }

    sum.appendChild(el("div", { "class": "mp-summary-total" }, [
      el("span", { "class": "lbl" }, "Total a pagar"),
      el("span", { "class": "val" }, fmtCLP(cart.total()))
    ]));
  }

  function showMPModal() {
    if (cart.items.length === 0) return;
    renderMPSummary();
    const overlay = document.getElementById("mp-modal-overlay");
    if (overlay) overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeMPModal() {
    const overlay = document.getElementById("mp-modal-overlay");
    if (overlay) overlay.classList.remove("open");
    // restaurar scroll lock solo si el panel del carrito tampoco está abierto
    const cartPanel = document.getElementById("cart-panel");
    if (!cartPanel || !cartPanel.classList.contains("open")) {
      document.body.style.overflow = "";
    }
  }

  /* ============================================================
     3. Wirear botones
     ============================================================ */
  document.addEventListener("DOMContentLoaded", () => {
    const btnWa     = document.getElementById("btn-wa");
    const btnMp     = document.getElementById("btn-mp");
    const mpClose   = document.getElementById("mp-close");
    const mpGoWa    = document.getElementById("mp-go-wa");
    const mpOverlay = document.getElementById("mp-modal-overlay");

    if (btnWa) btnWa.addEventListener("click", goToWhatsApp);
    if (btnMp) btnMp.addEventListener("click", showMPModal);
    if (mpClose) mpClose.addEventListener("click", closeMPModal);
    if (mpGoWa) mpGoWa.addEventListener("click", () => {
      closeMPModal();
      goToWhatsApp();
    });
    // clic fuera del modal lo cierra
    if (mpOverlay) {
      mpOverlay.addEventListener("click", e => {
        if (e.target === mpOverlay) closeMPModal();
      });
    }
    // escape cierra modal
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeMPModal();
    });
  });
})();
