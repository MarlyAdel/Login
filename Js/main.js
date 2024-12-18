"use strict";


//^ To Convert between the SignUp and the signin :-
const formContainer = document.querySelector('.form-container');
const signupBtn = document.querySelector('#signup');
const loginBtn = document.querySelector('#login')

if(signupBtn && loginBtn && formContainer){
    signupBtn.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.classList.add("active");
    });

    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.classList.remove("active");
    });
}


//* Global Variables:-

const signinEmail = document.getElementById('signinEmail');
const signinPassword = document.getElementById('signinPassword');
const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");

let signUpArray = [];
if(localStorage.getItem("user") == null){
   signUpArray = [];
}
else{
  signUpArray = JSON.parse(localStorage.getItem("user"));  
}

let pathparts = location.pathname.split('/');
let theURL = '';
for (let i = 0; i < pathparts.length - 1; i++) {
    theURL += '/' + pathparts[i]
}
// console.log(theURL);

let userName = localStorage.getItem('sessionUsername');
if(userName){
    document.getElementById('userName').innerHTML = "" + userName;
}



//& if the signup inputs are empty or not :-
function signupEmpty(){
   
    if(signupName.value == "" || signupEmail.value == "" || signupPassword.value ==""){
        return false;
    }
    else{
        return true;
    }
}


//& Email validation :-
function emailValidation(){
    for(let i=0 ; i<signUpArray.length ; i++){
        if(signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()){
            return false;
        }
    }
}

//& Sign-Up Form :-

function signup (){
    let signup = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }

    if(signUpArray.length == 0){
        signUpArray.push(signup);
        localStorage.setItem("user", JSON.stringify(signUpArray));
        document.getElementById("validationMessage").innerHTML =`<span class="success-message m-2">Success</span>`;
        return true;
    }

    if(signupEmpty() == false){
        document.getElementById("validationMessage").innerHTML = `<span class="text-danger m-2">All inputs is required</span>`;
        return false;
    }

    if(emailValidation() == false){
        document.getElementById("validationMessage").innerHTML = `<span class="text-danger m-3">email already exists</span>`;
    }
    else{
        signUpArray.push(signup);
        localStorage.setItem("user", JSON.stringify(signUpArray));
        document.getElementById("validationMessage").innerHTML =`<span class="success-message m-2">Success</span>`;
    }
}


//& Login Form :-

function login() {
    const email = signinEmail.value;
    const password = signinPassword.value;

    // console.log('Email:', email);
    // console.log('Password:', password);

    if (!loginEmpty()) {
        document.getElementById("incorrectMessage").innerHTML = `<span class="text-danger m-3">All inputs are required</span>`;
        return false;
    }

    // console.log("Inputs are not empty");

    let userFound = false;

    for (let i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() === email.toLowerCase() && signUpArray[i].password.toLowerCase() === password.toLowerCase()) {
            localStorage.setItem('sessionUsername', signUpArray[i].name);
            if (theURL == "/") {
                window.location.replace( 'home.html');
            } else {
                window.location.replace('home.html');
            }
            userFound = true;
            break; 
        }
    }

    if (!userFound) {
        document.getElementById('incorrectMessage').innerHTML = `<span class="p-2 text-danger">Incorrect email or password</span>`;
    }

}
//& if the login inputs are empty or not :-
function loginEmpty(){

    if(signinEmail.value === "" || signinPassword.value === ""){
        return false;
    }
    else{
        return true;
    }

    //console.log("signinEmail value:", signinEmail.value);
    // console.log("signinPassword value:", signinPassword.value);
}


//& for logout
function logout() {
    localStorage.removeItem('sessionUsername');
    window.location.replace ('index.html');
}



