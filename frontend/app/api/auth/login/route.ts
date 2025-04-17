/**
 * Authentification utilisateur (login) via POST.
 * Vérifie les identifiants en utilisant Prisma (BDD principale -remote),
 * avec un fallback vers MongoDBCompass si Prisma échoue.
 * Génère un JWT et le stocke dans un cookie sécurisé.
 *
 * Fonctions :
 * - POST() : Authentifie l'utilisateur et génère le cookie JWT
 * - verifyToken() : Vérifie la validité d'un token JWT
 */

import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const SECRET = process.env.JWT_SECRET || "your-secret";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    // Récupère le body de la requête
    const body = await req.json();
    const { username, password } = body;

    let user;

    try {
        // Try verifier avec Prisma (remote DB)
        user = await prisma.users.findFirst({ where: { username } });
        console.log("User found with Prisma:", user);
    } catch (error) {
        console.warn("Prisma failed. Falling back to MongoDB:", error);

        // Use MongoDB fallback
        const client = new MongoClient("mongodb://localhost:27017");
        await client.connect();
        const db = client.db("serre_intelligente");
        user = await db.collection("Users").findOne({ username });
        console.log("User found with MongoDB fallback:", user);
    }

    // Vérifie les identifiants
    if (!user || user.password !== password) {
        return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // Génère le token JWT
    const token = jwt.sign({ username }, SECRET, { expiresIn: "1d" });

    const response = NextResponse.json({ message: "Logged in" });
    response.cookies.set("token", token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24,
    });

    return response;
}

// Decode le token
export async function verifyToken(token: string) {
    try {
        return jwt.verify(token, SECRET);
    } catch (err) {
        return null;
    }
}