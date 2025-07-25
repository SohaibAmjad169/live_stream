// app/api/livestreams/route.ts
import { connectDB } from "@/lib/db/dbConnect";
import LiveStream from "@/models/LiveStream";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { streamTitle, date, platform, sales, revenue, profit, status } =
      body;

    const newStream = await LiveStream.create({
      streamTitle,
      date,
      platform,
      sales,
      revenue,
      profit,
      status,
    });

    return NextResponse.json(
      { success: true, data: newStream },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const allStreams = await LiveStream.find().sort({ date: -1 }); // newest first
    return NextResponse.json(
      { success: true, data: allStreams },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

