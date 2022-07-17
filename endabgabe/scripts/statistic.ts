namespace Endabgabe {

    
    let startpage: HTMLElement = <HTMLElement>document.getElementById("userpage");
    startpage.addEventListener("click", openUserpage);
    let statisticOverview: HTMLElement = <HTMLElement>document.getElementById("statistic");

    let url: string;
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
    function openUserpage(): void {
        window.open("userpage.html", "_self");
        console.log("open Userpage");
    }

  

    //Search function and receive data from database
    async function receive(): Promise<void> {

        //url = "https://gis2021vs.herokuapp.com/";
        url = "http://localhost:8100/";

        console.log("Daten empfangen");
        url += "gamestatisticReceive";
        let response: Response = await fetch(url);
        let games: gameType[] = await response.json();
        console.log(games);
        
        statisticOverview.innerText = "";
        //let zaehler2: number;

        for (let zaehler: number = 0; zaehler < games.length; zaehler++) {
            let gameInfo = document.createElement("span");
            gameInfo.innerHTML = games[zaehler].name + ", MoveCounter: " + games[zaehler].moveCounter + ", PlayedCounter: " + games[zaehler].playedCounter;
            statisticOverview.appendChild(gameInfo);
            let newLines = document.createElement("p")
            statisticOverview.appendChild(newLines);
        }
    }

}