// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// type Data = {
//   name: string | number | null;
// };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json({ status: true, message: "success" });
  } catch (error: any) {
    console.log("error", error.message);
    res.status(200).json({ status: false, message: "มีผู้ใช้งานนี้ในระบบแล้ว" });
  }
}
