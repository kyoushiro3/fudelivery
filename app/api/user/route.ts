import connectMongoDB from "@/lib/mongodb";
import Customer from "@/models/customer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectMongoDB();

  try {
    const data = await req.json();

    if (!data.name || !data.email) {
      return NextResponse.json(
        {
          error: "Please enter all the required fields.",
        },
        { status: 400 }
      );
    }

    const createCustomer = await Customer.create({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: {
        street: data.address.street,
        city: data.address.city,
        postalCode: data.address.postalCode,
      },
    });

    return NextResponse.json(
      {
        customer: createCustomer,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to parse JSON or create customer." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();

    const customers = await Customer.find();

    return NextResponse.json(
      {
        message: "Fetched customers successfully",
        customers,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching customer data.", error);

    return NextResponse.json(
      {
        message: "Failed to fetch customer data",
        error,
      },
      { status: 500 }
    );
  }
}
