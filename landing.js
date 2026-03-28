const text = document.getElementById("text");
  const words = text.innerText.split(" ");

  text.innerHTML = words
    .map(word => `<span class="transition-colors duration-500 text-gray-300">${word}</span>`)
    .join(" ");

  const spans = document.querySelectorAll("#text span");

  window.addEventListener("scroll", () => {
    spans.forEach((span, index) => {
      setTimeout(() => {
        span.classList.remove("text-lime-950/70");
        span.classList.add("text-lime-950");
      }, index * 100); 
    });
  });

  //best seller
  const container = document.getElementById("products-container");

async function fetchProducts() {
  try {
    const response = await fetch("https://69c45768b780a9ba03e9719d.mockapi.io/skin/api/products");
    const products = await response.json();

    const bestSellers = products
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3); 

    bestSellers.forEach(product => {
      const card = document.createElement("div");
      card.className = " rounded-2xl shadow hover:shadow-lg hover:scale-105 transition-transform cursor-pointer";

      card.innerHTML = `
  <div class="relative group overflow-hidden rounded-2xl">
    <img src="${product.image}" 
         class="w-full h-[420px] object-cover rounded-2xl transition duration-500 group-hover:scale-105">
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-[#ECECE6]/80 backdrop-blur-md rounded-xl px-4 py-3 flex justify-between items-center shadow">
      
      <div>
        <h3 class="text-sm font-semibold text-lime-950 uppercase">${product.name}</h3>
        <p class="text-xs text-lime-950">${product.price}</p>
      </div>
      <button class="add-to-cart-btn bg-[#ECECE6] p-2 rounded-full shadow hover:bg-gray-100 transition">
        <i class="fa-solid text-lime-950 fa-cart-shopping text-sm"></i>
      </button>
    </div>

  </div>
`;

      container.appendChild(card);
      const addBtn = card.querySelector(".add-to-cart-btn");
    addBtn.addEventListener("click", () => addToCart(product));
    });

  } catch (error) {
    console.error("Error fetching products:", error);
    container.innerHTML = "<p>Failed to load products.</p>";
  }
}

//add to card
function addToCart(product) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    alert("You must login first");
    window.location.href = "login.html";
    return;
  }
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
  alert("Please login first");
  window.location.href = "login.html";
  return;
}

  const cartKey = `cart_${currentUser.email}`;

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];


  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));

  alert("Added to cart 🛒");
  updateCartCount();
}

fetchProducts();

//f&q

function toggleFAQ(element) {
  const content = element.nextElementSibling;
  const icon = element.querySelector("span");

  content.classList.toggle("hidden");

  if (content.classList.contains("hidden")) {
    icon.textContent = "+";
  } else {
    icon.textContent = "−";
  }
}

//go to category 
function goToCategory(category) {
  localStorage.setItem("selectedCategory", category);
  window.location.href = "productList.html";
}

document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    const dialog = document.getElementById('mobile-menu');
    dialog.close(); // يقفل المينيو
  });
});