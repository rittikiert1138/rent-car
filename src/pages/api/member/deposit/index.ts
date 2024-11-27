import formidable from "formidable";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { request } from "http";
import type { NextApiRequest, NextApiResponse } from "next";

// Disable body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to handle form parsing
const parseForm = async (req: NextApiRequest) => {
  const uploadDir = path.join(process.cwd(), "/public/uploads"); // Directory for uploads

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
    // console.log("fields", fields);
    // console.log("files", files?.slip);
    const balance = fields?.total?.[0];
    const slip = files?.slip?.[0]?.newFilename;
    const member_id = fields?.member_id;

    console.log("slip", slip);

    await prisma.transaction.create({
      data: {
        transaction_type: 1,
        transaction_status: 1,
        member_id: Number(member_id),
        transaction_slip: slip,
        balance: Number(balance),
      },
    });

    res.status(200).json({
      message: "ทำรายการฝากเงินสำเร็จ",
      // fields,
      files: files?.slip?.[0]?.newFilename,
    });
  } catch (error) {
    console.log("error", (error as Error).message);
    res.status(500).json({ error: `File upload failed: ${(error as Error).message}` });
  }
}
