import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { skip, limit } = req.body;

    const countLottos = await prisma.member_lotto.count({
      where: {
        member_id: req.body.member_id,
      },
    });

    const lottos = await prisma.member_lotto.findMany({
      include: {
        member_lotto_list: true,
        lotto: {
          include: {
            lotto_type: {
              select: {
                lotto_type_name: true,
              },
            },
          },
        },
      },
      where: {
        member_id: req.body.member_id,
        status: 1,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip,
      take: limit,
    });

    res.status(200).json({
      status: true,
      message: "Success",
      lottos,
      countLottos,
    });
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
