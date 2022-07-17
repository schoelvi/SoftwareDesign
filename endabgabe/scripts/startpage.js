"use strict";
var Endabgabe;
(function (Endabgabe) {
    let searchText = document.getElementById("searchText");
    let answer = document.getElementById("antwort");
    //let hinweis: HTMLElement = <HTMLElement>document.getElementById("hinweis");
    let newGameButton = document.getElementById("newGame");
    newGameButton.addEventListener("click", openGame);
    let signinButton = document.getElementById("signInStart");
    signinButton.addEventListener("click", openLogin);
    let searchButton = document.getElementById("search");
    searchButton.addEventListener("click", checkExistence);
    let url;
    let gameOverview = document.getElementById("gameOverview");
    receive();
    //Links to other pages
    function openGame() {
        window.open("game.html", "_self");
        console.log("open Game");
    }
    function openLogin() {
        window.open("login.html", "_self");
        console.log("open Login");
    }
    // Checking if the Game exists 
    async function checkExistence() {
        url = "http://localhost:8100/";
        let u = url + "searchGame" + "?" + "name=" + searchText.value;
        let response = await fetch(u);
        let showAnswer = await response.text();
        answer.innerText = showAnswer;
        if (showAnswer == "Derzeit existiert kein Spiel mit diesem Namen.") {
            return true;
        }
        localStorage.setItem('gameName', searchText.value);
        openGame();
        return false;
    }
    //Search function and receive data from database
    async function receive() {
        //url = "https://gis2021vs.herokuapp.com/";
        url = "http://localhost:8100/";
        console.log("Daten empfangen");
        url += "gamedataReceive";
        let response = await fetch(url);
        let games = await response.json();
        console.log(games);
        gameOverview.innerText = "";
        //let zaehler2: number;
        for (let zaehler = 0; zaehler < Math.min(5, games.length); zaehler++) {
            let gameInfo = document.createElement("span");
            gameInfo.innerHTML = games[zaehler].name + " ,Spielfeldgröße: " + games[zaehler].size;
            gameOverview.appendChild(gameInfo);
            let selectButton = document.createElement("button");
            selectButton.innerText = "Spiel auswählen und spielen";
            selectButton.addEventListener("click", function () {
                localStorage.setItem('gameName', games[zaehler].name);
                openGame();
            });
            gameOverview.appendChild(selectButton);
            let newLines = document.createElement("p");
            gameOverview.appendChild(newLines);
        }
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=startpage.js.map