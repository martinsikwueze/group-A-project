(function () {
  var FAV_KEY = "eldio_favourites";
  var CART_KEY = "eldio_cart";
  var product = null;

  function loadJSON(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveJSON(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function formatPrice(num) {
    return (
      "\u20A6 " +
      Number(num)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  }

  function updateCartBadge() {
    var cart = loadJSON(CART_KEY);
    document.querySelectorAll("#nav-cart .cart-badge").forEach(function (badge) {
      var count = cart.length;
      badge.textContent = count;
      badge.style.display = count > 0 ? "flex" : "none";
    });
  }

  function init() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");

    if (!id || !window.PRODUCTS) {
      showNotFound();
      return;
    }

    product = window.PRODUCTS.find(function (p) {
      return p.id === id;
    });

    if (!product) {
      showNotFound();
      return;
    }

    populatePage(product);
  }

  function showNotFound() {
    var hero = document.getElementById("product-hero");
    var specs = document.getElementById("product-specs-section");
    var related = document.getElementById("related-products");
    var notFound = document.getElementById("product-not-found");
    if (hero) hero.style.display = "none";
    if (specs) specs.style.display = "none";
    if (related) related.style.display = "none";
    if (notFound) notFound.style.display = "flex";
    document.title = "Product Not Found \u2013 Eldio | Premium Audio Technology";
  }

  function populatePage(product) {
    // Page title
    document.title = product.name + " \u2013 Eldio | Premium Audio Technology";

    // Breadcrumb
    document.getElementById("breadcrumb-product-name").textContent = product.name;

    // Main image
    var mainImg = document.getElementById("product-main-image");
    mainImg.src = product.image;
    mainImg.alt = product.name + " " + product.model;

    // Thumbnails
    var thumbContainer = document.getElementById("product-gallery-thumbnails");
    var thumbHtml = "";
    for (var i = 0; i < 3; i++) {
      thumbHtml +=
        '<div class="product-gallery-thumb' + (i === 0 ? " active" : "") + '" data-index="' + i + '">' +
          '<img src="' + product.image + '" alt="' + product.name + " view " + (i + 1) + '" />' +
        '</div>';
    }
    thumbContainer.innerHTML = thumbHtml;

    // Thumbnail click
    thumbContainer.querySelectorAll(".product-gallery-thumb").forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        thumbContainer.querySelectorAll(".product-gallery-thumb").forEach(function (t) {
          t.classList.remove("active");
        });
        this.classList.add("active");
        mainImg.src = product.image;
      });
    });

    // Name, model, price
    document.getElementById("product-detail-name").textContent = product.name;
    document.getElementById("product-detail-model").textContent = product.model;
    document.getElementById("product-detail-price").textContent = formatPrice(product.price);
    document.getElementById("product-detail-desc").textContent = product.description || "";

    // Category badge
    var badge = document.getElementById("product-detail-badge");
    if (product.category) {
      badge.textContent = product.category;
      badge.style.display = "inline-flex";
    }

    // Specs table
    var specsBody = document.getElementById("product-specs-body");
    var specsHtml = "";
    if (product.specs) {
      var keys = Object.keys(product.specs);
      keys.forEach(function (key, idx) {
        specsHtml +=
          '<tr' + (idx === keys.length - 1 ? ' class="last"' : "") + ">" +
            '<td class="specs-label">' + key + "</td>" +
            '<td class="specs-value">' + product.specs[key] + "</td>" +
          "</tr>";
      });
    }
    specsBody.innerHTML = specsHtml;

    // Quantity selector
    var qtyValue = document.getElementById("product-detail-qty-value");
    document.getElementById("product-detail-qty-minus").addEventListener("click", function () {
      var val = parseInt(qtyValue.textContent, 10);
      if (val > 1) {
        qtyValue.textContent = val - 1;
      }
    });
    document.getElementById("product-detail-qty-plus").addEventListener("click", function () {
      var val = parseInt(qtyValue.textContent, 10);
      qtyValue.textContent = val + 1;
    });

    // Favourite button
    var favBtn = document.getElementById("product-detail-fav-btn");
    var favs = loadJSON(FAV_KEY);
    var isFav = favs.some(function (f) { return f.id === product.id; });
    if (isFav) {
      favBtn.classList.add("active");
    }
    favBtn.addEventListener("click", function () {
      var list = loadJSON(FAV_KEY);
      var idx = list.findIndex(function (f) { return f.id === product.id; });
      if (idx > -1) {
        list.splice(idx, 1);
        this.classList.remove("active");
      } else {
        list.push({
          id: product.id,
          name: product.name,
          model: product.model,
          price: formatPrice(product.price),
          image: product.image,
        });
        this.classList.add("active");
      }
      saveJSON(FAV_KEY, list);
    });

    // Add to Cart button
    document.getElementById("product-detail-add-btn").addEventListener("click", function () {
      var qty = parseInt(qtyValue.textContent, 10);
      var cart = loadJSON(CART_KEY);
      var existing = cart.findIndex(function (c) { return c.id === product.id; });
      if (existing > -1) {
        cart[existing].qty = (cart[existing].qty || 1) + qty;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          model: product.model,
          price: formatPrice(product.price),
          image: product.image,
          qty: qty,
        });
      }
      saveJSON(CART_KEY, cart);
      updateCartBadge();
      var self = this;
      self.classList.add("added");
      setTimeout(function () {
        self.classList.remove("added");
      }, 800);
    });

    // Related products
    renderRelatedProducts(product);
  }

  function renderRelatedProducts(currentProduct) {
    var grid = document.getElementById("related-products-grid");
    if (!grid || !window.PRODUCTS) return;

    var related = window.PRODUCTS.filter(function (p) {
      return p.category === currentProduct.category && p.id !== currentProduct.id;
    });

    // Limit to 4
    related = related.slice(0, 4);

    if (related.length === 0) {
      var section = document.getElementById("related-products");
      if (section) section.style.display = "none";
      return;
    }

    var html = "";
    related.forEach(function (p) {
      var favs = loadJSON(FAV_KEY);
      var isFav = favs.some(function (f) { return f.id === p.id; });

      html +=
        '<div class="product-card" id="' + p.id + '" data-product-id="' + p.id + '">' +
          '<div class="product-badge-row">' +
            (p.popularity >= 90 ? '<span class="product-badge product-badge-hot">Best Seller</span>' : "") +
          "</div>" +
          '<div class="product-image-wrapper">' +
            '<img src="' + p.image + '" alt="' + p.name + " " + p.model + '" />' +
          "</div>" +
          '<div class="product-info">' +
            '<div class="product-details">' +
              '<h3 class="product-name">' + p.name + "</h3>" +
              '<p class="product-model">' + p.model + "</p>" +
              '<p class="product-price">' + formatPrice(p.price) + "</p>" +
            "</div>" +
            '<button class="product-fav-btn' + (isFav ? " active" : "") + '" aria-label="Add ' + p.name + ' to favourites">' +
              '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
            "</button>" +
            '<button class="product-cart-btn" aria-label="Add ' + p.name + ' to cart">' +
              '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="10" y1="11" x2="14" y2="11"/></svg>' +
            "</button>" +
          "</div>" +
        "</div>";
    });

    grid.innerHTML = html;

    // Bind fav/cart buttons for related products
    grid.querySelectorAll(".product-fav-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var card = this.closest(".product-card");
        if (!card) return;
        var prod = window.PRODUCTS.find(function (p) { return p.id === card.id; });
        if (!prod) return;
        var favList = loadJSON(FAV_KEY);
        var idx = favList.findIndex(function (f) { return f.id === prod.id; });
        if (idx > -1) {
          favList.splice(idx, 1);
          this.classList.remove("active");
        } else {
          favList.push({
            id: prod.id,
            name: prod.name,
            model: prod.model,
            price: formatPrice(prod.price),
            image: prod.image,
          });
          this.classList.add("active");
        }
        saveJSON(FAV_KEY, favList);
      });
    });

    grid.querySelectorAll(".product-cart-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var overlay = document.getElementById("product-modal");
        if (!overlay) return;
        var card = this.closest(".product-card");
        if (!card) return;
        var prod = window.PRODUCTS.find(function (p) { return p.id === card.id; });
        if (!prod) return;
        document.getElementById("product-modal-title").textContent = prod.name;
        document.getElementById("product-modal-model").textContent = prod.model;
        document.getElementById("product-modal-price").textContent = formatPrice(prod.price);
        document.getElementById("product-modal-image").src = prod.image;
        document.getElementById("product-modal-image").alt = prod.name;
        document.getElementById("product-modal-qty-value").textContent = "1";
        overlay.classList.add("open");
      });
    });

    // Card navigation for related products
    grid.querySelectorAll(".product-card").forEach(function (card) {
      card.addEventListener("click", function (e) {
        if (e.target.closest(".product-fav-btn") || e.target.closest(".product-cart-btn")) return;
        window.location.href = "product.html?id=" + this.id;
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
