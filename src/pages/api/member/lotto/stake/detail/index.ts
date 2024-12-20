import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { member_lotto_id, member_id, skip, limit } = req.body;

    const countLottos = await prisma.member_lotto_list.count({
      where: {
        member_id: Number(member_id),
        member_lotto_id: Number(member_lotto_id),
      },
    });

    const lottos = await prisma.member_lotto.findFirst({
      include: {
        member_lotto_list: {
          skip: skip,
          take: limit,
        },
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
        member_id: Number(member_id),
        member_lotto_id: Number(member_lotto_id),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      status: true,
      message: "Success",
      lottos: lottos,
      count: countLottos,
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
