import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const lotto_types = await prisma.lotto_type.findMany();

    res.status(200).json({
      status: true,
      message: "ดึงข้อมูลประเภทหวยสำเร็จ",
      lotto_types,
    });
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
