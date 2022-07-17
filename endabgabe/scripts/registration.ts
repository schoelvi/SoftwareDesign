namespace Endabgabe {

    let url: string;
    let urlsearchParameters: URLSearchParams;
    let answer: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("antwort");
    let hinweis: HTMLElement = <HTMLElement>document.getElementById("hinweis");
    let sperren1: HTMLInputElement = <HTMLInputElement>document.getElementById("sperren1");
    let sperren2: HTMLInputElement = <HTMLInputElement>document.getElementById("sperren2");
    let registerButtons: HTMLElement = <HTMLElement>document.getElementById("register");
    registerButtons.addEventListener("click", openSend);

   // Checking if the User exists 
    async function checkExistence(): Promise<Boolean> {
        url = "http://localhost:8100/";
        let u = url + "compareUserdata" + "?" + "name=" + sperren1.value;

        let response: Response = await fetch(u);
        let showAnswer: string = await response.text();
        answer.innerText = showAnswer;
        if (showAnswer == "Username existiert bereits."){
            return true;
        }
        return false;
    } 


    // Check if input is put in and send data to database
    async function openSend(): Promise<void> {
        if (sperren1.value == "" && sperren2.value == "") {
            hinweis.innerHTML = "Alle Felder müssen ausgefüllt sein.";
        }
        else if (sperren1.value == "") {
            hinweis.innerHTML = "Alle Felder müssen ausgefüllt sein.";
        }
        else if (sperren2.value == "") {
            hinweis.innerHTML = "Alle Felder müssen ausgefüllt sein.";
        }
        else if (!/^[A-Za-z0-9]*$/.test(sperren1.value)) {
            hinweis.innerHTML = "Es dürfen nur alphanumerische Zeichen verwendet werden.";
        }
        else if (await checkExistence()) {
        }
        else {
            //url = "https://gis2021vs.herokuapp.com/";
            url = "http://localhost:8100/";

            let formData: FormData = new FormData(document.forms[0]);
            urlsearchParameters = new URLSearchParams(<any>formData);

            url += "datenSenden" + "?" + urlsearchParameters.toString();
            let response: Response = await fetch(url);
            let showAnswer: string = await response.text();
            answer.innerText = showAnswer;
            //openStartpage();
        }

    }
}