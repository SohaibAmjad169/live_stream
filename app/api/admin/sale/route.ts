// app/api/admin/sales/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/dbConnect";
import UnifiedSaleStream from "@/models/LiveStream";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const sales = await UnifiedSaleStream.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, sales });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
