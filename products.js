(function () {
  /* ──────────────────────────────────────────────
     Product catalogue – central data source
     Each product has: id, name, model, price (numeric),
     image path, category, dateAdded (ISO), popularity (0-100)
     ────────────────────────────────────────────── */
  var PRODUCTS = [
    {
      id: "product-earbud",
      name: "Earbud",
      model: "Earbud Pro X168A",
      price: 18000,
      image: "img/Earbud.png",
      category: "Audio",
      dateAdded: "2026-06-20T10:00:00Z",
      popularity: 92,
      description: "Experience crystal-clear audio with our premium wireless earbuds. Featuring advanced noise isolation and a comfortable ergonomic fit for all-day wear.",
      specs: { "Driver Size": "10mm", "Frequency Response": "20Hz \u2013 20kHz", "Impedance": "32\u03a9", "Battery Life": "8 hrs (32 with case)", "Connectivity": "Bluetooth 5.3", "Weight": "4.5g each" },
    },
    {
      id: "product-headphones",
      name: "Headphones",
      model: "Pro X168A",
      price: 25000,
      image: "img/Headphones.png",
      category: "Audio",
      dateAdded: "2026-05-15T08:30:00Z",
      popularity: 98,
      description: "Immerse yourself in rich, detailed sound with our over-ear headphones. Premium memory foam cushions and adaptive noise cancellation deliver studio-quality audio.",
      specs: { "Driver Size": "40mm", "Frequency Response": "10Hz \u2013 25kHz", "Impedance": "32\u03a9", "Battery Life": "30 hours", "Connectivity": "Bluetooth 5.2 + 3.5mm jack", "Weight": "250g" },
    },
    {
      id: "product-speakers",
      name: "Speakers",
      model: "Pro X168A",
      price: 20000,
      image: "img/Speakers.png",
      category: "Audio",
      dateAdded: "2026-04-10T12:00:00Z",
      popularity: 85,
      description: "Fill any room with powerful, room-filling sound. Dual drivers and a dedicated tweeter deliver crisp highs and thundering bass that brings your music to life.",
      specs: { "Driver Size": '2x 3" woofers + 1" tweeter', "Frequency Response": "50Hz \u2013 20kHz", "Impedance": "8\u03a9", "Battery Life": "12 hours", "Connectivity": "Bluetooth 5.0 + AUX", "Weight": "1.8kg" },
    },
    {
      id: "product-gaming-gear",
      name: "Gaming Gear",
      model: "Pro X168A",
      price: 20000,
      image: "img/Gaming_Gear.png",
      category: "Accessories",
      dateAdded: "2026-06-25T09:00:00Z",
      popularity: 76,
      description: "Dominate the competition with precision-engineered gaming gear. Ergonomic design and durable construction give you the edge in every match.",
      specs: { "Compatibility": "PC, PS5, Xbox Series X", "Material": "Aluminum alloy + rubber grips", "Weight": "180g", "Connectivity": "USB-C wired" },
    },
    {
      id: "product-smart-watch",
      name: "Smart Watch",
      model: "Pro X168A",
      price: 25000,
      image: "img/Smart_Watch.png",
      category: "Wearables",
      dateAdded: "2026-06-22T14:00:00Z",
      popularity: 88,
      description: "Stay connected and track your fitness with our sleek smart watch. Features heart rate monitoring, GPS tracking, and a vibrant AMOLED display.",
      specs: { "Display": '1.4" AMOLED', "Battery Life": "14 days", "Water Resistance": "5 ATM", "Connectivity": "Bluetooth 5.0, GPS", "Weight": "52g" },
    },
    {
      id: "product-power-bank",
      name: "Power Bank",
      model: "Pro X168A",
      price: 20000,
      image: "img/Power_Bank.png",
      category: "Accessories",
      dateAdded: "2026-06-18T11:00:00Z",
      popularity: 70,
      description: "Keep your devices powered all day with our high-capacity power bank. Fast 65W PD charging supports laptops, tablets, and phones.",
      specs: { "Capacity": "20000mAh", "Output Power": "65W PD", "Input": "USB-C 60W", "Battery Type": "Li-Polymer", "Weight": "340g" },
    },
    {
      id: "product-charger-head",
      name: "Charger Head",
      model: "Fast Charge 65W",
      price: 12000,
      image: "img/charger_head.png",
      category: "Chargers",
      dateAdded: "2026-06-10T07:30:00Z",
      popularity: 65,
      description: "Fast and reliable charging for all your USB-C devices. GaN technology delivers 65W of power in a compact, travel-friendly design.",
      specs: { "Output Power": "65W GaN", "Input": "100\u2013240V AC", "Ports": "2x USB-C + 1x USB-A", "Charging Speed": "0\u201350% in 30 min", "Weight": "120g" },
    },
    {
      id: "product-usb-cable",
      name: "USB Cable",
      model: "Braided Type-C 2m",
      price: 5000,
      image: "img/usb_cables.png",
      category: "Chargers",
      dateAdded: "2026-06-05T16:00:00Z",
      popularity: 60,
      description: "Durable braided USB-C cable for fast charging and data sync. Reinforced connectors withstand daily wear and tear.",
      specs: { "Length": "2m", "Material": "Nylon braided", "Data Transfer": "USB 3.1 Gen 2 (10Gbps)", "Charging Power": "100W PD", "Weight": "45g" },
    },
    {
      id: "product-white-airpods",
      name: "White Airpods",
      model: "Eldio Air SE",
      price: 35000,
      image: "img/white-airpods.png",
      category: "Audio",
      dateAdded: "2026-06-26T00:00:00Z",
      popularity: 95,
      description: "Sleek, lightweight true wireless earbuds with exceptional sound quality and seamless device pairing. Perfect for music on the go.",
      specs: { "Driver Size": "12mm", "Frequency Response": "20Hz \u2013 20kHz", "Impedance": "32\u03a9", "Battery Life": "6 hrs (24 with case)", "Connectivity": "Bluetooth 5.3", "Weight": "4g each" },
    },
    {
      id: "product-speaker-portable",
      name: "Portable Speaker",
      model: "Boom Box Mini",
      price: 15000,
      image: "img/Speaker.png",
      category: "Audio",
      dateAdded: "2026-05-28T10:00:00Z",
      popularity: 80,
      description: "Take the party anywhere with our compact, rugged portable speaker. IP67 waterproof and 20-hour battery life for non-stop music outdoors.",
      specs: { "Driver Size": "2x 50mm", "Frequency Response": "60Hz \u2013 20kHz", "Impedance": "4\u03a9", "Battery Life": "20 hours", "Connectivity": "Bluetooth 5.2 + AUX", "Weight": "680g" },
    },
    {
      id: "product-accessories-kit",
      name: "Accessories Kit",
      model: "All-In-One Bundle",
      price: 8500,
      image: "img/Accessories.png",
      category: "Accessories",
      dateAdded: "2026-03-12T09:00:00Z",
      popularity: 55,
      description: "Everything you need in one complete bundle. Includes USB-C cable, charging brick, premium eartips, and a stylish carrying case.",
      specs: { "Includes": "USB-C cable, charging brick, eartips, case", "Compatibility": "All USB-C devices", "Material": "Silicone + aluminum", "Weight": "250g" },
    },
    {
      id: "product-charger-wireless",
      name: "Wireless Charger",
      model: "MagPad Pro 15W",
      price: 16000,
      image: "img/Chargers.png",
      category: "Chargers",
      dateAdded: "2026-06-01T13:00:00Z",
      popularity: 72,
      description: "Effortless wireless charging with 15W fast charging for all Qi-compatible devices. Sleek pad design with LED indicator.",
      specs: { "Output Power": "15W (Qi)", "Input": "USB-C 18W", "Charging Speed": "0\u201350% in 45 min", "Compatibility": "All Qi devices", "Weight": "95g" },
    },
  ];
  window.PRODUCTS = PRODUCTS;

  /* ── Helpers ── */
  var FAV_KEY = "eldio_favourites";
  var CART_KEY = "eldio_cart";

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

  function parsePrice(str) {
    return Number(String(str).replace(/[^0-9.]/g, "")) || 0;
  }

  function formatPrice(num) {
    return (
      "₦ " +
      Number(num)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  }

  function timeAgo(dateStr) {
    var now = Date.now();
    var then = new Date(dateStr).getTime();
    var diff = now - then;
    var days = Math.floor(diff / 86400000);
    if (days < 1) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return days + " days ago";
    if (days < 30) return Math.floor(days / 7) + "w ago";
    if (days < 365) return Math.floor(days / 30) + "mo ago";
    return Math.floor(days / 365) + "y ago";
  }

  /* ── State ── */
  var currentSort = "default";
  var currentCategory = "all";
  var isListView = false;

  /* ── Build unique category list ── */
  function getCategories() {
    var cats = {};
    PRODUCTS.forEach(function (p) {
      cats[p.category] = true;
    });
    return Object.keys(cats).sort();
  }

  /* ── Filter + Sort ── */
  function getFilteredProducts() {
    var list = PRODUCTS.slice();

    // Category filter
    if (currentCategory !== "all") {
      list = list.filter(function (p) {
        return p.category === currentCategory;
      });
    }

    // Sort
    switch (currentSort) {
      case "price-low":
        list.sort(function (a, b) { return a.price - b.price; });
        break;
      case "price-high":
        list.sort(function (a, b) { return b.price - a.price; });
        break;
      case "newest":
        list.sort(function (a, b) { return new Date(b.dateAdded) - new Date(a.dateAdded); });
        break;
      case "popular":
        list.sort(function (a, b) { return b.popularity - a.popularity; });
        break;
      case "name-az":
        list.sort(function (a, b) { return a.name.localeCompare(b.name); });
        break;
      case "name-za":
        list.sort(function (a, b) { return b.name.localeCompare(a.name); });
        break;
      default:
        break;
    }

    return list;
  }

  /* ── Card HTML builder ── */
  function heartSVG() {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
  }

  function cartSVG() {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="10" y1="11" x2="14" y2="11"/></svg>';
  }

  function buildCardHTML(product) {
    var favs = loadJSON(FAV_KEY);
    var isFav = favs.some(function (f) { return f.id === product.id; });
    var favClass = isFav ? " active" : "";

    return (
      '<div class="product-card" id="' + product.id + '">' +
        '<div class="product-badge-row">' +
          (product.popularity >= 90 ? '<span class="product-badge product-badge-hot">Best Seller</span>' : '') +
          (isNewArrival(product) ? '<span class="product-badge product-badge-new">New</span>' : '') +
        '</div>' +
        '<div class="product-image-wrapper">' +
          '<img src="' + product.image + '" alt="' + product.name + ' ' + product.model + '" />' +
        '</div>' +
        '<div class="product-info">' +
          '<div class="product-details">' +
            '<h3 class="product-name">' + product.name + '</h3>' +
            '<p class="product-model">' + product.model + '</p>' +
            '<p class="product-price">' + formatPrice(product.price) + '</p>' +
            '<p class="product-meta-date">' + timeAgo(product.dateAdded) + '</p>' +
          '</div>' +
          '<button class="product-fav-btn' + favClass + '" id="fav-' + product.id.replace('product-', '') + '" aria-label="Add ' + product.name + ' to favourites">' +
            heartSVG() +
          '</button>' +
          '<button class="product-cart-btn" id="cart-' + product.id.replace('product-', '') + '" aria-label="Add ' + product.name + ' to cart">' +
            cartSVG() +
          '</button>' +
        '</div>' +
      '</div>'
    );
  }

  function isNewArrival(product) {
    var diff = Date.now() - new Date(product.dateAdded).getTime();
    return diff < 7 * 86400000; // within 7 days
  }

  /* ── Render products ── */
  function render() {
    var grid = document.getElementById("all-products-grid");
    var empty = document.getElementById("all-products-empty");
    var countEl = document.getElementById("filter-results-count");
    if (!grid) return;

    var products = getFilteredProducts();

    // Update count
    if (countEl) countEl.textContent = products.length;

    // Show/hide empty
    if (products.length === 0) {
      grid.style.display = "none";
      empty.style.display = "flex";
    } else {
      grid.style.display = "";
      empty.style.display = "none";
    }

    // View mode
    if (isListView) {
      grid.classList.add("all-products-list");
    } else {
      grid.classList.remove("all-products-list");
    }

    // Build HTML
    var html = "";
    products.forEach(function (p) {
      html += buildCardHTML(p);
    });
    grid.innerHTML = html;

    // Re-bind favourite & cart buttons
    bindCardButtons();
    updateActiveFilters();
  }

  /* ── Card button event binding ── */
  function bindCardButtons() {
    var favs = loadJSON(FAV_KEY);
    var cart = loadJSON(CART_KEY);

    document.querySelectorAll("#all-products-grid .product-card").forEach(function (card) {
      card.addEventListener("click", function (e) {
        if (e.target.closest(".product-fav-btn") || e.target.closest(".product-cart-btn")) return;
        window.location.href = "product.html?id=" + this.id;
      });
    });

    document.querySelectorAll("#all-products-grid .product-fav-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var card = this.closest(".product-card");
        if (!card) return;
        var product = PRODUCTS.find(function (p) { return p.id === card.id; });
        if (!product) return;
        var data = { id: product.id, name: product.name, model: product.model, price: formatPrice(product.price), image: product.image };
        var favList = loadJSON(FAV_KEY);
        var idx = favList.findIndex(function (f) { return f.id === data.id; });
        if (idx > -1) {
          favList.splice(idx, 1);
          this.classList.remove("active");
        } else {
          favList.push(data);
          this.classList.add("active");
        }
        saveJSON(FAV_KEY, favList);
      });
    });

    document.querySelectorAll("#all-products-grid .product-cart-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var card = this.closest(".product-card");
        if (!card) return;
        var product = PRODUCTS.find(function (p) { return p.id === card.id; });
        if (!product) return;
        var data = { id: product.id, name: product.name, model: product.model, price: formatPrice(product.price), image: product.image };
        openProductModal(data);
      });
    });
  }

  /* ── Product modal logic (reused from favourite.js pattern) ── */
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

  /* ── Dropdown toggle ── */
  function setupDropdown(btnId, menuId) {
    var btn = document.getElementById(btnId);
    var menu = document.getElementById(menuId);
    if (!btn || !menu) return;

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      // Close other dropdowns
      document.querySelectorAll(".filter-dropdown-menu.open").forEach(function (m) {
        if (m !== menu) m.classList.remove("open");
      });
      document.querySelectorAll(".filter-dropdown-btn[aria-expanded='true']").forEach(function (b) {
        if (b !== btn) b.setAttribute("aria-expanded", "false");
      });
      var isOpen = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen);
    });
  }

  /* ── Close dropdowns on outside click ── */
  function closeAllDropdowns() {
    document.querySelectorAll(".filter-dropdown-menu.open").forEach(function (m) {
      m.classList.remove("open");
    });
    document.querySelectorAll(".filter-dropdown-btn[aria-expanded='true']").forEach(function (b) {
      b.setAttribute("aria-expanded", "false");
    });
  }

  /* ── Active filters chips ── */
  function updateActiveFilters() {
    var container = document.getElementById("active-filters");
    var list = document.getElementById("active-filters-list");
    if (!container || !list) return;

    var chips = [];
    if (currentCategory !== "all") {
      chips.push({ type: "category", label: "Category: " + currentCategory });
    }
    if (currentSort !== "default") {
      var sortLabels = {
        "price-low": "Price: Low to High",
        "price-high": "Price: High to Low",
        "newest": "Newest Arrivals",
        "popular": "Best Sellers",
        "name-az": "Name: A – Z",
        "name-za": "Name: Z – A",
      };
      chips.push({ type: "sort", label: "Sort: " + (sortLabels[currentSort] || currentSort) });
    }

    if (chips.length === 0) {
      container.style.display = "none";
      return;
    }

    container.style.display = "flex";
    var html = "";
    chips.forEach(function (chip) {
      html +=
        '<button class="active-filter-chip" data-type="' + chip.type + '">' +
          '<span>' + chip.label + '</span>' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>';
    });
    list.innerHTML = html;

    // Bind chip close buttons
    list.querySelectorAll(".active-filter-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var type = this.getAttribute("data-type");
        if (type === "category") {
          currentCategory = "all";
          updateCategoryDropdown();
        }
        if (type === "sort") {
          currentSort = "default";
          updateSortDropdown();
        }
        render();
      });
    });
  }

  function updateCategoryDropdown() {
    document.querySelectorAll("#filter-category-menu .filter-option").forEach(function (opt) {
      opt.classList.toggle("active", opt.getAttribute("data-category") === currentCategory);
    });
    var label = currentCategory === "all" ? "Category" : currentCategory;
    var btn = document.getElementById("filter-category-btn");
    if (btn) btn.querySelector("span").textContent = label;
  }

  function updateSortDropdown() {
    document.querySelectorAll("#filter-sort-menu .filter-option").forEach(function (opt) {
      opt.classList.toggle("active", opt.getAttribute("data-sort") === currentSort);
    });
    var btn = document.getElementById("filter-sort-btn");
    if (!btn) return;
    var sortLabels = {
      "default": "Sort by",
      "price-low": "Price: Low → High",
      "price-high": "Price: High → Low",
      "newest": "Newest Arrivals",
      "popular": "Best Sellers",
      "name-az": "Name: A – Z",
      "name-za": "Name: Z – A",
    };
    btn.querySelector("span").textContent = sortLabels[currentSort] || "Sort by";
  }

  /* ── Build category filter options ── */
  function buildCategoryOptions() {
    var menu = document.getElementById("filter-category-menu");
    if (!menu) return;
    var cats = getCategories();
    var html = '<button class="filter-option active" data-category="all">All Categories</button>';
    cats.forEach(function (cat) {
      html += '<button class="filter-option" data-category="' + cat + '">' + cat + '</button>';
    });
    menu.innerHTML = html;
  }

  /* ── Store product data for search widget ── */
  function saveSearchData() {
    try {
      var searchData = PRODUCTS.map(function (p) {
        return {
          id: p.id,
          name: p.name,
          model: p.model,
          price: formatPrice(p.price),
          image: p.image,
        };
      });
      localStorage.setItem("eldio_products", JSON.stringify(searchData));
    } catch (e) {}
  }

  /* ── Init ── */
  function init() {
    saveSearchData();

    // Guard: only run full init on the products page
    if (!document.getElementById("all-products-grid")) return;

    buildCategoryOptions();

    // Setup dropdowns
    setupDropdown("filter-category-btn", "filter-category-menu");
    setupDropdown("filter-sort-btn", "filter-sort-menu");

    // Close dropdowns on outside click
    document.addEventListener("click", function () {
      closeAllDropdowns();
    });

    // Category selection
    document.getElementById("filter-category-menu").addEventListener("click", function (e) {
      var opt = e.target.closest(".filter-option");
      if (!opt) return;
      currentCategory = opt.getAttribute("data-category");
      updateCategoryDropdown();
      closeAllDropdowns();
      render();
    });

    // Sort selection
    document.getElementById("filter-sort-menu").addEventListener("click", function (e) {
      var opt = e.target.closest(".filter-option");
      if (!opt) return;
      currentSort = opt.getAttribute("data-sort");
      updateSortDropdown();
      closeAllDropdowns();
      render();
    });

    // View toggle
    var gridBtn = document.getElementById("view-grid");
    var listBtn = document.getElementById("view-list");
    if (gridBtn && listBtn) {
      gridBtn.addEventListener("click", function () {
        isListView = false;
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
        render();
      });
      listBtn.addEventListener("click", function () {
        isListView = true;
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
        render();
      });
    }

    // Clear all filters
    var clearBtn = document.getElementById("active-filters-clear");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        currentSort = "default";
        currentCategory = "all";
        updateCategoryDropdown();
        updateSortDropdown();
        render();
      });
    }

    // Reset filters from empty state
    var resetBtn = document.getElementById("reset-filters-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        currentSort = "default";
        currentCategory = "all";
        updateCategoryDropdown();
        updateSortDropdown();
        render();
      });
    }

    // Read URL query params for pre-applied filters
    var urlParams = new URLSearchParams(window.location.search);
    var sortParam = urlParams.get("sort");
    var categoryParam = urlParams.get("category");
    var validSorts = ["price-low", "price-high", "newest", "popular", "name-az", "name-za"];
    if (sortParam && validSorts.indexOf(sortParam) > -1) {
      currentSort = sortParam;
      updateSortDropdown();
    }
    if (categoryParam && categoryParam !== "all") {
      var cats = getCategories();
      if (cats.indexOf(categoryParam) > -1) {
        currentCategory = categoryParam;
        updateCategoryDropdown();
      }
    }

    // Initial render
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
