import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user_id } = req.body;

    const limit = await prisma.lotto_limit.findFirstOrThrow({
      include: {
        lotto_limit_list: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      where: {
        user_id: Number(user_id),
      },
    });

    res.status(200).json({
      status: true,
      message: "ดึงข้อมูลหวยสำเร็จ",
      limits: limit.lotto_limit_list,
    });
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
