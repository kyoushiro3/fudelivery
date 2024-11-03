import connectMongoDB from "@/libs/mongodb";
import Order from "@/models/order";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
    await connectMongoDB();

    try {
        const data = await req.json();

        // Ensure `customerId` and `foodId` for each item are in ObjectId format
        const createOrder = await Order.create({
            customerId: new mongoose.Types.ObjectId(data.customerId),
            items: data.items.map(item => ({
                foodId: new mongoose.Types.ObjectId(item.foodId),
                quantity: item.quantity,
                price: item.price
            })),
            status: data.status,
            deliveryFee: data.deliveryFee,
            totalAmount: data.totalAmount,
            orderedAt: new Date(data.orderedAt)  // Ensure `orderedAt` is a valid date
        });

        return NextResponse.json(
            { order: createOrder },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { error: "Failed to parse JSON or create order." },
            { status: 500 }
        );
    }
}


export async function GET() {
    try {
        await connectMongoDB();

        const order = await Order.find();

        return NextResponse.json({
            messages: "Fetched data successfull", order
        },{
            status:201
        }
    )
    } catch (error) {

        console.error("Error fecthing the data", error)

        return NextResponse.json({
            message: "Failed to fetch the data", error
        },
    {status:500})
    }
    
}
