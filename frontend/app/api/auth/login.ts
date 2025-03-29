import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let connectedUsers: {username: String, password: String}[] = [];    // enregistre tout les utilisatuers connecters
let sessionCounter = 101;   // les sessions commencent à partir de ca

export default async function verifier (
    req: NextApiRequest,
    res: NextApiResponse
){
    try{

        //  Vérification de l'utilisateur version hardcode pour test
        const {username, password} = req.body;
        if (username !== "Deo" || password !== "123"){
            throw new Error("Mauvais mots de passe ou nom d'utilisateur")
        }

        //  Création de la session utilisateur
        const sessionId = sessionCounter++;
        connectedUsers.push();
        res.status(200).json({success: "yay", sessionId})

        //  Enregister dans le DB
        // const newConnection = await prisma.connection.create({
        //     data:{
        //         username,
        //         sessionId,
        //     },
        // })

        //  Tout a fonctionné
        res.status(201).json({ message: "User registered successfully", sessionId})
    }
    catch (error){
        res.status(401).json({error: "Invalid Credentials"})
    };
    
}