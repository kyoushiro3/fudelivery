import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectMongoDB from "@/lib/mongodb";
import { User } from "@/models/user";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Request Body:", body);

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters." }, { status: 400 });
    }

    await connectMongoDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already in use." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);

    return NextResponse.json(
      {
        message: "Failed to create user."
      },
      { status: 500 }
    );
  }
}
