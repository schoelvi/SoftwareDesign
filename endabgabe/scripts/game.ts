export namespace Endabgabe {
    let url: string;
    let northButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("north");
    northButton.addEventListener("click", function () {
        if (posY - 1 >= 0) {
            posY--;
            displayPosition();
            statisticMoved();
        } else {
            positionText.innerHTML = "Du befindest dich an Rand, du kannst nicht weiter nach Norden.";
        }
    });
    let southButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("south");
    southButton.addEventListener("click", function () {
        if (posY + 1 < game.size[1]) {
            posY++;
            displayPosition();
            statisticMoved();

        } else {
            positionText.innerHTML = "Du befindest dich an Rand, du kannst nicht weiter nach Süden.";
        }
    });
    let eastButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("east");
    eastButton.addEventListener("click", function () {
        if (posX + 1 < game.size[0]) {
            posX++;
            displayPosition();
            statisticMoved();

        } else {
            positionText.innerHTML = "Du befindest dich an Rand, du kannst nicht weiter nach Osten.";
        }
    });
    let westButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("west");
    westButton.addEventListener("click", function () {
        if (posX - 1 >= 0) {
            posX--;
            displayPosition();
            statisticMoved();

        } else {
            positionText.innerHTML = "Du befindest dich an Rand, du kannst nicht weiter nach Westen.";
        }
    });
    let positionText: HTMLElement = <HTMLElement>document.getElementById("positionText");
    let gameName = localStorage.getItem('gameName');
    let game: gameType;
    let posX: number;
    let posY: number;
    let endGame: HTMLElement = <HTMLElement>document.getElementById("endGame");
    endGame.addEventListener("click", openStartpage);



    type gameType = {
        name: string;
        size: number[];
        startpoint: number[];
        field: string[][];
        creator: string;
        playedCounter: number;
        moveCounter: number;
    }


    //Verlinkungen auf andere Seiten
    function openStartpage(): void {
        window.open("startpage.html", "_self");
        console.log("open Startpage");
    }

    playGame();
    async function playGame() {
        url = "http://localhost:8100/";

        console.log("Daten empfangen");
        url += "selectedGameReceive" + "?name=" + gameName;
        let response: Response = await fetch(url);
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
}
