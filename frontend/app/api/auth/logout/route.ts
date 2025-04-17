/**
 * POST /api/logout
 * Supprime le cookie d'authentification "token" en le vidant et en le faisant expirer.
 * Renvoie une réponse JSON confirmant la déconnexion.
 */
import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ message: "Logged out" });

    // Supprime le cookie en le réécrivant vide et expiré
    response.cookies.set("token", "", {
        httpOnly: true,
        path: "/",
        secure: true,
        expires: new Date(0), // force expiration
    });

    return response;
}
