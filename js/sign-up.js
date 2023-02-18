var uNameInput = document.getElementById("uName");
var uEmailInput = document.getElementById("uEmail");
var uPasswordInput = document.getElementById("uPassword");
var registerBtn = document.querySelector("#register");
var infoMessage = document.querySelector(".info-message");
var passwordToggler = document.getElementById("showPassword");

var usersList = [];

if (localStorage.getItem("userDataBase") != null) {
  usersList = JSON.parse(localStorage.getItem("userDataBase"));
}

passwordToggler.addEventListener("click", function () {
  showPassword();
});

registerBtn.addEventListener("click", function () {
  validateAllInputs();
});

function getUserData() {
  var userData = {
    userName: uNameInput.value,
    userEmail: uEmailInput.value,
    userPassword: uPasswordInput.value,
  };
  usersList.push(userData);
  localStorage.setItem("userDataBase", JSON.stringify(usersList));
  infoMessage.innerHTML = "Registration success.";
  infoMessage.classList.replace("text-danger", "text-success");
  clearInputs();
}

function validateAllInputs() {
  if (
    uNameInput.value.length == 0 ||
    uEmailInput.value.length == 0 ||
    uPasswordInput.value.length == 0
  ) {
    infoMessage.innerHTML = "All inputs are required are required.";
    infoMessage.classList.replace("text-success", "text-danger");
  } else if (
    validateEmail(this.value) == true &&
    validatePassword(this.value) == true
  ) {
    checkStorageAndData();
  }
}

function checkStorageAndData() {
  if (localStorage.getItem("userDataBase") != null) {
    for (var i = 0; i < usersList.length; i++) {
      if (uEmailInput.value == usersList[i].userEmail) {
        infoMessage.innerHTML = "Email Already Exists.";
        infoMessage.classList.replace("text-success", "text-danger");
        return;
      }
    }
    getUserData();
  } else {
    getUserData();
  }
}

function clearInputs() {
  uNameInput.value = "";
  uEmailInput.value = "";
  uPasswordInput.value = "";
}

function validateEmail() {
  var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (validEmail.test(uEmailInput.value)) {
    infoMessage.innerHTML = "";
  } else {
    infoMessage.innerHTML = "Invalid Email.";
    infoMessage.classList.replace("text-success", "text-danger");
  }
  return validEmail.test(uEmailInput.value);
}

function validatePassword() {
  var validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (validPassword.test(uPasswordInput.value)) {
    infoMessage.innerHTML = "";
  } else {
    infoMessage.innerHTML =
      "Password must have at least 8 characters of (a-z)(A-Z)(0-9)";
    infoMessage.classList.replace("text-success", "text-danger");
  }
  return validPassword.test(uPasswordInput.value);
}

function showPassword() {
  if (uPasswordInput.type === "password") {
    uPasswordInput.type = "text";
  } else {
    uPasswordInput.type = "password";
  }
}
