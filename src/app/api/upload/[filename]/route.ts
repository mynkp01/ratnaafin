import { API_V1 } from "@/utils/Constant";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(request: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;

  if (!filename) {
    return NextResponse.json({ error: "Filename is required" }, { status: 400 });
  }

  const filePath = path.join(`${process.env.NEXT_PUBLIC_FRONTEND_URL}${API_V1}`, filename);

  try {
    // const fileBuffer = await readFile(filePath);
    // const contentType = mime.getType(filename) || "application/octet-stream";

    return new NextResponse(filePath);
  } catch (error) {
    console.error("Error serving file:", error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
