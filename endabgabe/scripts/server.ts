import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";


export namespace Endabgabe {


    let dataUser: Mongo.Collection;
    let dataGames: Mongo.Collection;
    let mongoLink: string = "mongodb+srv://vivien_1:mongo22@cluster0.ltd0uzy.mongodb.net/?retryWrites=true&w=majority";

    console.log("Starting server");
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    console.log("start server on port: "+ port);
    startServer(port);
    connectToMongo(mongoLink);

    function startServer(thisport: number | string): void {
        let server: Http.Server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(thisport);
    }

    async function connectToMongo(mongoLink: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(mongoLink, options);
        await mongoClient.connect();
        dataUser = mongoClient.db("textAdventure").collection("user");
        dataGames = mongoClient.db("textAdventure").collection("games");
        console.log("Verbindung hergestellt.", dataUser != undefined);
    }

    function handleListen(): void {
        console.log("Listening");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!");
        console.log(_request.url);

        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {

            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let pfad: string = <string>url.pathname;

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
                await dataGames.updateOne({name: url.query.name}, {"$inc": {"playedCounter": 1}});
                console.log("hallo");
            }

            if (pfad == "/statisticGameMoved") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                await dataGames.updateOne({name: url.query.name}, {"$inc": {"moveCounter": 1}});
                console.log("hallo");
            }

            if (pfad == "/gamedataSend") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                await dataGames.insertOne(JSON.parse(<string>url.query.game));
                _response.write("Daten gespeichert.");
                console.log("hallo");
            }
 
            if (pfad == "/datenReceive") {
                _response.setHeader("content-type", "JSON; charset=utf-8");
                let allData: string[] = await dataUser.find().toArray();
                let allDataString: string = JSON.stringify(allData);
                _response.write(allDataString);
            }

            if (pfad == "/compareUserdata") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                console.log(url.query.name);
                let foundUser = await dataUser.find({ "userName": <string>url.query.name });
                console.log(await foundUser.count());
                if(await foundUser.count() > 0){
                    _response.write("Username existiert bereits.");
                } else{
                    _response.write("Username verfügbar.");
                }
            }
            
            if (pfad == "/login") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                console.log(<string>url.query.userName);
                console.log(<string>url.query.password);
                let foundUser = await dataUser.find({ "userName": <string>url.query.userName, "password": <string>url.query.password});
                console.log(await foundUser.count());
                if(await foundUser.count() > 0){
                    _response.write("Login erfolgreich.");
                } else{
                    _response.write("Benutzername und/oder Passwort ist falsch, bitte erneut versuchen oder sich registrieren.");
                }
            }

            if (pfad == "/searchGame") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                let foundGame = await dataGames.find({ "name": <string>url.query.name});
                console.log(await foundGame.count());
                if(await foundGame.count() > 0){
                    _response.write("Spiel gefunden.");
                } else{
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
                let foundGame = await dataGames.findOne({ "name": <string>url.query.name});
                _response.write(JSON.stringify(foundGame));
            }

        }
        _response.end();

    }
}