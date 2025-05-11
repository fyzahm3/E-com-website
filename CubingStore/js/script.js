document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById("cart-items");
        const totalPriceContainer = document.getElementById("total-price");

        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = "";
            let total = 0;

            cart.forEach((item, index) => {
                let price = parseFloat(item.price) * item.quantity;
                let div = document.createElement("div");
                div.classList.add("cart-item");
                div.innerHTML = `
                    <p>${item.name} - ₹${parseFloat(item.price).toFixed(2)} x${item.quantity}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                `;
                cartItemsContainer.appendChild(div);
                total += price;
            });

            totalPriceContainer.textContent = `₹${total.toFixed(2)}`;
        }
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            const product = e.target.parentElement;
            const name = product.getAttribute("data-name");
            let price = parseFloat(product.getAttribute("data-price").replace(/[^0-9.]/g, ""));

            let existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${name} added to cart!`);
            updateCartDisplay();
        });
    });

    window.removeFromCart = (index) => {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    };

    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (cart.length > 0) {
                alert("Checkout successful!");
                cart = [];
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartDisplay();
            } else {
                alert("Your cart is empty!");
            }
        });
    }

    updateCartDisplay();
});
