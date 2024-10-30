import connectMongoDB from "@/libs/mongodb"; 
import Food from "@/models/food";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    await connectMongoDB();

    try {
        const data = await req.json(); //we are sending the data and exporting to JSON 

        if(!data.name || !data.description ) {
           return NextResponse.json({error: "Please enter all the required fields HAHA"}, {status: 400})
        }

        const makeFood = await Food.create({
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            isAvailable: data.isAvailable
        })

        return NextResponse.json({food:makeFood}, {status:201})

    } catch (error) {
        console.error(error);
        return NextResponse.json(
         {error: "Failed to parse JSON or save food"},
        {status:500})
    }
}