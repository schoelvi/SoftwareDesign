"use strict";
var Endabgabe;
(function (Endabgabe) {
    let url;
    let urlsearchParameters;
    let answer = document.getElementById("antwort");
    let angeklickt = "";
    let bilderDiv = document.getElementById("bilderDatenbank");
    showBild();
    let bildEinfuegenButton = document.getElementById("hinzufuegen");
    bildEinfuegenButton.addEventListener("click", bildHinzufuegen);
    let bildLoeschenButton = document.getElementById("loeschen");
    bildLoeschenButton.addEventListener("click", deleteBild);
    let gameButton = document.getElementById("game");
    gameButton.addEventListener("click", openGame);
    function openGame() {
        window.open("game.html", "_self");
        console.log("open Game");
    }
    //Eingefügte URL an die Datenbank schicken
    async function bildHinzufuegen() {
        url = "https://gis2021vs.herokuapp.com/";
        //url = "http://localhost:8100/";
        let formData = new FormData(document.forms[0]);
        urlsearchParameters = new URLSearchParams(formData);
        console.log("URL gesendet");
        url += "urlSenden" + "?" + urlsearchParameters.toString();
        let response = await fetch(url);
        let showAnswer = await response.text();
        answer.innerText = showAnswer;
    }
    // Bilder aus der Datenbank anzeigen lassen und sie fürs löschen bzw. auswählen vorbereiten
    async function showBild() {
        url = "https://gis2021vs.herokuapp.com/";
        //url = "http://localhost:8100/";
        console.log("Daten empfangen");
        url += "bildReceive";
        let response = await fetch(url);
        let showAnswer = await response.text();
        let daten = JSON.parse(showAnswer);
        console.log(daten);
        for (let zaehler = 0; zaehler < daten.length; zaehler++) {
            let bild = document.createElement("img");
            bild.className = "bilderAdmin";
            bild.id = daten[zaehler]._id;
            bild.addEventListener("click", function () { angeklickt = bild.getAttribute("id"); });
            bild.src = daten[zaehler].url;
            bilderDiv.appendChild(bild);
        }
        let bilderAdmin = document.getElementsByClassName("bilderAdmin");
        if (bilderAdmin.length <= 8) {
            bildLoeschenButton.toggleAttribute("disabled");
            answer.innerText = "Zum Spielen benötigt man mindestens 8 Bilder.";
        }
    }
    //Bilder aus der Datenbank löschen
    async function deleteBild() {
        if (angeklickt == "") {
            answer.innerText = "Es muss ein Bild angeklickt sein. ";
            return;
        }
        url = "https://gis2021vs.herokuapp.com/";
        //url = "http://localhost:8100/";
        console.log("Bild gelöscht");
        url += "bildLoeschen" + "?" + "name=" + angeklickt;
        let response = await fetch(url);
        let showAnswer = await response.text();
        answer.innerText = showAnswer;
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=admin.js.map