import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { lotto_id } = req.body;

    const lottos = await prisma.lotto.delete({
      where: {
        lotto_id: lotto_id,
      },
    });

    if (lottos) {
      res.status(200).json({
        status: true,
        message: "ลบรายการหวยสำเร็จ",
        lottos,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "ลบรายการหวยไม่สำเร็จ",
        lottos,
      });
    }
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
