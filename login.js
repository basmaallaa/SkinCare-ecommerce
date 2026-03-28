//login

const formlogin = document.getElementById("login-form");

formlogin.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

const foundUser = users.find(user => 
  user.email === email && user.password === password
);

if (foundUser) {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", JSON.stringify(foundUser));

  alert("Login successful ✅");
  window.location.href = "index.html";
} else {
  alert("Wrong email or password ❌");
}
});