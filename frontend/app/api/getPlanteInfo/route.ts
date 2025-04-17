/**
 * Traitement des images par image
 * Rechercher avec Prisma (remote DB) les infos pour la santé
 * avec un fallback vers MongoDBCompass si Prisma échoue.
 * 
 * Fonction:
 * - POST() : Envoie l'image pour process
 * - databaseInfo() : Recherche dans la base de donneé
 */

"use server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { MongoClient } from "mongodb";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const formData = await req.formData();

    // Recupérer les données
    const plantName = formData.get("plantName") as string | null;
    const file = formData.get("imageFile") as File | null;

    // Si nom de plante donné faire la recherche dans la bd directement
    if (plantName && plantName.trim() !== "") {
        const plant_health = await databaseInfo(plantName);
        return NextResponse.json(plant_health);
    }

    // Envoyer image pour deviner nom plante et rechercher dans DB
    if (file) {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            return NextResponse.json({ error: "Image prediction failed." }, { status: 500 });
        }

        const flaskData = await response.json();
        const plant_health = await databaseInfo(flaskData.plant_name);
        return NextResponse.json(plant_health);
    }

    return NextResponse.json({ error: "No plantName or file provided." }, { status: 400 });
}

// Fonction fait une recherche des health suggestions dans Atlas (Remote) et Compass (local)
const databaseInfo = async (plantName: string) => {

    //Remote Atlas
    try {
        const plantData = await prisma.plantesInfos.findFirst({
            where: { common_name: plantName },
        });

        if (plantData) {
            return { plant: plantData };
        }
    } catch (err) {
        console.error("Failed to fetch from Prisma:", err);
    }

    // Fallback to local MongoDB
    try {
        const client = new MongoClient("mongodb://localhost:27017");
        await client.connect();
        const db = client.db("serre_intelligente");
        const collection = db.collection("PlantesInfos");

        const plant = await collection.findOne({ common_name: plantName });

        if (!plant) {
            return { error: "No plant found in either database." };
        }

        return { plant };
    } catch (err) {
        console.error("Failed to fetch from local MongoDB:", err);
        return { error: "Database error occurred." };
    }
};