// app/api/admin/inventory/route.ts
import { NextRequest, NextResponse } from "next/server";
import  { connectDB } from "@/lib/db/dbConnect";
import InventoryItem from "@/models/InventoryItem";

export async function GET() {
  try {
    await connectDB();
    const items = await InventoryItem.find();
    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const newItem = await InventoryItem.create(body);
    return NextResponse.json({ success: true, data: newItem });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
