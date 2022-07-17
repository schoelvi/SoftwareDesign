namespace Endabgabe {

    let gameButton: HTMLElement = <HTMLElement>document.getElementById("startGame");
    gameButton.addEventListener("click", openStartpage);

    let createButton: HTMLElement = <HTMLElement>document.getElementById("createGame");
    createButton.addEventListener("click", openCreatepage);

    let statisticButton: HTMLElement = <HTMLElement>document.getElementById("statistic");
    statisticButton.addEventListener("click", openStatistic);


    //Verlinkungen auf andere Seiten
    function openStartpage(): void {
        window.open("startpage.html", "_self");
        console.log("open Game");
    }

    function openCreatepage(): void {
        window.open("creategame.html", "_self");
        console.log("open Create Game");
    }

    function openStatistic(): void {
        window.open("statistic.html", "_self");
        console.log("open Statistic");
    }

  
}