"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endabgabe = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Endabgabe;
(function (Endabgabe) {
    let dataUser;
    let dataGames;
    let mongoLink = "mongodb+srv://vivien_1:mongo22@cluster0.ltd0uzy.mongodb.net/?retryWrites=true&w=majority";
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    console.log("start server on port: " + port);
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
        dataUser = mongoClient.db("textAdventure").collection("user");
        dataGames = mongoClient.db("textAdventure").collection("games");
        console.log("Verbindung hergestellt.", dataUser != undefined);
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
                await dataUser.insertOne(url.query);
                _response.write("Daten gespeichert");
                console.log("hallo");
            }
            if (pfad == "/urlSenden") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                await dataGames.insertOne(url.query);
                _response.write("Daten gespeichert, Seite bitte neu laden");
                console.log("hallo");
            }
            if (pfad == "/statisticGamePlayed") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                await dataGames.updateOne({ name: url.query.name }, { "$inc": { "playedCounter": 1 } });
                console.log("hallo");
            }
            if (pfad == "/statisticGameMoved") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                await dataGames.updateOne({ name: url.query.name }, { "$inc": { "moveCounter": 1 } });
                console.log("hallo");
            }
            if (pfad == "/gamedataSend") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                await dataGames.insertOne(JSON.parse(url.query.game));
                _response.write("Daten gespeichert.");
                console.log("hallo");
            }
            if (pfad == "/datenReceive") {
                _response.setHeader("content-type", "JSON; charset=utf-8");
                let allData = await dataUser.find().toArray();
                let allDataString = JSON.stringify(allData);
                _response.write(allDataString);
            }
            if (pfad == "/compareUserdata") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                console.log(url.query.name);
                let foundUser = await dataUser.find({ "userName": url.query.name });
                console.log(await foundUser.count());
                if (await foundUser.count() > 0) {
                    _response.write("Username existiert bereits.");
                }
                else {
                    _response.write("Username verfügbar.");
                }
            }
            if (pfad == "/login") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                console.log(url.query.userName);
                console.log(url.query.password);
                let foundUser = await dataUser.find({ "userName": url.query.userName, "password": url.query.password });
                console.log(await foundUser.count());
                if (await foundUser.count() > 0) {
                    _response.write("Login erfolgreich.");
                }
                else {
                    _response.write("Benutzername und/oder Passwort ist falsch, bitte erneut versuchen oder sich registrieren.");
                }
            }
            if (pfad == "/searchGame") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                let foundGame = await dataGames.find({ "name": url.query.name });
                console.log(await foundGame.count());
                if (await foundGame.count() > 0) {
                    _response.write("Spiel gefunden.");
                }
                else {
                    _response.write("Derzeit existiert kein Spiel mit diesem Namen.");
                }
            }
            if (pfad == "/gamedataReceive") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                let statistic = await dataGames.find().toArray();
                _response.write(JSON.stringify(statistic));
            }
            if (pfad == "/gamestatisticReceive") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                let foundGame = await dataGames.find().toArray();
                _response.write(JSON.stringify(foundGame));
            }
            if (pfad == "/selectedGameReceive") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                let foundGame = await dataGames.findOne({ "name": url.query.name });
                _response.write(JSON.stringify(foundGame));
            }
        }
        _response.end();
    }
})(Endabgabe = exports.Endabgabe || (exports.Endabgabe = {}));
//# sourceMappingURL=server.js.map