namespace Endabgabe {

    let url: string;
    let urlsearchParameters: URLSearchParams;
    let answer: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("antwort");
    let hinweis: HTMLElement = <HTMLElement>document.getElementById("hinweis");
    let sperren1: HTMLInputElement = <HTMLInputElement>document.getElementById("sperren1");
    let sperren2: HTMLInputElement = <HTMLInputElement>document.getElementById("sperren2");
    
    let showHighscoreButton: HTMLElement = <HTMLElement>document.getElementById("showHighscore");
    showHighscoreButton.addEventListener("click", openSend);

    let neuerVersuchButton: HTMLElement = <HTMLElement>document.getElementById("newGame");
    neuerVersuchButton.addEventListener("click", openGame);

  
    //Verlinkungen auf andere Seiten
    function openGame(): void {
        window.open("game.html", "_self");
        console.log("open Game");
    }

    function openHighscore(): void {
        window.open("highscore.html", "_self");
        console.log("open Highscore");
    }

    // Daten des Spielers zusammen mit den Daten (Zeit, Versuche) in die Datenbank abschicken
    async function openSend(): Promise<void> {
        if (sperren1.value == "" && sperren2.value == "") {
            hinweis.innerHTML = "Beide Felder müssen ausgefüllt sein.";
        } else {
            url = "https://gis2021vs.herokuapp.com/";
            //url = "http://localhost:8100/";

            let formData: FormData = new FormData(document.forms[0]);
            urlsearchParameters = new URLSearchParams(<any>formData);

            url += "datenSenden" + "?" + urlsearchParameters.toString() + "&" + "Zeit=" +localStorage.getItem("Zeit") + "&" + "Versuche=" + localStorage.getItem("Versuche");
            let response: Response = await fetch(url);
            let showAnswer: string = await response.text();
            answer.innerText = showAnswer;
            openHighscore();
        }
    }

    





}