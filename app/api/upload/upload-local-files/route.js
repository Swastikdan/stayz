import { NextResponse } from "next/server";
const cloudinary = require('cloudinary').v2;
import { join } from "path";
import { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
export async function upload(request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await request.formData();
    const files = data.getAll("photos");
    if (!files || files.length === 0)
      return NextResponse.json({ message: "No files found" }, { status: 400 });

    let urls = [];
    for (let file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join("/", "/tmp", file.name);
      await writeFile(path, buffer);
      let result = await cloudinary.uploader.upload(path, {
        folder: "nestly/places",
      });
      urls.push(result.secure_url);
    }

    return NextResponse.json(urls);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export { upload as POST };
