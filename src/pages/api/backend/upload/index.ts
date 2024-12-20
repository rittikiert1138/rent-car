// pages/api/upload.ts
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

// Disable the default body parser so we can handle raw data with formidable
export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to handle the file upload manually
  },
};

interface FileData {
  filepath: string;
  originalFilename: string;
  mimetype: string;
  size: number;
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();

    // Define where to store the uploaded file
    form.uploadDir = path.join(process.cwd(), "public", "uploads");
    form.keepExtensions = true; // Retain the original file extension

    // Ensure the directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Handle file parsing
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Something went wrong during the upload." });
      }

      // Access the uploaded file (assume it's under the key 'file')
      const uploadedFile = files.file as formidable.File[];

      if (!uploadedFile || uploadedFile.length === 0) {
        return res.status(400).json({ error: "No file uploaded." });
      }

      // Return success message and file info
      const file = uploadedFile[0];
      const fileData: FileData = {
        filepath: file.filepath,
        originalFilename: file.originalFilename,
        mimetype: file.mimetype,
        size: file.size,
      };

      return res.status(200).json({ message: "File uploaded successfully", file: fileData });
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;
