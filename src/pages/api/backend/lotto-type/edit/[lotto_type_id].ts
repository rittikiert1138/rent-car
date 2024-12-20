import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { lotto_type_id } = req.body;

    const lotto_type = await prisma.lotto_type.findFirst({
      where: {
        lotto_type_id: lotto_type_id,
      },
    });

    if (lotto_type) {
      res.status(200).json({
        status: true,
        message: "ดึงข้อมูลประเภทหวยสำเร็จ",
        lotto_type,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "ดึงข้อมูลประเภทหวยไม่สำเร็จ",
      });
    }
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
