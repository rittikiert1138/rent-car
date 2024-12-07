import formidable from "formidable";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import type { NextApiRequest, NextApiResponse } from "next";

// Disable body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to handle form parsing
const parseForm = async (req: NextApiRequest) => {
  const uploadDir = path.join(process.cwd(), "/public/uploads/banners"); // Directory for uploads

  // Ensure the upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir, // Directory for uploaded files
    keepExtensions: true, // Keep file extensions
    maxFileSize: 2 * 1024 * 1024, // Max file size in bytes (optional)
    multiples: false, // Whether to allow multiple files
  });

  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const { fields, files } = await parseForm(req);
    const banner_image: any = files?.banner_image?.[0]?.newFilename;

    const countBanner = await prisma.banner.count();

    const banner = await prisma.banner.create({
      data: {
        banner_image: banner_image,
        banner_status: 1,
        order_seq: countBanner + 1,
      },
    });

    if (banner) {
      res.status(200).json({
        status: true,
        message: "ทำรายการสำเร็จ",
      });
    } else {
      res.status(200).json({ status: false, message: "ทำรายการไม่สำเร็จ" });
    }
  } catch (error) {
    console.log("error", (error as Error).message);
    res.status(500).json({ error: `File upload failed: ${(error as Error).message}` });
  }
}
