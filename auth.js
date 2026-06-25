(function () {
  var USERS_KEY = "eldio_users";
  var SESSION_KEY = "eldio_current_user";

  function getUsers() {
    try {
      var data = localStorage.getItem(USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function getCurrentUser() {
    try {
      var data = localStorage.getItem(SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function saveSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  function isLoggedIn() {
    return getCurrentUser() !== null;
  }

  function register(firstName, lastName, email, password) {
    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        return { success: false, error: "An account with this email already exists." };
      }
    }
    var user = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    users.push(user);
    saveUsers(users);
    return { success: true };
  }

  function login(email, password) {
    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
        var sessionUser = {
          id: users[i].id,
          firstName: users[i].firstName,
          lastName: users[i].lastName,
          email: users[i].email,
        };
        saveSession(sessionUser);
        return { success: true, user: sessionUser };
      }
    }
    return { success: false, error: "Invalid email or password." };
  }

  function logout() {
    clearSession();
    updateUI();
    closeModal();
  }

  function openModal() {
    var overlay = document.getElementById("user-modal");
    if (!overlay) return;
    var user = getCurrentUser();
    if (!user) return;
    document.getElementById("user-modal-name").textContent = user.firstName + " " + user.lastName;
    document.getElementById("user-modal-email").textContent = user.email;
    var initial = (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
    document.getElementById("user-modal-avatar").textContent = initial;
    overlay.classList.add("open");
  }

  function closeModal() {
    var overlay = document.getElementById("user-modal");
    if (!overlay) return;
    overlay.classList.remove("open");
  }

  function updateUI() {
    var loggedIn = isLoggedIn();
    var user = getCurrentUser();

    var authGroup = document.getElementById("nav-auth-group");
    var userBtn = document.getElementById("nav-user-btn");
    var initialEl = document.getElementById("nav-user-initial");

    if (authGroup) authGroup.style.display = loggedIn ? "none" : "";
    if (userBtn) userBtn.style.display = loggedIn ? "" : "none";
    if (loggedIn && user && initialEl) {
      initialEl.textContent = (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
    }

    var mobileAuth = document.querySelector(".mobile-menu-auth");
    var mobileUser = document.querySelector(".mobile-menu-user");
    if (mobileAuth) mobileAuth.style.display = loggedIn ? "none" : "";
    if (mobileUser) {
      mobileUser.style.display = loggedIn ? "block" : "none";
      if (loggedIn && user) {
        var nameEl = document.getElementById("mobile-user-name");
        var emailEl = document.getElementById("mobile-user-email");
        var avatarEl = document.getElementById("mobile-user-avatar");
        if (nameEl) nameEl.textContent = user.firstName + " " + user.lastName;
        if (emailEl) emailEl.textContent = user.email;
        if (avatarEl) avatarEl.textContent = (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
      }
    }

    var profileIcon = document.getElementById("nav-profile");
    if (profileIcon) {
      if (loggedIn) {
        profileIcon.onclick = function (e) {
          e.preventDefault();
          openModal();
        };
      } else {
        profileIcon.onclick = null;
      }
    }

    if (userBtn) {
      userBtn.onclick = loggedIn
        ? function (e) {
            e.preventDefault();
            openModal();
          }
        : null;
    }
  }

  function initAuthForms() {
    var form = document.querySelector(".auth-form");
    if (!form) return;
    var pageTitle = document.querySelector(".auth-card-title");
    if (!pageTitle) return;
    var text = pageTitle.textContent.trim();

    if (text === "Login") {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var email = form.querySelector('input[name="email"]').value.trim();
        var password = form.querySelector('input[name="password"]').value;
        var result = login(email, password);
        var existingError = form.querySelector(".auth-error");
        if (existingError) existingError.remove();
        if (result.success) {
          window.location.href = "index.html";
        } else {
          var errEl = document.createElement("p");
          errEl.className = "auth-error";
          errEl.textContent = result.error;
          form.insertBefore(errEl, form.querySelector(".auth-submit"));
        }
      });
    } else if (text === "Sign Up") {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var firstName = form.querySelector('input[name="firstName"]').value.trim();
        var lastName = form.querySelector('input[name="lastName"]').value.trim();
        var email = form.querySelector('input[name="email"]').value.trim();
        var password = form.querySelector('input[name="password"]').value;
        var confirm = form.querySelector('input[name="confirmPassword"]').value;
        var existingError = form.querySelector(".auth-error");
        if (existingError) existingError.remove();
        if (password !== confirm) {
          var errEl = document.createElement("p");
          errEl.className = "auth-error";
          errEl.textContent = "Passwords do not match.";
          form.insertBefore(errEl, form.querySelector(".auth-submit"));
          return;
        }
        var result = register(firstName, lastName, email, password);
        if (result.success) {
          window.location.href = "login.html";
        } else {
          var errEl = document.createElement("p");
          errEl.className = "auth-error";
          errEl.textContent = result.error;
          form.insertBefore(errEl, form.querySelector(".auth-submit"));
        }
      });
    }
  }

  function init() {
    if (isLoggedIn()) {
      var pageTitle = document.querySelector(".auth-card-title");
      if (pageTitle) {
        var text = pageTitle.textContent.trim();
        if (text === "Login" || text === "Sign Up") {
          window.location.href = "index.html";
          return;
        }
      }
    }

    updateUI();
    initAuthForms();

    document.addEventListener("click", function (e) {
      var overlay = document.getElementById("user-modal");
      if (overlay && overlay.classList.contains("open")) {
        if (e.target === overlay) {
          closeModal();
          return;
        }
        var closeBtn = e.target.closest("#user-modal-close");
        if (closeBtn) {
          closeModal();
          return;
        }
        var logoutBtn = e.target.closest("#user-modal-logout-btn");
        if (logoutBtn) {
          e.preventDefault();
          logout();
          return;
        }
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeModal();
      }
    });

    var mobileLogout = document.getElementById("mobile-user-logout");
    if (mobileLogout) {
      mobileLogout.addEventListener("click", function (e) {
        e.preventDefault();
        logout();
        var mobileClose = document.getElementById("mobile-menu-close");
        if (mobileClose) mobileClose.click();
      });
    }
  }

  window.EldioAuth = {
    register: register,
    login: login,
    logout: logout,
    isLoggedIn: isLoggedIn,
    getCurrentUser: getCurrentUser,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
