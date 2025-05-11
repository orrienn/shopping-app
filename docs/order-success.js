function formatPrice(p) {
    const total = p.main + p.fractional / 100;
    return total.toFixed(2) + " zł";
}

const data = localStorage.getItem("order");

if (data) {
    const cart = JSON.parse(data);
    const list = document.getElementById("order-summary");

    let totalPrice = 0;

    cart.forEach((item) => {
        const { name, price } = item.product;
        const quantity = item.quantity;
        const numericPrice = price.main + price.fractional / 100;
        const itemTotal = numericPrice * quantity;

        totalPrice += itemTotal;

        const li = document.createElement("li");
        li.textContent = `${name} x ${quantity}: ${itemTotal.toFixed(2)} zł`;
        list.appendChild(li);
    });

    const totalEl = document.createElement("p");
    totalEl.innerHTML = `<strong>Suma: ${totalPrice.toFixed(2)} zł</strong>`;
    list.after(totalEl);

    localStorage.removeItem("order");
}
  