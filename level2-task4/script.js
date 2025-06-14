// Register new user
function register() {
  const username = document.getElementById("register-username").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const message = document.getElementById("register-msg");

  if (!username || !password) {
    message.innerText = "Username and Password required.";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[username]) {
    message.innerText = "Username already exists!";
    return;
  }

  users[username] = password;
  localStorage.setItem("users", JSON.stringify(users));
  message.innerText = "Registered successfully!";
  document.getElementById("register-username").value = "";
  document.getElementById("register-password").value = "";
}

// Login user
function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const message = document.getElementById("login-msg");

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username] && users[username] === password) {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "home.html";
  } else {
    message.innerText = "Invalid username or password.";
  }
}

// Show logged-in user
function showUsername() {
  const username = localStorage.getItem("loggedInUser");
  if (!username) {
    window.location.href = "index.html";
  } else {
    document.getElementById("username").innerText = username;
  }
}

// Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// Show/hide change password input
function toggleChangePassword() {
  const box = document.getElementById("changePasswordBox");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

// Change password
function changePassword() {
  const newPassword = document.getElementById("newPassword").value.trim();
  const message = document.getElementById("msg");

  if (newPassword.length < 4) {
    message.innerText = "Password must be at least 4 characters.";
    return;
  }

  const username = localStorage.getItem("loggedInUser");
  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (username && users[username]) {
    users[username] = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    message.innerText = "Password changed successfully!";
    document.getElementById("newPassword").value = "";
    document.getElementById("changePasswordBox").style.display = "none";
  } else {
    message.innerText = "Something went wrong!";
  }
}
