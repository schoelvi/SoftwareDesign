"use strict";
var Endabgabe;
(function (Endabgabe) {
    let url;
    let urlsearchParameters;
    let answer = document.getElementById("antwort");
    let hinweis = document.getElementById("hinweis");
    let sperren1 = document.getElementById("sperren1");
    let sperren2 = document.getElementById("sperren2");
    let registerButtons = document.getElementById("register");
    registerButtons.addEventListener("click", openSend);
    // Checking if the User exists 
    async function checkExistence() {
        url = "http://localhost:8100/";
        let u = url + "compareUserdata" + "?" + "name=" + sperren1.value;
        let response = await fetch(u);
        let showAnswer = await response.text();
        answer.innerText = showAnswer;
        if (showAnswer == "Username existiert bereits.") {
            return true;
        }
        return false;
    }
    // Check if input is put in and send data to database
    async function openSend() {
        if (sperren1.value == "" && sperren2.value == "") {
            hinweis.innerHTML = "Alle Felder müssen ausgefüllt sein.";
        }
        else if (sperren1.value == "") {
            hinweis.innerHTML = "Alle Felder müssen ausgefüllt sein.";
        }
        else if (sperren2.value == "") {
            hinweis.innerHTML = "Alle Felder müssen ausgefüllt sein.";
        }
        else if (!/^[A-Za-z0-9]*$/.test(sperren1.value)) {
            hinweis.innerHTML = "Es dürfen nur alphanumerische Zeichen verwendet werden.";
        }
        else if (await checkExistence()) {
        }
        else {
            //url = "https://gis2021vs.herokuapp.com/";
            url = "http://localhost:8100/";
            let formData = new FormData(document.forms[0]);
            urlsearchParameters = new URLSearchParams(formData);
            url += "datenSenden" + "?" + urlsearchParameters.toString();
            let response = await fetch(url);
            let showAnswer = await response.text();
            answer.innerText = showAnswer;
            //openStartpage();
        }
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=registration.js.map