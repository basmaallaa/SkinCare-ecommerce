const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  alert("Please login first");
  window.location.href = "login.html";
}

const cartKey = `cart_${currentUser.email}`;

let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

const cartContainer = document.getElementById("cart-container");
const totalPriceEl = document.getElementById("total-price");
const subtotalEl = document.getElementById("subtotal");



function updateCartCount() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    document.querySelectorAll(".cart-count").forEach(el => {
      el.textContent = 0;
    });
    return;
  }

  const cartKey = `cart_${currentUser.email}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = count;
  });
}





function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="text-center mt-10 space-y-4">
    <p class="text-gray-500 text-lg">Your cart is empty 🛒</p>
    <a href="productList.html" class="bg-lime-950 text-white px-5 py-2 rounded-full">
      Shop Now
    </a>
  </div>
    `;
    subtotalEl.textContent = "$0";
    totalPriceEl.textContent = "$0";
    return;
  }

  cart.forEach(item => {
    const priceNum = item.price ? Number(String(item.price).replace("$", "")) : 0;
    total += priceNum * item.quantity;
    const div = document.createElement("div");
    div.className = "flex items-center bg-white p-3 rounded-xl shadow flex-wrap lg:flex-nowrap";

    div.innerHTML = `
      <img src="${item.image}" class="w-24 h-24 object-cover rounded-lg mr-4 mb-2 lg:mb-0">
      <div class="flex-1">
        <h3 class="font-semibold text-lime-950">${item.name}</h3>
        <p class="text-lime-950">${item.price}</p>
        <div class="flex items-center gap-2 mt-2">
          <button class="px-2 py-1 bg-gray-200 rounded remove-btn">-</button>
          <span class="px-2 text-lime-950">${item.quantity}</span>
          <button class="px-2 py-1 bg-gray-200 rounded add-btn">+</button>
        </div>
      </div>
      <div class="text-right mt-2 lg:mt-0">
    <button class="remove-item flex items-center gap-2 text-red-500 hover:text-white border border-red-200 hover:bg-red-500 px-3 py-1.5 rounded-full transition-all duration-300">
  
        <i class="fa-solid fa-trash text-sm"></i>
        <span class="text-sm font-medium">Remove</span>

    </button>
      </div>
    `;

    div.querySelector(".remove-item").addEventListener("click", () => removeItem(item.id));
    div.querySelector(".add-btn").addEventListener("click", () => changeQuantity(item.id, 1));
    div.querySelector(".remove-btn").addEventListener("click", () => changeQuantity(item.id, -1));
    cartContainer.appendChild(div);

    
  });

subtotalEl.textContent = `$${total.toFixed(2)}`;
  totalPriceEl.textContent = `$${(total + 4 - 2).toFixed(2)}`;
}
updateCartCount();
renderCart();

function removeItem(id) {

  cart = cart.filter(item => item.id !== id);

localStorage.setItem(cartKey, JSON.stringify(cart));
  cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  renderCart();
  updateCartCount();
}

function changeQuantity(id, delta) {
  cart = cart.map(item => {
    if(item.id === id){
      item.quantity += delta;
      if(item.quantity < 1) item.quantity = 1;
    }
    return item;
  });
  localStorage.setItem(cartKey, JSON.stringify(cart));
    cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  renderCart();
  updateCartCount();
}

renderCart();