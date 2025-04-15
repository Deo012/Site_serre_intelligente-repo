"use server";

import { PrismaClient } from "@prisma/client";
import { MongoClient } from 'mongodb';

const prisma = new PrismaClient();

export async function getPanteInfo(formData: FormData) {
    const plantName = formData.get("plantName") as string | null;
    const file = formData.get("imageFile") as File | null;

    if (plantName && plantName.trim() !== "") {
        // If plantName is provided, fetch plant data from the database
        return await databaseInfo(plantName);

    } else if (file) {
        // If plantName is not provided, send the image to the Flask API
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            return { error: "Failed to process image." };
        }

        const flaskData = await response.json();
        console.log("Flask Response:", flaskData);

        const plant_health = await databaseInfo(flaskData.plant_name);
        return plant_health;
    }

    return { error: "Please provide either a plant name or an image." };
}

const databaseInfo = async (plantName: string) => {
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