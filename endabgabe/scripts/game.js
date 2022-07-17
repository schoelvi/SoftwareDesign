"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endabgabe = void 0;
var Endabgabe;
(function (Endabgabe) {
    let url;
    let northButton = document.getElementById("north");
    northButton.addEventListener("click", function () {
        if (posY - 1 >= 0) {
            posY--;
            displayPosition();
            statisticMoved();
        }
        else {
            positionText.innerHTML = "Du befindest dich an Rand, du kannst nicht weiter nach Norden.";
        }
    });
    let southButton = document.getElementById("south");
    southButton.addEventListener("click", function () {
        if (posY + 1 < game.size[1]) {
            posY++;
            displayPosition();
            statisticMoved();
        }
        else {
            positionText.innerHTML = "Du befindest dich an Rand, du kannst nicht weiter nach Süden.";
        }
    });
    let eastButton = document.getElementById("east");
    eastButton.addEventListener("click", function () {
        if (posX + 1 < game.size[0]) {
            posX++;
            displayPosition();
            statisticMoved();
        }
        else {
            positionText.innerHTML = "Du befindest dich an Rand, du kannst nicht weiter nach Osten.";
        }
    });
    let westButton = document.getElementById("west");
    westButton.addEventListener("click", function () {
        if (posX - 1 >= 0) {
            posX--;
            displayPosition();
            statisticMoved();
        }
        else {
            positionText.innerHTML = "Du befindest dich an Rand, du kannst nicht weiter nach Westen.";
        }
    });
    let positionText = document.getElementById("positionText");
    let gameName = localStorage.getItem('gameName');
    let game;
    let posX;
    let posY;
    let endGame = document.getElementById("endGame");
    endGame.addEventListener("click", openStartpage);
    //Verlinkungen auf andere Seiten
    function openStartpage() {
        window.open("startpage.html", "_self");
        console.log("open Startpage");
    }
    playGame();
    async function playGame() {
        url = "http://localhost:8100/";
        console.log("Daten empfangen");
        url += "selectedGameReceive" + "?name=" + gameName;
        let response = await fetch(url);
        game = await response.json();
        posX = game.startpoint[0] - 1;
        posY = game.startpoint[1] - 1;
        displayPosition();
        statisticPlayed();
    }
    function displayPosition() {
        positionText.innerHTML = "Du befindest dich " + game.field[posY][posX];
    }
    function statisticPlayed() {
        url = "http://localhost:8100/";
        console.log("Daten empfangen");
        url += "statisticGamePlayed" + "?name=" + gameName;
        fetch(url);
    }
    function statisticMoved() {
        url = "http://localhost:8100/";
        console.log("Daten empfangen");
        url += "statisticGameMoved" + "?name=" + gameName;
        fetch(url);
    }
})(Endabgabe = exports.Endabgabe || (exports.Endabgabe = {}));
//# sourceMappingURL=game.js.map