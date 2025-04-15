import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { error } from "console";
import { MongoClient } from "mongodb";

const SECRET = process.env.JWT_SECRET || "your-secret";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { username, password } = body;

    let user;

    try {
        // Try Prisma (remote DB)
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

    if (!user || user.password !== password) {
        return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

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


export async function verifyToken(token: string) {
    try {
        return jwt.verify(token, SECRET);
    } catch (err) {
        return null;
    }
}