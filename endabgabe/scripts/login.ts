namespace Endabgabe {

    let url: string;
    let urlsearchParameters: URLSearchParams;
    let answer: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("antwort");
    let hinweis: HTMLElement = <HTMLElement>document.getElementById("hinweis");
    let userName: HTMLInputElement = <HTMLInputElement>document.getElementById("userName");

    let signinButton: HTMLElement = <HTMLElement>document.getElementById("signIn");
    signinButton.addEventListener("click", openSend);

    let registrationButton: HTMLElement = <HTMLElement>document.getElementById("newUser");
    registrationButton.addEventListener("click", openRegistration);


    //Links to other pages
    function openRegistration(): void {
        window.open("registration.html", "_self");
        console.log("open Registratiom");
    }

    function openUserpage(): void {
        window.open("userpage.html", "_self");
        console.log("open Userpage");
    }

    // Send data to database
    async function openSend(): Promise<void> {
        if (userName.value == "") {
            hinweis.innerHTML = "Beide Felder müssen ausgefüllt sein.";
        } else {
            //url = "https://softwaredesign22.herokuapp.com/";
            url = "http://localhost:8100/";

            let formData: FormData = new FormData(document.forms[0]);
            urlsearchParameters = new URLSearchParams(<any>formData);

            url += "login" + "?" + urlsearchParameters.toString();
            let response: Response = await fetch(url);
            let showAnswer: string = await response.text();
            answer.innerText = showAnswer;
            if (showAnswer == "Login erfolgreich.") {
                localStorage.setItem('userName', userName.value);
                openUserpage();
            }
        }
    }
}