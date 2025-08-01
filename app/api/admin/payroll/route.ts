import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/dbConnect";
import Payroll from "@/models/Payroll";
import Company from "@/models/Company"; // ✅ Must be imported if referenced
import User from "@/models/User"; // ✅ Assuming sellerId refers to User

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const companies = await Company.find({});
  return NextResponse.json(companies);

    // const payrolls = await Payroll.find()
    //   .populate("companyId", "name email") // populate company with only name & email
    //   .populate("sellerId", "firstName lastName email") // populate seller info
    //   .exec();

    // return NextResponse.json(
    //   { success: true, data: payrolls },
    //   { status: 200 }
    // );
  } catch (error: any) {
    console.error("Error fetching payrolls:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching payrolls",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  const { companyId, sellerId, type, rate, approvedSales, hoursWorked } = body;

  // Validate required fields
  if (!companyId || !sellerId || !type) {
    return NextResponse.json(
      { error: "companyId, sellerId, and type are required" },
      { status: 400 }
    );
  }

  // Optional: auto-calculate totalPay
  let totalPay = body.totalPay;
  if (type === "hourly" && rate && hoursWorked) {
    totalPay = rate * hoursWorked;
  }

  const newPayroll = await Payroll.create({
    companyId,
    sellerId,
    type,
    rate,
    hoursWorked,
    totalPay,
  });

  return NextResponse.json(newPayroll, { status: 201 });
}
