import connectMongoDB from "@/libs/mongodb";
import Food from "@/models/food";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectMongoDB();

  try {
    const data = await req.json();
    if (!data.name || !data.description) {
      return NextResponse.json(
        { error: "Please enter all the required fields HAHA" },
        { status: 400 }
      );
    }

    const makeFood = await Food.create({
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      img: data.img,
      isAvailable: data.isAvailable,
    });

    return NextResponse.json({ food: makeFood }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to parse JSON or save food" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const foods = await Food.find();

    return NextResponse.json(
      {
        message: "Foods fetched successfully hehe",
        foods,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching foods :(", error);

    return NextResponse.json(
      {
        message: "Failed to fetch foods",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectMongoDB();
    const id = new URL(req.url).searchParams.get("id");
    await Food.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Food deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to delete the food",
      },
      { status: 500 }
    );
  }
}
