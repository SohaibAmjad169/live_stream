import { connectDB } from "@/lib/db/dbConnect";
import Employee from "@/types/employee";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  const updated = await Employee.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Employee.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Employee deleted" });
}
