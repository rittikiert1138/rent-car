import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { lotto_type } = req.query;

    const lottos = await prisma.lotto.findMany({
      where: {
        lotto_type_id: Number(lotto_type),
      },
    });

    res.status(200).json({
      status: true,
      message: "ดึงข้อมูลหวยสำเร็จ",
      lottos,
    });
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
