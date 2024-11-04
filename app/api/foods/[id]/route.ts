import connectMongoDB from "@/libs/mongodb";
import Food from "@/models/food";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const {
    newName: name,
    newDescription: description,
    newPrice: price,
    newCategory: category,
    newImg: img,
    newIsAvailable: isAvailable,
  } = await req.json();

  try {
    await connectMongoDB();
    await Food.findByIdAndUpdate(id, {
      name,
      description,
      price,
      category,
      img,
      isAvailable,
    });

    return NextResponse.json(
      { message: "Food data updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update data." },
      { status: 500 }
    );
  }
}
