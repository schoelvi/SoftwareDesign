namespace Endabgabe {

    let gameButton: HTMLElement = <HTMLElement> document.getElementById("game");
    gameButton.addEventListener("click", openGame);

    let highscoreButton: HTMLElement = <HTMLElement> document.getElementById("highscore");
    highscoreButton.addEventListener("click", openHighscore);

    let einstellungenButton: HTMLElement = <HTMLElement> document.getElementById("einstellungen");
    einstellungenButton.addEventListener("click", openEinstellungen);

    //Verlinkungen auf andere Seiten
    function openGame(): void {
        window.open("game.html", "_self");
        console.log("open Game");
    }

    function openHighscore(): void {
        window.open("highscore.html", "_self");
        console.log("open Highscore");
    }
    function openEinstellungen(): void {
        window.open("admin.html", "_self");
        console.log("open Einstellungen");
    }

    
}