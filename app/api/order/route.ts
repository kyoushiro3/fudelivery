import connectMongoDB from "@/lib/mongodb";
import Order from "@/models/order";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await connectMongoDB();

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    console.log("user id:", userId);

    const data = await req.json();
    console.log(data)

    const createOrder = await Order.create({
      customerId: userId,
      items: data.items.map((item) => ({
        foodId: new mongoose.Types.ObjectId(item.foodId),
        quantity: item.quantity,
        price: item.price,
      })),
      status: "pending",
      deliveryFee: data.deliveryFee,
      totalAmount: data.totalAmount,
      orderedAt: new Date(Date.now()), 
    });

    return NextResponse.json({ order: createOrder }, { status: 201 });
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

    return NextResponse.json(
      {
        messages: "Fetched data successfull",
        order,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error fecthing the data", error);

    return NextResponse.json(
      {
        message: "Failed to fetch the data",
        error,
      },
      { status: 500 }
    );
  }
}
