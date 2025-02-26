/*
npm init -y
npm install express mongoose cors
*/

const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose'); 

const app = express();

//Dit au server quel domaine a le droit de faire des requetes
app.use(cors({
    origin: ["http://localhost:5173/", ""],
    credentials: true
}));

//Server attend des requetes en json
app.use(express.json)

//connection a mongoose
mongoose.set("strictQuery", false);
const mongoDB = "mongodb://localhost:27017/jeuQuestionnaireDb";
main().catch((err) => console.log(err));
async function main(){
    await mongoose.connect(mongoDB)
        .then(console.log("Base de donne connecter"))
        .catch((err) => console.log(err));
};