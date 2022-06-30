"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endabgabe = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Endabgabe;
(function (Endabgabe) {
    let dataAntwort;
    let dataBild;
    let mongoLink = "mongodb+srv://vivien_1:vivien5@gissose2021.rg9pn.mongodb.net/Endabgabe_Memory?retryWrites=true&w=majority";
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    startServer(port);
    connectToMongo(mongoLink);
    function startServer(thisport) {
        let server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(thisport);
    }
    async function connectToMongo(mongoLink) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(mongoLink, options);
        await mongoClient.connect();
        dataAntwort = mongoClient.db("Endabgabe_Memory").collection("Daten_Spieler");
        dataBild = mongoClient.db("Endabgabe_Memory").collection("Bilder");
        console.log("Verbindung hergestellt.", dataAntwort != undefined);
    }
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        console.log(_request.url);
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let pfad = url.pathname;
            console.log(pfad);
            if (pfad == "/datenSenden") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                await dataAntwort.insertOne(url.query);
                _response.write("Daten gespeichert");
                console.log("hallo");
            }
            if (pfad == "/urlSenden") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                await dataBild.insertOne(url.query);
                _response.write("Daten gespeichert, Seite bitte neu laden");
                console.log("hallo");
            }
            if (pfad == "/highscoreReceive") {
                _response.setHeader("content-type", "JSON; charset=utf-8");
                let allData = await dataAntwort.find().sort({ Zeit: 1 }).toArray();
                let allDataString = JSON.stringify(allData);
                _response.write(allDataString);
            }
            if (pfad == "/datenReceive") {
                _response.setHeader("content-type", "JSON; charset=utf-8");
                let allData = await dataAntwort.find().toArray();
                let allDataString = JSON.stringify(allData);
                _response.write(allDataString);
            }
            if (pfad == "/bildReceive") {
                _response.setHeader("content-type", "JSON; charset=utf-8");
                let allData = await dataBild.find().toArray();
                let allDataString = JSON.stringify(allData);
                _response.write(allDataString);
            }
            if (pfad == "/bildLoeschen") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                console.log(url.query.name);
                await dataBild.findOneAndDelete({ "_id": new Mongo.ObjectId(url.query.name) });
                _response.write("Bild gelöscht, bitte Seite neu laden.");
            }
        }
        _response.end();
    }
})(Endabgabe = exports.Endabgabe || (exports.Endabgabe = {}));
//# sourceMappingURL=server.js.map