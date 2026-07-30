import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("TEST DB ROUTE - typeof DATABASE_URL:", typeof process.env.DATABASE_URL);
    console.log("TEST DB ROUTE - DATABASE_URL value:", process.env.DATABASE_URL);
    
    const user = await db.user.findFirst();
    return NextResponse.json({ success: true, user });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: String(e), message: e.message, code: e.code, name: e.name },
      { status: 500 }
    );
  }
}
