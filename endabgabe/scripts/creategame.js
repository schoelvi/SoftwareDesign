"use strict";
var Endabgabe;
(function (Endabgabe) {
    let url;
    let urlsearchParameters;
    let answer = document.getElementById("antwort");
    let gameName = document.getElementById("gameName");
    let startX = document.getElementById("startX");
    let startY = document.getElementById("startY");
    let gameField = document.getElementById("gameField");
    let userName = localStorage.getItem('userName');
    let sizeX = document.getElementById("sizeX");
    let sizeY = document.getElementById("sizeY");
    //let registerButtons: HTMLElement = <HTMLElement>document.getElementById("register");
    //registerButtons.addEventListener("click", openSend);
    //let startButton: HTMLElement = <HTMLElement>document.getElementById("startGame");
    //startButton.addEventListener("click", openStartpage);
    let generateGame = document.getElementById("generateField");
    generateGame.addEventListener("click", generateField);
    let gameEnable = document.getElementById("gameEnable");
    gameEnable.addEventListener("click", openSend);
    let field = [];
    //Verlinkungen auf andere Seiten
    /*function openRegistration(): void {
        window.open("registration.html", "_self");
        console.log("open Registratiom");
    }*/
    function openStartpage() {
        setTimeout(function () {
            window.open("startpage.html", "_self");
            console.log("open Startgame");
        }, 5000);
    }
    function generateField() {
        generateGame.style.display = "none";
        let x = Number(sizeX.value);
        let y = Number(sizeY.value);
        for (let i = 0; i < y; i++) {
            let row = document.createElement("tr");
            gameField.appendChild(row);
            field.push([]);
            for (let j = 0; j < x; j++) {
                field[i].push("");
                let cell = document.createElement("td");
                let span = document.createElement("span");
                let input = document.createElement("input");
                input.addEventListener("change", function (e) {
                    const target = e.target;
                    field[i][j] = target.value;
                });
                row.appendChild(cell);
                cell.appendChild(span);
                cell.appendChild(input);
            }
        }
    }
    // Daten des Spielers zusammen mit den Daten (Zeit, Versuche) in die Datenbank abschicken
    async function openSend() {
        /*if (sperren1.value == "" && sperren2.value == "" && sperren3.value == "") {
            hinweis.innerHTML = "Alle Felder müssen ausgefüllt sein.";
        } */
        //else {
        //url = "https://gis2021vs.herokuapp.com/";
        url = "http://localhost:8100/";
        let game = {
            name: gameName.value,
            size: [Number(sizeX.value), Number(sizeY.value)],
            startpoint: [Number(startX.value), Number(startY.value)],
            field: field,
            creator: userName,
            moveCounter: 0,
            playedCounter: 0
        };
        urlsearchParameters = new URLSearchParams();
        urlsearchParameters.append("game", JSON.stringify(game));
        url += "gamedataSend" + "?" + urlsearchParameters.toString();
        let response = await fetch(url);
        let showAnswer = await response.text();
        answer.innerText = showAnswer;
        openStartpage();
        //}
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=creategame.js.map