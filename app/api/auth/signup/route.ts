import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

import connectMongoDB from "@/lib/mongodb";
import { User } from "@/models/user";
import { UserSchema } from "@/lib/validations/types";


export async function POST(req: NextRequest) {
    try {
        const body = UserSchema.parse(await req.json()); //main strcture an array ----- part it to small bits
        console.log(body)
        const { name, email, password } = body; //destructure

        await connectMongoDB();

        const existingUser = await User.findOne({ email }); 

        if (existingUser) {
            console.log("Email already exists.")
            return NextResponse.json(
                { message: "A user with this email already exists." },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "customer",
        });

        await newUser.save(); 
        
        return NextResponse.json(
            { message: "User created successfully." },
            { status: 201 }
        );
    } catch (error) {

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { errors: error.flatten().fieldErrors || {} },
                { status: 400 }
            );
        }

        console.log("Error creating user:", error);
        return NextResponse.json(
            { message: "Internal server error." },
            { status: 500 }
        );
    }
}
