(function () {
  var PRODUCTS_KEY = "eldio_products";

  function collectProducts() {
    var cards = document.querySelectorAll(".product-card");
    if (!cards.length) return null;
    var products = Array.from(cards).map(function (card) {
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
    });
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {}
    return products;
  }

  function loadProducts() {
    try {
      var data = localStorage.getItem(PRODUCTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function fuzzyMatch(text, query) {
    var t = text.toLowerCase();
    var q = query.toLowerCase();
    var ti = 0;
    for (var qi = 0; qi < q.length; qi++) {
      ti = t.indexOf(q[qi], ti);
      if (ti === -1) return false;
      ti++;
    }
    return true;
  }

  function highlightText(text, query) {
    var lower = text.toLowerCase();
    var q = query.toLowerCase();
    var result = "";
    var qi = 0;
    for (var i = 0; i < text.length; i++) {
      if (qi < q.length && lower[i] === q[qi]) {
        result += "<strong>" + text[i] + "</strong>";
        qi++;
      } else {
        result += text[i];
      }
    }
    return result;
  }

  function renderResults(products, query, dropdown) {
    if (!query) {
      dropdown.classList.remove("open");
      return;
    }
    if (products.length === 0) {
      dropdown.innerHTML =
        '<div class="search-results-empty">No products found</div>';
      dropdown.classList.add("open");
      return;
    }
    var html = "";
    for (var i = 0; i < products.length; i++) {
      var p = products[i];
      html +=
        '<div class="search-result-item" data-id="' +
        p.id +
        '">' +
        '<img class="search-result-img" src="' +
        p.image +
        '" alt="' +
        p.name +
        '" />' +
        '<div class="search-result-info">' +
        '<p class="search-result-name">' +
        highlightText(p.name, query) +
        "</p>" +
        '<p class="search-result-model">' +
        p.model +
        "</p>" +
        '<p class="search-result-price">' +
        p.price +
        "</p>" +
        "</div>" +
        "</div>";
    }
    dropdown.innerHTML = html;
    dropdown.classList.add("open");
  }

  function init() {
    var products = collectProducts();
    if (!products) {
      products = loadProducts();
    }
    var input = document.getElementById("nav-search-input");
    var dropdown = document.getElementById("search-results-dropdown");

    if (!input || !dropdown) return;

    if (!products.length) return;

    input.addEventListener("input", function () {
      var query = this.value.trim();
      var filtered = products.filter(function (p) {
        return fuzzyMatch(p.name, query) || fuzzyMatch(p.model, query);
      });
      renderResults(filtered, query, dropdown);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        dropdown.classList.remove("open");
      }
    });

    document.addEventListener("click", function (e) {
      var resultItem = e.target.closest(".search-result-item");
      if (resultItem) {
        dropdown.classList.remove("open");
        var id = resultItem.getAttribute("data-id");
        if (id) {
          window.location.href = "product.html?id=" + id;
        }
        return;
      }
      if (
        !dropdown.contains(e.target) &&
        e.target !== input &&
        !input.contains(e.target)
      ) {
        dropdown.classList.remove("open");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
