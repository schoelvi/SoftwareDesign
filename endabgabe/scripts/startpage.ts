namespace Endabgabe {

    let searchText: HTMLInputElement = <HTMLInputElement>document.getElementById("searchText");
    let answer: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("antwort");
    //let hinweis: HTMLElement = <HTMLElement>document.getElementById("hinweis");

    let newGameButton: HTMLElement = <HTMLElement>document.getElementById("newGame");
    newGameButton.addEventListener("click", openGame);

    let signinButton: HTMLElement = <HTMLElement>document.getElementById("signInStart");
    signinButton.addEventListener("click", openLogin);

    let searchButton: HTMLElement = <HTMLElement>document.getElementById("search");
    searchButton.addEventListener("click", checkExistence);

    let url: string;
    let gameOverview: HTMLElement = <HTMLElement>document.getElementById("gameOverview");
    receive();

    type gameType = {
        name: string;
        size: number[];
        startpoint: number[];
        field: string[][];
        creator: string;
        playedCounter: number;
        moveCounter: number;
    }

    //Links to other pages
    function openGame(): void {
        window.open("game.html", "_self");
        console.log("open Game");
    }

    function openLogin(): void {
        window.open("login.html", "_self");
        console.log("open Login");
    }

  
    // Checking if the Game exists 
    async function checkExistence(): Promise<Boolean> {
        url = "http://localhost:8100/";
        let u = url + "searchGame" + "?" + "name=" + searchText.value;

        let response: Response = await fetch(u);
        let showAnswer: string = await response.text();
        answer.innerText = showAnswer;
        if (showAnswer == "Derzeit existiert kein Spiel mit diesem Namen.") {
            return true;
        }
        localStorage.setItem('gameName', searchText.value);
        openGame();
        return false;
    }

    //Search function and receive data from database
    async function receive(): Promise<void> {

        //url = "https://gis2021vs.herokuapp.com/";
        url = "http://localhost:8100/";

        console.log("Daten empfangen");
        url += "gamedataReceive";
        let response: Response = await fetch(url);
        let games: gameType[] = await response.json();
        console.log(games);
        
        gameOverview.innerText = "";
        //let zaehler2: number;

        for (let zaehler: number = 0; zaehler < Math.min(5,games.length); zaehler++) {
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
            let newLines = document.createElement("p")
            gameOverview.appendChild(newLines);
        }
    }

}