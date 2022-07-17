"use strict";
var Endabgabe;
(function (Endabgabe) {
    let startpage = document.getElementById("userpage");
    startpage.addEventListener("click", openUserpage);
    let statisticOverview = document.getElementById("statistic");
    let url;
    receive();
    //Links to other pages
    function openUserpage() {
        window.open("userpage.html", "_self");
        console.log("open Userpage");
    }
    //Search function and receive data from database
    async function receive() {
        //url = "https://gis2021vs.herokuapp.com/";
        url = "http://localhost:8100/";
        console.log("Daten empfangen");
        url += "gamestatisticReceive";
        let response = await fetch(url);
        let games = await response.json();
        console.log(games);
        statisticOverview.innerText = "";
        //let zaehler2: number;
        for (let zaehler = 0; zaehler < games.length; zaehler++) {
            let gameInfo = document.createElement("span");
            gameInfo.innerHTML = games[zaehler].name + ", MoveCounter: " + games[zaehler].moveCounter + ", PlayedCounter: " + games[zaehler].playedCounter;
            statisticOverview.appendChild(gameInfo);
            let newLines = document.createElement("p");
            statisticOverview.appendChild(newLines);
        }
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=statistic.js.map