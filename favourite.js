(function () {
  var FAV_STORAGE_KEY = "eldio_favourites";
  var CART_STORAGE_KEY = "eldio_cart";
  var favourites = loadFavourites();
  var cart = loadCart();

  function loadFavourites() {
    try {
      var data = localStorage.getItem(FAV_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveFavourites() {
    localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favourites));
  }

  function loadCart() {
    try {
      var data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }

  function getProductData(btn) {
    var card = btn.closest(".product-card");
    if (!card) return null;
    var nameEl = card.querySelector(".product-name");
    var modelEl = card.querySelector(".product-model");
    var priceEl = card.querySelector(".product-price");
    var imgEl = card.querySelector(".product-image-wrapper img");
    return {
      id: card.id,
      name: nameEl ? nameEl.textContent.trim() : "",
      model: modelEl ? modelEl.textContent.trim() : "",
      price: priceEl ? priceEl.textContent.trim() : "",
      image: imgEl ? imgEl.getAttribute("src") : "",
    };
  }

  function isFavourited(productId) {
    return favourites.some(function (p) {
      return p.id === productId;
    });
  }

  function toggleFavourite(btn) {
    var data = getProductData(btn);
    if (!data) return;
    var idx = favourites.findIndex(function (p) {
      return p.id === data.id;
    });
    if (idx > -1) {
      favourites.splice(idx, 1);
      btn.classList.remove("active");
    } else {
      favourites.push(data);
      btn.classList.add("active");
    }
    saveFavourites();
  }

  function addToCart(item) {
    var existing = cart.findIndex(function (p) {
      return p.id === item.id;
    });
    var qty = item.qty || 1;
    if (existing > -1) {
      cart[existing].qty = (cart[existing].qty || 1) + qty;
    } else {
      cart.push({ id: item.id, name: item.name, model: item.model, price: item.price, image: item.image, qty: qty });
    }
    saveCart();
    updateCartBadge();
  }

  function updateCartBadge() {
    document.querySelectorAll("#nav-cart .cart-badge").forEach(function (badge) {
      var count = cart.length;
      badge.textContent = count;
      badge.style.display = count > 0 ? "flex" : "none";
    });
  }

  function renderModalItems() {
    var body = document.getElementById("favourites-modal-body");
    if (!body) return;
    if (favourites.length === 0) {
      body.innerHTML =
        '<p class="favourites-empty">No favourites yet.</p>';
      return;
    }
    var html = "";
    favourites.forEach(function (item) {
      html +=
        '<div class="favourites-modal-item" data-id="' +
        item.id +
        '">' +
        '<button class="favourites-item-remove" aria-label="Remove from favourites">&times;</button>' +
        '<img class="favourites-item-img" src="' +
        item.image +
        '" alt="' +
        item.name +
        '" />' +
        '<div class="favourites-item-info">' +
        '<p class="favourites-item-name">' +
        item.name +
        "</p>" +
        '<p class="favourites-item-model">' +
        item.model +
        "</p>" +
        '<p class="favourites-item-price">' +
        item.price +
        "</p>" +
        "</div>" +
        '<button class="favourites-item-cart" aria-label="Add to cart">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>' +
        "</button>" +
        "</div>";
    });
    body.innerHTML = html;

    body.querySelectorAll(".favourites-item-remove").forEach(function (rmBtn) {
      rmBtn.addEventListener("click", function () {
        var itemEl = this.closest(".favourites-modal-item");
        if (!itemEl) return;
        var id = itemEl.getAttribute("data-id");
        favourites = favourites.filter(function (p) {
          return p.id !== id;
        });
        saveFavourites();
        syncActiveButtons();
        renderModalItems();
      });
    });

    body.querySelectorAll(".favourites-item-cart").forEach(function (cartBtn) {
      cartBtn.addEventListener("click", function () {
        var itemEl = this.closest(".favourites-modal-item");
        if (!itemEl) return;
        var id = itemEl.getAttribute("data-id");
        var item = favourites.find(function (p) {
          return p.id === id;
        });
        if (item) {
          addToCart(item);
          this.classList.add("added");
          var self = this;
          setTimeout(function () {
            self.classList.remove("added");
          }, 800);
        }
      });
    });
  }

  function syncActiveButtons() {
    document.querySelectorAll(".product-fav-btn").forEach(function (btn) {
      var data = getProductData(btn);
      if (data && isFavourited(data.id)) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  function openModal() {
    var overlay = document.getElementById("favourites-modal");
    if (!overlay) return;
    renderModalItems();
    overlay.classList.add("open");
  }

  function closeModal() {
    var overlay = document.getElementById("favourites-modal");
    if (!overlay) return;
    overlay.classList.remove("open");
  }

  var currentProduct = null;

  function openProductModal(data) {
    currentProduct = data;
    var overlay = document.getElementById("product-modal");
    if (!overlay) return;
    document.getElementById("product-modal-title").textContent = data.name;
    document.getElementById("product-modal-model").textContent = data.model;
    document.getElementById("product-modal-price").textContent = data.price;
    document.getElementById("product-modal-image").src = data.image;
    document.getElementById("product-modal-image").alt = data.name;
    document.getElementById("product-modal-qty-value").textContent = "1";
    overlay.classList.add("open");
  }

  function closeProductModal() {
    var overlay = document.getElementById("product-modal");
    if (!overlay) return;
    overlay.classList.remove("open");
    currentProduct = null;
  }

  function init() {
    syncActiveButtons();
    updateCartBadge();

    document.addEventListener("click", function (e) {
      var navFav = e.target.closest("#nav-favourite");
      if (navFav) {
        e.preventDefault();
        openModal();
        return;
      }

      var overlay = document.getElementById("favourites-modal");
      if (overlay && overlay.classList.contains("open")) {
        if (e.target === overlay) {
          closeModal();
          return;
        }
        var closeBtn = e.target.closest("#favourites-modal-close");
        if (closeBtn) {
          closeModal();
          return;
        }
      }

      var prodOverlay = document.getElementById("product-modal");
      if (prodOverlay && prodOverlay.classList.contains("open")) {
        if (e.target === prodOverlay) {
          closeProductModal();
          return;
        }
        var prodCloseBtn = e.target.closest("#product-modal-close");
        if (prodCloseBtn) {
          closeProductModal();
          return;
        }
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeModal();
        closeProductModal();
      }
    });

    var qtyMinus = document.getElementById("product-modal-qty-minus");
    if (qtyMinus) {
      qtyMinus.addEventListener("click", function () {
        var valEl = document.getElementById("product-modal-qty-value");
        var val = parseInt(valEl.textContent, 10);
        if (val > 1) {
          valEl.textContent = val - 1;
        }
      });
    }

    var qtyPlus = document.getElementById("product-modal-qty-plus");
    if (qtyPlus) {
      qtyPlus.addEventListener("click", function () {
        var valEl = document.getElementById("product-modal-qty-value");
        var val = parseInt(valEl.textContent, 10);
        valEl.textContent = val + 1;
      });
    }

    var addBtn = document.getElementById("product-modal-add-btn");
    if (addBtn) {
      addBtn.addEventListener("click", function () {
        if (!currentProduct) return;
        var qty = parseInt(document.getElementById("product-modal-qty-value").textContent, 10);
        var item = {
          id: currentProduct.id,
          name: currentProduct.name,
          model: currentProduct.model,
          price: currentProduct.price,
          image: currentProduct.image,
          qty: qty,
        };
        addToCart(item);
        closeProductModal();
      });
    }

    document.querySelectorAll(".product-fav-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        toggleFavourite(this);
      });
    });

    document.querySelectorAll(".product-cart-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var data = getProductData(this);
        if (data) {
          openProductModal(data);
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
