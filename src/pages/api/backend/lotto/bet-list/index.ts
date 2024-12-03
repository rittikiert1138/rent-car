import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { lotto_id } = req.body;

    const lottoList = await prisma.member_lotto_list.findMany({
      where: {
        lotto_id: Number(lotto_id),
      },
      include: {
        member_lotto: {
          include: {
            member: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      status: true,
      message: "ดึงข้อมูลหวยสำเร็จ",
      lottoList,
    });
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
