import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { lists } = req.body;

    const limit = await prisma.lotto_limit_list.deleteMany({
      where: {
        lotto_limit_list_id: {
          in: lists,
        },
      },
    });

    res.status(200).json({
      status: true,
      message: "ดบข้อมูลหวยสำเร็จ",
      limit,
    });
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
}
