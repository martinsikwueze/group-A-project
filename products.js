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
      model: "Earbud Classic",
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
      model: "AuraPhones 200",
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
      model: "Duet Speakers",
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
      model: "StrikePack Pro",
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
      model: "FitWatch Pro",
      price: 25000,
      image: "img/Smart_Watch.png",
      category: "Accessories",
      dateAdded: "2026-06-22T14:00:00Z",
      popularity: 88,
      description: "Stay connected and track your fitness with our sleek smart watch. Features heart rate monitoring, GPS tracking, and a vibrant AMOLED display.",
      specs: { "Display": '1.4" AMOLED', "Battery Life": "14 days", "Water Resistance": "5 ATM", "Connectivity": "Bluetooth 5.0, GPS", "Weight": "52g" },
    },
    {
      id: "product-power-bank",
      name: "Power Bank",
      model: "PowerMax 20K",
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
    {
      id: "product-charger-head-compact",
      name: "Compact Charger Head",
      model: "GaN 45W Mini",
      price: 8000,
      image: "img/ChargerHead1.png",
      category: "Chargers",
      dateAdded: "2026-06-26T10:00:00Z",
      popularity: 62,
      description: "Compact and powerful 45W GaN charger perfect for travel. Fits in any pocket while delivering fast charging for phones, tablets, and laptops.",
      specs: { "Output Power": "45W GaN", "Input": "100\u2013240V AC", "Ports": "1x USB-C", "Charging Speed": "0\u201350% in 35 min", "Weight": "75g" },
    },
    {
      id: "product-charger-head-pro",
      name: "Pro Charger Head",
      model: "GaN 100W Tri-Port",
      price: 18000,
      image: "img/ChargerHead2.png",
      category: "Chargers",
      dateAdded: "2026-06-26T10:00:00Z",
      popularity: 68,
      description: "Ultimate charging station with 100W total output across three ports. Charge your laptop, tablet, and phone simultaneously at full speed.",
      specs: { "Output Power": "100W GaN", "Input": "100\u2013240V AC", "Ports": "2x USB-C + 1x USB-A", "Charging Speed": "0\u201350% in 25 min", "Weight": "150g" },
    },
    {
      id: "product-wireless-earbuds",
      name: "Wireless Earbuds",
      model: "AirSound X1",
      price: 22000,
      image: "img/Earbuds1.png",
      category: "Audio",
      dateAdded: "2026-06-26T10:00:00Z",
      popularity: 78,
      description: "Premium true wireless earbuds with adaptive noise cancellation and rich, balanced sound signature. IPX5 water resistant for active lifestyles.",
      specs: { "Driver Size": "10mm", "Frequency Response": "20Hz \u2013 20kHz", "Impedance": "32\u03a9", "Battery Life": "7 hrs (28 with case)", "Connectivity": "Bluetooth 5.3", "Weight": "5g each" },
    },
    {
      id: "product-earbuds-pro",
      name: "Earbuds Pro",
      model: "AirSound Pro 2",
      price: 28000,
      image: "img/Earbuds2.png",
      category: "Audio",
      dateAdded: "2026-06-26T10:00:00Z",
      popularity: 82,
      description: "Our most advanced earbuds featuring hybrid active noise cancellation, spatial audio support, and a premium build with wireless charging case.",
      specs: { "Driver Size": "11mm", "Frequency Response": "10Hz \u2013 22kHz", "Impedance": "32\u03a9", "Battery Life": "8 hrs (32 with case)", "Connectivity": "Bluetooth 5.3 + Multipoint", "Weight": "5.5g each" },
    },
    {
      id: "product-earbuds-lite",
      name: "Earbuds Lite",
      model: "AirSound Lite",
      price: 12000,
      image: "img/Earbuds3.png",
      category: "Audio",
      dateAdded: "2026-06-26T10:00:00Z",
      popularity: 70,
      description: "Affordable true wireless earbuds with reliable performance and comfortable fit. Perfect for everyday listening and calls on the go.",
      specs: { "Driver Size": "8mm", "Frequency Response": "20Hz \u2013 20kHz", "Impedance": "32\u03a9", "Battery Life": "5 hrs (20 with case)", "Connectivity": "Bluetooth 5.2", "Weight": "4g each" },
    },
    {
      id: "product-over-ear-headphones",
      name: "Over-Ear Headphones",
      model: "Studio 200",
      price: 30000,
      image: "img/Headphone1.png",
      category: "Audio",
      dateAdded: "2026-06-26T10:00:00Z",
      popularity: 74,
      description: "Professional-grade over-ear headphones with plush memory foam ear cushions and crystal-clear audio reproduction for studio monitoring and casual listening.",
      specs: { "Driver Size": "45mm", "Frequency Response": "10Hz \u2013 25kHz", "Impedance": "38\u03a9", "Cable": "3m detachable", "Connectivity": "3.5mm + 6.35mm adapter", "Weight": "280g" },
    },
    {
      id: "product-on-ear-headphones",
      name: "On-Ear Headphones",
      model: "Urban 100",
      price: 20000,
      image: "img/Headphone2.png",
      category: "Audio",
      dateAdded: "2026-06-26T10:00:00Z",
      popularity: 66,
      description: "Lightweight and stylish on-ear headphones with vibrant sound and foldable design for easy portability. Ideal for commuting and daily use.",
      specs: { "Driver Size": "35mm", "Frequency Response": "15Hz \u2013 22kHz", "Impedance": "32\u03a9", "Battery Life": "20 hours", "Connectivity": "Bluetooth 5.0 + 3.5mm jack", "Weight": "160g" },
    },
    {
      id: "product-wireless-headphones",
      name: "Wireless Headphones",
      model: "Freedom 500",
      price: 35000,
      image: "img/Headphone3.png",
      category: "Audio",
      dateAdded: "2026-06-26T10:00:00Z",
      popularity: 86,
      description: "Premium wireless over-ear headphones with industry-leading noise cancellation and 40-hour battery life. Experience total immersion in your music.",
      specs: { "Driver Size": "40mm", "Frequency Response": "10Hz \u2013 24kHz", "Impedance": "32\u03a9", "Battery Life": "40 hours", "Connectivity": "Bluetooth 5.2 + 3.5mm jack", "Weight": "235g" },
    },
    {
      id: "product-studio-headphones",
      name: "Studio Headphones",
      model: "MixMaster Pro",
      price: 45000,
      image: "img/Headphone5.png",
      category: "Audio",
      dateAdded: "2026-06-26T10:00:00Z",
      popularity: 79,
      description: "Reference-grade studio headphones with ultra-wide frequency response and natural sound signature. Precision-tuned for critical listening and audio production.",
      specs: { "Driver Size": "50mm", "Frequency Response": "5Hz \u2013 30kHz", "Impedance": "64\u03a9", "Cable": "3m coiled", "Connectivity": "3.5mm + 6.35mm adapter", "Weight": "320g" },
    },
    {
      id: "product-microphone",
      name: "Microphone",
      model: "VocalMic Pro",
      price: 15000,
      image: "img/mic1.png",
      category: "Audio",
      dateAdded: "2026-06-26T10:00:00Z",
      popularity: 71,
      description: "Professional condenser microphone with cardioid polar pattern for crystal-clear vocal recording. Perfect for streaming, podcasting, and home studios.",
      specs: { "Polar Pattern": "Cardioid", "Frequency Response": "20Hz \u2013 20kHz", "Sensitivity": "-38dB\u00b12dB", "Connectivity": "USB-C", "Weight": "380g" },
    },
    {
      id: "product-slim-power-bank",
      name: "Slim Power Bank",
      model: "PowerSlim 10K",
      price: 14000,
      image: "img/Powerbank1.png",
      category: "Accessories",
      dateAdded: "2026-06-26T10:00:00Z",
      popularity: 73,
      description: "Ultra-slim 10000mAh power bank that slips easily into any pocket. Fast charging USB-C PD supports phones, earbuds, and small devices.",
      specs: { "Capacity": "10000mAh", "Output Power": "20W PD", "Input": "USB-C 18W", "Battery Type": "Li-Polymer", "Weight": "180g" },
    },
    {
      id: "product-bluetooth-speaker",
      name: "Bluetooth Speaker",
      model: "SoundPod X2",
      price: 25000,
      image: "img/Speaker1.png",
      category: "Audio",
      dateAdded: "2026-06-26T10:00:00Z",
      popularity: 80,
      description: "Portable Bluetooth speaker with 360-degree sound and deep bass. Waterproof and dustproof design makes it perfect for outdoor adventures.",
      specs: { "Driver": '1x 52mm full-range + passive radiator', "Frequency Response": "65Hz \u2013 20kHz", "Battery Life": "16 hours", "Connectivity": "Bluetooth 5.3 + AUX", "Weight": "520g" },
    },
    {
      id: "product-usb-c-cable",
      name: "USB-C Cable",
      model: "UltraSync 1.5m",
      price: 4500,
      image: "img/USB_cable1.png",
      category: "Chargers",
      dateAdded: "2026-06-26T10:00:00Z",
      popularity: 58,
      description: "Premium braided USB-C to USB-C cable with high-speed data transfer and 100W charging support. Reinforced connectors for lasting durability.",
      specs: { "Length": "1.5m", "Material": "Nylon braided", "Data Transfer": "USB 3.2 Gen 2 (10Gbps)", "Charging Power": "100W PD", "Weight": "35g" },
    },
    {
      id: "product-wired-earphone",
      name: "Wired Earphone",
      model: "BassBud Wired",
      price: 6500,
      image: "img/Wiredearphone1.png",
      category: "Audio",
      dateAdded: "2026-06-26T10:00:00Z",
      popularity: 64,
      description: "High-quality wired earphones with deep bass and clear mids. Comfortable in-ear design with tangle-free cable for everyday listening.",
      specs: { "Driver Size": "9mm", "Frequency Response": "18Hz \u2013 22kHz", "Impedance": "16\u03a9", "Cable Length": "1.2m", "Connectivity": "3.5mm jack", "Weight": "15g" },
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
