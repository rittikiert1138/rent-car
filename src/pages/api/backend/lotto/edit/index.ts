import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const lotto = await prisma.lotto.findUnique({
      where: {
        lotto_id: Number(req.body.lotto_id),
      },
      include: {
        lotto_type: {
          select: {
            lotto_type_name: true,
          },
        },
      },
    });

    if (lotto) {
      res.status(200).json({
        status: true,
        message: "ดึงข้อมูลหวยสำเร็จ",
        lotto,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "ไม่พบข้อมูลหวย",
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
