const userName = document.querySelector("#Username");
const email = document.querySelector("#emailAddress");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

const userErrormsg = document.querySelector("#username-error");
const emailErrormsg = document.querySelector("#email-error");
const passwordErrormsg = document.querySelector("#password-error");
const confirmPasswordErrormsg = document.querySelector(
  "#conformPassword-error"
);
const RegExps = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // for Email valid
const userNameRegExps = /^([^0-9]*)$/;
const passwordRegExps =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  userName.addEventListener('input' , ()=>{
    onTypeValidation(userName, userNameRegExps,userErrormsg,"Name")
  })
  email.addEventListener("input" , ()=>{
    onTypeValidation(email, RegExps,emailErrormsg,'email')
  })
  password.addEventListener("input",()=>{
    onTypeValidation(password,passwordRegExps,passwordErrormsg,"password")
  })

  let isValid = false;

function registrationHandler() {
 isValid = true;
  const accountCreate = JSON.parse(localStorage.getItem("userDetails")) || [];
  const usernameValue = userName.value.trim();
  if (usernameValue === "") {
    userErrormsg.innerHTML = "Name is required !";
    isValid = false;
  } else if (!userNameRegExps.test(usernameValue)) {
    userErrormsg.innerHTML = "Invalid name !";
    isValid = false;
  } else {
    userErrormsg.innerHTML = "";
  }

  const emailValue = email.value.trim();
  if (emailValue === "") {
    emailErrormsg.innerHTML = "Email is required !";
    isValid = false;
  } else if (!RegExps.test(emailValue)) {
    emailErrormsg.innerHTML = "Invalid Email !";
    isValid = false;
  } else {
    emailErrormsg.innerHTML = "";
  }

  const passwordValue = password.value.trim();
  if (passwordValue === "") {
    passwordErrormsg.innerHTML = "Password is required !";
    isValid = false;
  } else if (!passwordRegExps.test(passwordValue)) {
    passwordErrormsg.innerHTML = "Invalid password !";
    isValid = false;
  } else {
    passwordErrormsg.innerHTML = "";
  }

  if (password.value === "") {
    confirmPasswordErrormsg.innerHTML = "Password is required !";
    isValid = false;
  } else if (passwordValue !== confirmPassword.value) {
    confirmPasswordErrormsg.innerHTML = "Password not match !";
    isValid = false;
  }
  if(isValid){
    const userObject = {
      userName: userName.value,
      email: email.value,
      password: password.value,
    };
    
    accountCreate.push(userObject);
    localStorage.setItem("userDetails", JSON.stringify(accountCreate));
    toggleForm();
  }
  
}

function onTypeValidation(inputElement, regex, errorElement,feildName){
  if(!isValid){
    const inputValue = inputElement.value;
    if(inputValue === ""){
      errorElement.innerHTML = `${feildName} is required !`
    }else if(!regex.test(inputValue)){
       errorElement.innerHTML = `${feildName} is invalid !`
    }else{
       errorElement.innerHTML = ``
    }
  }
}

// Login
const loginUsername = document.querySelector("#loginUsername");
const loginpassword = document.querySelector("#loginpassword");
const loginUserErrormsg = document.querySelector('#loginUser-error');
const logginUserPasswordErrormsg = document.querySelector("#loginPassword-error");

loginUsername.addEventListener("input", () => {
  onTypeValidationforLogin(loginUsername, loginUserErrormsg, "Username");
});

loginpassword.addEventListener("input", () => {
  onTypeValidationforLogin(loginpassword, logginUserPasswordErrormsg, "Password");
});

function onTypeValidationforLogin(loginField, errorField, fieldName) {
  let loginFieldValue = loginField.value;
  if (loginFieldValue === "") {
    errorField.innerHTML = `${fieldName} is required!`;
  } else {
    errorField.innerHTML = ``;
  }
}

function loginHandler() {
  const accountCreate = JSON.parse(localStorage.getItem("userDetails")) || [];
  
  const matchedUser = accountCreate.find((details) => 
    details.userName === loginUsername.value && details.password === loginpassword.value
  );

  if (loginUsername.value === "") {
    loginUserErrormsg.innerHTML = "Username is required!";
  } else if (!matchedUser) {
    loginUserErrormsg.innerHTML = "Invalid Username!";
  } else {
    loginUserErrormsg.innerHTML = "";
  }

  if (loginpassword.value === "") {
    logginUserPasswordErrormsg.innerHTML = "Password is required!";
  } else if (!matchedUser) {
    logginUserPasswordErrormsg.innerHTML = "Invalid Password!";
  } else {
    logginUserPasswordErrormsg.innerHTML = "";
  }

  if (matchedUser) {
    window.location.href = "http://127.0.0.1:5501/landing.html";
  }
}


const toggleForm = () => {
  const container = document.querySelector(".container");
  container.classList.toggle("active");
};
