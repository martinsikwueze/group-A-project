(function () {
  var CART_KEY = "eldio_cart";
  var SHIPPING = 2500;
  var TAX_RATE = 0.075;

  function loadCart() {
    try {
      var data = localStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }

  function parsePrice(s) {
    return parseFloat(s.replace(/[^0-9.]/g, "")) || 0;
  }

  function formatPrice(n) {
    return "₦ " + n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function renderItems(items) {
    var container = document.getElementById("cart-items-container");
    var empty = document.getElementById("cart-empty");
    var summary = document.getElementById("cart-summary");
    if (!container) return;

    if (items.length === 0) {
      container.innerHTML = "";
      if (empty) empty.style.display = "flex";
      if (summary) summary.style.display = "none";
      document.getElementById("cart-count").textContent = "0";
      document.getElementById("cart-badge").textContent = "0";
      document.getElementById("summary-subtotal").textContent = formatPrice(0);
      document.getElementById("summary-shipping").textContent = "₦ 0.00";
      document.getElementById("summary-tax").textContent = formatPrice(0);
      document.getElementById("summary-total").textContent = formatPrice(0);
      return;
    }

    if (empty) empty.style.display = "none";
    if (summary) summary.style.display = "";

    var html = "";
    items.forEach(function (item, idx) {
      var itemId = "cart-item-" + idx;
      html +=
        '<div class="cart-item" id="' + itemId + '" data-price="' + parsePrice(item.price) + '">' +
          '<div class="cart-item-image">' +
            '<img src="' + item.image + '" alt="' + item.name + '" />' +
          '</div>' +
          '<div class="cart-item-body">' +
            '<div class="cart-item-details">' +
              '<h3 class="cart-item-name">' + item.name + '</h3>' +
              '<p class="cart-item-model">' + (item.model || "") + '</p>' +
              '<p class="cart-item-price">' + item.price + '</p>' +
            '</div>' +
            '<div class="cart-item-actions">' +
              '<div class="cart-qty">' +
                '<button class="cart-qty-btn" aria-label="Decrease quantity" data-action="decrease">' +
                  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>' +
                '</button>' +
                '<span class="cart-qty-value">' + (item.qty || 1) + '</span>' +
                '<button class="cart-qty-btn" aria-label="Increase quantity" data-action="increase">' +
                  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>' +
                '</button>' +
              '</div>' +
              '<button class="cart-remove-btn" aria-label="Remove item" data-item="' + itemId + '">' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>';
    });
    container.innerHTML = html;

    // Attach events
    container.querySelectorAll(".cart-qty-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var qtyEl = this.closest(".cart-qty").querySelector(".cart-qty-value");
        var qty = parseInt(qtyEl.textContent, 10);
        if (this.dataset.action === "increase") {
          qty++;
        } else if (this.dataset.action === "decrease" && qty > 1) {
          qty--;
        }
        qtyEl.textContent = qty;
        recalc(items);
      });
    });

    container.querySelectorAll(".cart-remove-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var itemEl = document.getElementById(this.dataset.item);
        if (!itemEl) return;
        var idx = Array.from(itemEl.parentNode.children).indexOf(itemEl);
        itemEl.style.transform = "translateX(100%)";
        itemEl.style.opacity = "0";
        setTimeout(function () {
          items.splice(idx, 1);
          saveCart(items);
          renderItems(items);
          updateBadge(items);
        }, 350);
      });
    });

    recalc(items);
  }

  function recalc(items) {
    var itemEls = document.querySelectorAll("#cart-items-container .cart-item");
    var subtotal = 0;
    var count = 0;

    itemEls.forEach(function (el, idx) {
      var price = parseInt(el.dataset.price, 10);
      var qty = parseInt(el.querySelector(".cart-qty-value").textContent, 10);
      subtotal += price * qty;
      count += qty;
      // Persist qty change to localStorage
      if (items[idx]) {
        items[idx].qty = qty;
      }
    });

    saveCart(items);

    var shipping = itemEls.length > 0 ? SHIPPING : 0;
    var tax = Math.round(subtotal * TAX_RATE);
    var total = subtotal + shipping + tax;

    document.getElementById("summary-subtotal").textContent = formatPrice(subtotal);
    document.getElementById("summary-shipping").textContent = itemEls.length > 0 ? formatPrice(shipping) : "₦ 0.00";
    document.getElementById("summary-tax").textContent = formatPrice(tax);
    document.getElementById("summary-total").textContent = formatPrice(total);
    document.getElementById("cart-count").textContent = count;
    document.getElementById("cart-badge").textContent = count;
  }

  function updateBadge(items) {
    var count = items.length;
    document.querySelectorAll("#nav-cart .cart-badge").forEach(function (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? "flex" : "none";
    });
  }

  // Init
  var items = loadCart();
  renderItems(items);
})();
