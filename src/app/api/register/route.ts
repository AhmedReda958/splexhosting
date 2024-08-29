import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust path as needed
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json();

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Email, password, first name and last name are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ user: newUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
