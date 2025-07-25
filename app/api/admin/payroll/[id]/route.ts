// app/api/admin/payroll/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/dbConnect";
import Payroll from "@/models/Payroll";
import User from "@/models/User";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = params;

  try {
    const payroll = await Payroll.findById(id).populate("sellerId"); // populate employee

    if (!payroll) {
      return NextResponse.json({ error: "Payroll not found" }, { status: 404 });
    }

    return NextResponse.json({ payroll });
  } catch (error) {
    console.error("GET payroll error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = params;

  try {
    const body = await req.json();
    const { hoursWorked, approvedSales, rate, type } = body;

    const updatedPayroll = await Payroll.findByIdAndUpdate(
      id,
      { hoursWorked, approvedSales, rate, type },
      { new: true }
    );

    if (!updatedPayroll) {
      return NextResponse.json({ error: "Payroll not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Payroll updated",
      payroll: updatedPayroll,
    });
  } catch (error) {
    console.error("PUT payroll error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
