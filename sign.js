const form = document.getElementById("signup-form");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.find(user => user.email === email);

  if (userExists) {
    alert("Email already exists ❌");
    return;
  }

  const newUser = {
    name,
    email,
    password
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully ✅");

  window.location.href = "login.html";
});


