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
  const uploadDir = path.join(process.cwd(), "/public/uploads/lotto-type"); // Directory for uploads

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
    const lotto_type_name = fields?.lotto_type_name?.[0];
    const icon_image: any = files?.icon_image?.[0]?.newFilename;

    const checkDuplicate = await prisma.lotto_type.findFirst({
      where: {
        lotto_type_name: lotto_type_name,
      },
    });

    console.log("checkDuplicate", checkDuplicate);

    if (checkDuplicate) {
      return res.status(200).json({
        status: false,
        message: "มีประเภทหวยนี้อยู่แล้ว",
      });
    }

    const lotto_type = await prisma.lotto_type.create({
      data: {
        lotto_type_name: lotto_type_name,
        lotto_type_status: 1,
        lotto_type_width: "col-span-6",
        lotto_type_icon: icon_image,
      },
    });

    console.log("lotto_type", lotto_type);

    if (lotto_type) {
      return res.status(200).json({
        status: true,
        message: "สร้างประเภทหวยสำเร็จ",
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "สร้างประเภทหวยไม่สำเร็จ",
      });
    }
  } catch (error) {
    console.log("error", (error as Error).message);
    res.status(500).json({ error: `File upload failed: ${(error as Error).message}` });
  }
}
