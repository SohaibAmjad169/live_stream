import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/dbConnect";
import UnifiedSaleStream from "@/models/LiveStream";

// GET: Fetch sale by ID
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const sale = await UnifiedSaleStream.findById(params.id);

    if (!sale) {
      return NextResponse.json(
        { success: false, message: "Sale not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, sale });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// PUT: Update adminStatus of a sale
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { status } = await req.json();

    const sale = await UnifiedSaleStream.findByIdAndUpdate(
      params.id,
      { adminStatus: status },
      { new: true }
    );

    if (!sale) {
      return NextResponse.json(
        { success: false, message: "Sale not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, sale });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
