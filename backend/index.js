/*
npm init -y
npm install express mongoose cors
npm install socket.io
*/

const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose'); 
const {Server} = require("socket.io")
const http = require("http");

const app = express();
const httpServer = http.createServer(app);
const port = 3000;

//Les pages ayant les autorisations à accéder au backend peuvent faire les opérations suivantes
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET","POST"]
    }
})

//Dit au server quel domaine a le droit de faire des requetes
app.use(cors({
    origin: ["http://localhost:5173/", ""],
    credentials: true                           //allows sending cookies
}));

//Server peut transformer des receptions json en text
app.use(express.json())

//Les routes de l'application
app.use("/status")

//connection a mongoose
mongoose.set("strictQuery", false);
const mongoDB = "mongodb://localhost:27017/jeuQuestionnaireDb";
main().catch((err) => console.log(err));
async function main(){
    await mongoose.connect(mongoDB)
        .then(console.log("Base de donne connecter"))
        .catch((err) => console.log(err));
};

//Connection des clients au serveur
io.of("/client").on("connection", (Socket) => {

})

//Connection du système embarqué au serveur
io.of("/embarque").on("connection", (Socket) => {
    
})