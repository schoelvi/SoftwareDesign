namespace Endabgabe {

    let url: string;
    let urlsearchParameters: URLSearchParams;
    let answer: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("antwort");
    let angeklickt: string = "";

    interface Bild {
        _id: string;
        url: string;
    }

    let bilderDiv: HTMLElement = <HTMLElement>document.getElementById("bilderDatenbank");
    showBild();

    let bildEinfuegenButton: HTMLElement = <HTMLElement>document.getElementById("hinzufuegen");
    bildEinfuegenButton.addEventListener("click", bildHinzufuegen);

    let bildLoeschenButton: HTMLElement = <HTMLElement>document.getElementById("loeschen");
    bildLoeschenButton.addEventListener("click", deleteBild);

    let gameButton: HTMLElement = <HTMLElement> document.getElementById("game");
    gameButton.addEventListener("click", openGame);
    function openGame(): void {
        window.open("game.html", "_self");
        console.log("open Game");
    }
    
    //Eingefügte URL an die Datenbank schicken
    async function bildHinzufuegen(): Promise<void> {

        url = "https://gis2021vs.herokuapp.com/";
        //url = "http://localhost:8100/";

        let formData: FormData = new FormData(document.forms[0]);
        urlsearchParameters = new URLSearchParams(<any>formData);

        console.log("URL gesendet");
        url += "urlSenden" + "?" + urlsearchParameters.toString();
        let response: Response = await fetch(url);
        let showAnswer: string = await response.text();
        answer.innerText = showAnswer;
    }

    // Bilder aus der Datenbank anzeigen lassen und sie fürs löschen bzw. auswählen vorbereiten
    async function showBild(): Promise<void> {

        url = "https://gis2021vs.herokuapp.com/";
        //url = "http://localhost:8100/";

        console.log("Daten empfangen");
        url += "bildReceive";
        let response: Response = await fetch(url);
        let showAnswer: string = await response.text();
        let daten: Bild[] = JSON.parse(showAnswer);
        console.log(daten);
        for (let zaehler: number = 0; zaehler < daten.length; zaehler++) {
            let bild = document.createElement("img");
            bild.className = "bilderAdmin";
            bild.id = daten[zaehler]._id;
            bild.addEventListener("click", function (): void { angeklickt = bild.getAttribute("id") });
            bild.src = daten[zaehler].url;
            bilderDiv.appendChild(bild);
        }
        let bilderAdmin: HTMLCollection = <HTMLCollection>document.getElementsByClassName("bilderAdmin");
        if (bilderAdmin.length <= 8) {
            bildLoeschenButton.toggleAttribute("disabled");
            answer.innerText = "Zum Spielen benötigt man mindestens 8 Bilder.";
        }
    }

    //Bilder aus der Datenbank löschen
    async function deleteBild(): Promise<void> {
        if (angeklickt == "") {
            answer.innerText = "Es muss ein Bild angeklickt sein. "
            return;
        }
        url = "https://gis2021vs.herokuapp.com/";
        //url = "http://localhost:8100/";

        console.log("Bild gelöscht");
        url += "bildLoeschen" + "?" + "name=" + angeklickt;

        let response: Response = await fetch(url);
        let showAnswer: string = await response.text();
        answer.innerText = showAnswer;
    }

}