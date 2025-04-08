"use server";

import { PrismaClient } from "@prisma/client";

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

        return await databaseInfo(flaskData.name);
    }

    return { error: "Please provide either a plant name or an image." };
}

const databaseInfo = async (plantName: string) => {
    const plantData = await prisma.plantesInfos.findFirst({
        where: { nom: plantName },
    });

    if (!plantData) {
        return { error: "No plant found in the database." };
    }
    return { plant: plantData };
};
