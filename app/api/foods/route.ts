import connectMongoDB from "@/lib/mongodb";
import Food from "@/models/food";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectMongoDB();

  try {
    const data = await req.formData(); // Change this if you expect JSON, depending on your frontend
    const foodData = {
      name: data.get("name") as string,
      description: data.get("description") as string,
      price: parseFloat(data.get("price") as string),
      category: data.get("category") as string,
      isAvailable: data.get("isAvailable") === "true",
      img: data.get("img"), // Assuming this is a string representation
    };

    // Check for the image data
    const imgData = data.get("img"); // img should be the name of your file input

    if (imgData instanceof File) {
      const imgBuffer = Buffer.from(await imgData.arrayBuffer());
      // Proceed with storing imgBuffer
      foodData.img = imgBuffer.toString('base64'); // If you want to store it as base64
    } else {
      console.error("Image data is not a valid file.");
      return NextResponse.json({ error: "Image data is required" }, { status: 400 });
    }

    // Check required fields
    if (!foodData.name || !foodData.description) {
      return NextResponse.json(
        { error: "Please enter all the required fields" },
        { status: 400 }
      );
    }

    const makeFood = await Food.create(foodData);

    return NextResponse.json({ food: makeFood }, { status: 201 });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Failed to parse form data or save food" },
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
