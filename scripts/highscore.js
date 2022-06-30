"use strict";
var Endabgabe;
(function (Endabgabe) {
    let newGameButton = document.getElementById("newGame");
    newGameButton.addEventListener("click", openGame);
    let url;
    let rankingDiv = document.getElementById("ranking");
    receive();
    //Verlinkungen auf andere Seiten
    function openGame() {
        window.open("game.html", "_self");
        console.log("open Game");
    }
    // Laden der gespeichtern Daten
    async function receive() {
        url = "https://gis2021vs.herokuapp.com/";
        //url =  "http://localhost:8100/";
        console.log("Daten empfangen");
        url += "highscoreReceive";
        let response = await fetch(url);
        let showAnswer = await response.text();
        let daten = JSON.parse(showAnswer);
        rankingDiv.innerText = "";
        let zaehler2 = 1;
        for (let zaehler = 0; zaehler < 10; zaehler++) {
            rankingDiv.innerHTML = rankingDiv.innerHTML + zaehler2 + ". " + daten[zaehler].vorname + " " + daten[zaehler].nachname + ", " + "Zeit: " + daten[zaehler].Zeit + " Sekunden " + "(Versuche: " + daten[zaehler].Versuche + ")";
            rankingDiv.innerHTML = rankingDiv.innerHTML + "<br>" + "<br>";
            zaehler2++;
        }
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=highscore.js.map