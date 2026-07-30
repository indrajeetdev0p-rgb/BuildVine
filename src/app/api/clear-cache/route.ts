import { NextResponse } from "next/server";

export async function GET() {
  try {
    const keys = Object.keys(require.cache);
    let cleared = 0;
    for (const key of keys) {
      if (key.includes("@prisma") || key.includes(".prisma")) {
        delete require.cache[key];
        cleared++;
      }
    }
    return NextResponse.json({ success: true, cleared });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message });
  }
}
