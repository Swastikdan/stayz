import { NextResponse } from "next/server";
const cloudinary = require("cloudinary").v2;
import { getServerSession } from "next-auth";
export async function uploadbylink(request) {
  try {
    const session = await getServerSession();
    if (!session)
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { link } = await request.json(); // link is now an array
    let urls = [];

    for (let i = 0; i < link.length; i++) {
      // Iterate over the array
      let result = await cloudinary.uploader.upload(link[i], {
        folder: 'nestly/places',
        public_id: `image_${Date.now()}_${i}`, // Add a unique public_id
      });
      urls.push(result.secure_url);
    }

    return NextResponse.json(urls);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}

export { uploadbylink as POST };