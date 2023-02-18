var signInEmailInput = document.getElementById("uEmail");
var signInPasswordInput = document.getElementById("uPassword");
var signInBtn = document.querySelector("#signIn");
var signInSuccess = document.querySelector("#signInSuccess");
var infoMessage = document.querySelector(".info-message");
var passwordToggler = document.getElementById("showPassword");

if (localStorage.getItem("userDataBase") != null) {
  usersList = JSON.parse(localStorage.getItem("userDataBase"));
}

passwordToggler.addEventListener("click", function () {
  showPassword();
});

signInBtn.addEventListener("click", function () {
  checkUserData();
});

function checkUserData() {
  if (
    signInEmailInput.value.length == 0 ||
    signInPasswordInput.value.length == 0
  ) {
    infoMessage.innerHTML = "Email and password are required.";
  } else if (localStorage.getItem("userDataBase") != null) {
    for (var i = 0; i < usersList.length; i++) {
      if (
        signInEmailInput.value.toLowerCase() == usersList[i].userEmail &&
        signInPasswordInput.value == usersList[i].userPassword
      ) {
        signInSuccess.setAttribute("href", "home.html");
      } else {
        infoMessage.innerHTML = "Incorrect email or password.";
      }
    }
  } else {
    infoMessage.innerHTML = "Incorrect email or password.";
  }
}

function showPassword() {
  if (signInPasswordInput.type === "password") {
    signInPasswordInput.type = "text";
  } else {
    signInPasswordInput.type = "password";
  }
}
