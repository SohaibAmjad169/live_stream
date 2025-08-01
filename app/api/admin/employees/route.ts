import { connectDB } from "@/lib/db/dbConnect";
import Employee from "@/types/employee"; // ⛳ FIX: must import Mongoose model, not TS type
import { NextRequest, NextResponse } from "next/server";

// Get all employees
export async function GET() {
  try {
    await connectDB();
    const employees = await Employee.find();
    return NextResponse.json(employees);
  } catch (error) {
    console.error("GET /api/employees error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Add a new employee
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    // You can add validation here if needed
    if (!body.name || !body.role) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newEmployee = await Employee.create(body);
    return NextResponse.json(newEmployee);
  } catch (error) {
    console.error("POST /api/employees error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
