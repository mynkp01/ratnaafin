// import Query from "@/api/Query";
// import { decrypt } from "@/utils/helper";
// import axios from "axios";
// import { unlink } from "fs/promises";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
// import path from "path";

// export async function POST(request: NextRequest) {
//   const data = await request.formData();
//   const file: File | null = data.get("upload") as unknown as File;

//   const token = (await cookies()).get("token")?.value;
//   const decryptedToken = decrypt(token || "");

//   console.log("token :", token);
//   console.log("decryptedToken :", decryptedToken);

//   if (!file) {
//     return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//   }

//   // const bytes = await file.arrayBuffer();
//   // const buffer = Buffer.from(bytes);

//   // const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
//   // const uploadDir = path.join(process.cwd(), "public/upload");

//   try {
//     let fd = new FormData();
//     fd.append("doc_path", file);

//     const { data } = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URL}${Query.blogContentUpload}`, fd, {
//       headers: { Authorization: `Bearer ${decryptedToken}` },
//     });

//     return NextResponse.json({ url: data?.data });
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     return NextResponse.json({ error: "Error uploading file" }, { status: 500 });
//   }
// }

// export async function DELETE(request: NextRequest) {
//   try {
//     const { url } = await request.json();

//     if (!url) {
//       return NextResponse.json({ error: "No URL provided" }, { status: 400 });
//     }

//     const filename = url.split("/").pop();
//     const filePath = path.join(process.cwd(), "public/upload", filename);

//     await unlink(filePath);

//     return NextResponse.json({ message: "File deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting file:", error);
//     return NextResponse.json({ error: "Error deleting file" }, { status: 500 });
//   }
// }
