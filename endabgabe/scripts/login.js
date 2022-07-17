"use strict";
var Endabgabe;
(function (Endabgabe) {
    let url;
    let urlsearchParameters;
    let answer = document.getElementById("antwort");
    let hinweis = document.getElementById("hinweis");
    let userName = document.getElementById("userName");
    let signinButton = document.getElementById("signIn");
    signinButton.addEventListener("click", openSend);
    let registrationButton = document.getElementById("newUser");
    registrationButton.addEventListener("click", openRegistration);
    //Links to other pages
    function openRegistration() {
        window.open("registration.html", "_self");
        console.log("open Registratiom");
    }
    function openUserpage() {
        window.open("userpage.html", "_self");
        console.log("open Userpage");
    }
    // Send data to database
    async function openSend() {
        if (userName.value == "") {
            hinweis.innerHTML = "Beide Felder müssen ausgefüllt sein.";
        }
        else {
            //url = "https://softwaredesign22.herokuapp.com/";
            url = "http://localhost:8100/";
            let formData = new FormData(document.forms[0]);
            urlsearchParameters = new URLSearchParams(formData);
            url += "login" + "?" + urlsearchParameters.toString();
            let response = await fetch(url);
            let showAnswer = await response.text();
            answer.innerText = showAnswer;
            if (showAnswer == "Login erfolgreich.") {
                localStorage.setItem('userName', userName.value);
                openUserpage();
            }
        }
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=login.js.map