import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const lotto = await prisma.lotto.findFirst({
      where: {
        lotto_id: req.body.lotto_id,
      },
    });

    if (lotto) {
      res.status(200).json({
        status: true,
        message: "Success",
        lotto,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Success",
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
