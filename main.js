function renderUser() {
  const userAreas = document.querySelectorAll(".user-area");

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  userAreas.forEach(userArea => {
    if (isLoggedIn && currentUser) {
      userArea.innerHTML = `
        <span class="text-lime-950 font-medium">Hello, ${currentUser.name}</span>
        <button class="logout-btn bg-red-500 text-white px-3 py-1 rounded-full text-sm">
          Logout
        </button>
      `;
    } else {
      userArea.innerHTML = `
        <a href="login.html" class="w-9 h-9 flex items-center justify-center rounded-full bg-white/60 hover:bg-white">
          <i class="fa-regular fa-user text-lime-950"></i>
        </a>
      `;
    }
  });

  document.querySelectorAll(".logout-btn").forEach(btn => {
    btn.addEventListener("click", logout);
  });
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");

  // localStorage.removeItem(cartKey);
    renderUser();
    updateCartCount();
  window.location.href = "index.html"; 
}
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

window.addEventListener("DOMContentLoaded", () => {
  renderUser();
  updateCartCount();
});