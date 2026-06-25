(function () {
        const SHIPPING = 2500;
        const TAX_RATE = 0.075;

        function formatPrice(n) {
          return "₦ " + n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        function recalc() {
          const items = document.querySelectorAll(".cart-item");
          let subtotal = 0;
          let count = 0;

          items.forEach(function (item) {
            const price = parseInt(item.dataset.price, 10);
            const qty = parseInt(item.querySelector(".cart-qty-value").textContent, 10);
            subtotal += price * qty;
            count += qty;
          });

          const shipping = items.length > 0 ? SHIPPING : 0;
          const tax = Math.round(subtotal * TAX_RATE);
          const total = subtotal + shipping + tax;

          document.getElementById("summary-subtotal").textContent = formatPrice(subtotal);
          document.getElementById("summary-shipping").textContent = items.length > 0 ? formatPrice(shipping) : "₦ 0.00";
          document.getElementById("summary-tax").textContent = formatPrice(tax);
          document.getElementById("summary-total").textContent = formatPrice(total);
          document.getElementById("cart-count").textContent = count;
          document.getElementById("cart-badge").textContent = count;

          // Show/hide empty state
          document.getElementById("cart-empty").style.display = items.length === 0 ? "flex" : "none";
          document.getElementById("cart-summary").style.display = items.length === 0 ? "none" : "";
        }

        // Quantity buttons
        document.querySelectorAll(".cart-qty-btn").forEach(function (btn) {
          btn.addEventListener("click", function () {
            const qtyEl = this.closest(".cart-qty").querySelector(".cart-qty-value");
            let qty = parseInt(qtyEl.textContent, 10);

            if (this.dataset.action === "increase") {
              qty++;
            } else if (this.dataset.action === "decrease" && qty > 1) {
              qty--;
            }

            qtyEl.textContent = qty;
            recalc();
          });
        });

        // Remove buttons
        document.querySelectorAll(".cart-remove-btn").forEach(function (btn) {
          btn.addEventListener("click", function () {
            const item = document.getElementById(this.dataset.item);
            if (item) {
              item.style.transform = "translateX(100%)";
              item.style.opacity = "0";
              setTimeout(function () {
                item.remove();
                recalc();
              }, 350);
            }
          });
        });

        // Initial calculation
        recalc();
      })();
