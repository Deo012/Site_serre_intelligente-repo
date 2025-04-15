
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "your-secret";

export async function POST(req: NextRequest) {
    const body = await req.json(); // ✅ This is how you get POST data in App Router
    const { username, password } = body;

    const user = await prisma.users.findFirst({
        where: { username: username }
    });

    if (!user) {
        return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    console.log("User from DB:", user);

    const validPassword = password === user.password;
    if (!validPassword) {
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