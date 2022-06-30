"use strict";
var Endabgabe;
(function (Endabgabe) {
    let gameButton = document.getElementById("game");
    gameButton.addEventListener("click", openGame);
    let highscoreButton = document.getElementById("highscore");
    highscoreButton.addEventListener("click", openHighscore);
    let einstellungenButton = document.getElementById("einstellungen");
    einstellungenButton.addEventListener("click", openEinstellungen);
    //Verlinkungen auf andere Seiten
    function openGame() {
        window.open("game.html", "_self");
        console.log("open Game");
    }
    function openHighscore() {
        window.open("highscore.html", "_self");
        console.log("open Highscore");
    }
    function openEinstellungen() {
        window.open("admin.html", "_self");
        console.log("open Einstellungen");
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=startseite.js.map