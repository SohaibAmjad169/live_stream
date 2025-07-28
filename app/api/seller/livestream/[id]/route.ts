import { connectDB } from "@/lib/db/dbConnect";
import UnifiedSaleStream from "@/models/LiveStream";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const stream = await UnifiedSaleStream.findById(params.id);

    if (!stream) {
      return NextResponse.json(
        { success: false, message: "Stream not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: stream }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await req.json();

    const updatedStream = await UnifiedSaleStream.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStream) {
      return NextResponse.json(
        { success: false, message: "Stream not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedStream },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
