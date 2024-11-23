import connectMongoDB from "@/lib/mongodb";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, password } = body;

    connectMongoDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      console.log("Password is incorrect");
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Login successful",
        user: { id: user._id, email: user.email },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in login:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
