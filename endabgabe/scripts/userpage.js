"use strict";
var Endabgabe;
(function (Endabgabe) {
    let gameButton = document.getElementById("startGame");
    gameButton.addEventListener("click", openStartpage);
    let createButton = document.getElementById("createGame");
    createButton.addEventListener("click", openCreatepage);
    let statisticButton = document.getElementById("statistic");
    statisticButton.addEventListener("click", openStatistic);
    //Verlinkungen auf andere Seiten
    function openStartpage() {
        window.open("startpage.html", "_self");
        console.log("open Game");
    }
    function openCreatepage() {
        window.open("creategame.html", "_self");
        console.log("open Create Game");
    }
    function openStatistic() {
        window.open("statistic.html", "_self");
        console.log("open Statistic");
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=userpage.js.map