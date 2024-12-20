import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { status, lotto_id, lotto_type } = req.body;

    await prisma.lotto.updateMany({
      data: {
        status: 0,
      },
      where: {
        lotto_type: lotto_type,
        NOT: {
          lotto_id: lotto_id,
        },
      },
    });

    const changeStatus = await prisma.lotto.update({
      data: {
        status: status,
      },
      where: {
        lotto_id: lotto_id,
      },
    });

    if (changeStatus) {
      res.status(200).json({
        status: true,
        message: "เปลี่ยนสถานะสำเร็จ",
      });
    } else {
      res.status(200).json({
        status: false,
        message: "เปลี่ยนสถานะไม่สำเร็จ",
      });
    }
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
}
