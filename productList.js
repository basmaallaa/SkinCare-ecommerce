const container = document.getElementById("products-container");

let allProducts = [];

async function fetchProducts() {
  const res = await fetch("https://69c45768b780a9ba03e9719d.mockapi.io/skin/api/products");
  allProducts = await res.json();
    const selectedCategory = localStorage.getItem("selectedCategory");
  if (selectedCategory) {
  const filtered = allProducts.filter(p =>
    p.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  renderProducts(filtered);
    localStorage.removeItem("selectedCategory");

} else {
  renderProducts(allProducts);
    updateCartCount();

}

}

function renderProducts(products) {
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
        
        <p class="text-2xl font-semibold text-lime-950 mb-2">
          No products found
        </p>

        <p class="text-gray-500 text-sm">
          Try changing your filters
        </p>

      </div>
    `;
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "rounded-2xl shadow hover:shadow-lg hover:scale-105 transition-transform cursor-pointer";

    card.innerHTML = `
      <div class="relative group overflow-hidden rounded-2xl">
        
        <img src="${product.image}" 
             class="w-full h-[380px] object-cover rounded-2xl transition duration-500 group-hover:scale-105">

        <!-- badge -->
        <span class="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
          ${product.category}
        </span>

        <!-- overlay -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-[#ECECE6]/80 backdrop-blur-md rounded-xl px-4 py-3 shadow">
          
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-sm font-semibold text-lime-950 uppercase">${product.name}</h3>
              <p class="text-xs text-lime-950">${product.price}</p>
            </div>

            <button class="add-to-cart-btn bg-[#ECECE6] p-2 rounded-full shadow hover:bg-gray-100 transition">
            <i class="fa-solid fa-cart-shopping text-lime-950 text-sm"></i>
            </button>
          </div>

          <!-- extra details -->
          <div class="flex justify-between items-center mt-2 text-xs text-gray-600">
            <span>⭐ ${product.rating}</span>
            <span class="truncate">${product.description}</span>
          </div>

        </div>
      </div>
    `;

    container.appendChild(card);
       const addBtn = card.querySelector(".add-to-cart-btn");
    addBtn.addEventListener("click", () => addToCart(product));
  });
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


const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const priceFilter = document.getElementById("priceFilter");
const ratingFilter = document.getElementById("ratingFilter");
const priceValue = document.getElementById("priceValue");

const stars = document.querySelectorAll(".star");
const ratingText = document.getElementById("ratingText");

let selectedRating = 0;

// ⭐ اختيار النجوم
stars.forEach(star => {
  star.addEventListener("mouseover", () => {
    const value = Number(star.dataset.value);

    stars.forEach((s, i) => {
      s.classList.toggle("text-yellow-400", i < value);
      s.classList.toggle("text-gray-300", i >= value);
    });
  });

  star.addEventListener("mouseout", () => {
    updateStars(selectedRating);
  });

  star.addEventListener("click", () => {
    selectedRating = Number(star.dataset.value);
    updateStars(selectedRating);
    ratingText.textContent = selectedRating + "+ Stars";
  });
});

function updateStars(value) {
  stars.forEach((s, i) => {
    s.classList.toggle("text-yellow-400", i < value);
    s.classList.toggle("text-gray-300", i >= value);
  });
}

priceFilter.addEventListener("input", () => {
  priceValue.textContent = "$" + priceFilter.value;
});


function applyFilters() {
  let filtered = [...allProducts];

  // category
  const selectedCategories = [...categoryCheckboxes]
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());

  if (selectedCategories.length > 0) {
    filtered = filtered.filter(p =>
      selectedCategories.includes(p.category.toLowerCase())
    );
  }

  // price
  if (priceFilter.value < priceFilter.max) {
    filtered = filtered.filter(p =>
      Number(p.price.replace("$", "")) <= Number(priceFilter.value)
    );
  }

if (selectedRating > 0) {
  filtered = filtered.filter(p =>
    Number(p.rating) >= selectedRating
  );
}

  renderProducts(filtered);
}

const clearBtns = document.querySelectorAll(".clearBtn");

clearBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryCheckboxes.forEach(cb => cb.checked = false);

    selectedRating = 0;
    ratingText.textContent = "All Ratings";

    stars.forEach(s => {
      s.classList.remove("text-yellow-400");
      s.classList.add("text-gray-300");
    });

    priceFilter.value = priceFilter.max;
    priceValue.textContent = "$" + priceFilter.max;

    renderProducts(allProducts);
  });
});

const openBtn = document.getElementById("openFilter");
const closeBtn = document.getElementById("closeFilter");
const drawer = document.getElementById("filterDrawer");

openBtn.addEventListener("click", () => {
  drawer.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  drawer.classList.add("hidden");
});

const applyBtns = document.querySelectorAll(".applyBtn");

applyBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    applyFilters();
    drawer.classList.add("hidden");
  });
});