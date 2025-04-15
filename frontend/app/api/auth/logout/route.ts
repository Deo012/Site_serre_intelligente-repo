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
