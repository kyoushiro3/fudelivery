import connectMongoDB from "@/lib/mongodb";
import Order from "@/models/order";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectMongoDB(); //connection first    //make data POST beofore GET we cant get nothing without creating first

  try {
    const data = await req.json();

    const createDelivery = await Order.create({
      customerId: data.customerId, //when u create order this need customer id to know who order

      items: data.items.map((item) => ({
        foodId: new mongoose.Types.ObjectId(item.foodId), //this needs the foodID to know whats is the food
        quantity: item.quantity,
        price: item.price,
      })),
      status: data.status,
      deliveryFee: data.deliveryFee,
      totalAmount: data.totalAmount,
      orderedAt: data.orderedAt,
    });

    return NextResponse.json(
      {
        order: createDelivery,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to parse JSON or creating order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongoDB();

  try {
    const delivery = await Order.find();

    return NextResponse.json(
      {
        message: "Order fetched successfully",
        delivery,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch the order.",
      },
      {
        status: 500,
      }
    );
  }
}
