import { NextResponse } from "next/server";
const cloudinary = require("cloudinary").v2;
import { join } from "path";
import { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
export async function upload(request) {
  try {
    const session = await getServerSession(request);
    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await request.formData();
    const file = data.get("photos");
    if (!file)
      return NextResponse.json({ message: "No file found" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join("/", "/tmp", file.name);
    await writeFile(path, buffer);

    let result = await cloudinary.uploader.upload(path, {
      folder: "nestly/user",
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export { upload as POST };
