import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { lotto_type_name } = req.body;

    const checkDuplicate = await prisma.lotto_type.findFirst({
      where: {
        lotto_type_name: lotto_type_name,
      },
    });

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
        lotto_type_width: "col-span-12",
      },
    });

    res.status(200).json({
      status: true,
      message: "สร้างประเภทหวยสำเร็จ",
      lotto_type,
    });
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
