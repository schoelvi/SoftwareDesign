"use strict";
var Endabgabe;
(function (Endabgabe) {
    let url;
    let urlsearchParameters;
    let answer = document.getElementById("antwort");
    let hinweis = document.getElementById("hinweis");
    let sperren1 = document.getElementById("sperren1");
    let sperren2 = document.getElementById("sperren2");
    let showHighscoreButton = document.getElementById("showHighscore");
    showHighscoreButton.addEventListener("click", openSend);
    let neuerVersuchButton = document.getElementById("newGame");
    neuerVersuchButton.addEventListener("click", openGame);
    //Verlinkungen auf andere Seiten
    function openGame() {
        window.open("game.html", "_self");
        console.log("open Game");
    }
    function openHighscore() {
        window.open("highscore.html", "_self");
        console.log("open Highscore");
    }
    // Daten des Spielers zusammen mit den Daten (Zeit, Versuche) in die Datenbank abschicken
    async function openSend() {
        if (sperren1.value == "" && sperren2.value == "") {
            hinweis.innerHTML = "Beide Felder müssen ausgefüllt sein.";
        }
        else {
            url = "https://gis2021vs.herokuapp.com/";
            //url = "http://localhost:8100/";
            let formData = new FormData(document.forms[0]);
            urlsearchParameters = new URLSearchParams(formData);
            url += "datenSenden" + "?" + urlsearchParameters.toString() + "&" + "Zeit=" + localStorage.getItem("Zeit") + "&" + "Versuche=" + localStorage.getItem("Versuche");
            let response = await fetch(url);
            let showAnswer = await response.text();
            answer.innerText = showAnswer;
            openHighscore();
        }
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=login.js.map