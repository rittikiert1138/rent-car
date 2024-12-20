import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import dayjs from "dayjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { skip, limit, member_id, type } = req.body;

    // const countLottos = await prisma.member_lotto.count({
    //   where: {
    //     member_id: req.body.member_id,
    //   },
    // });

    let conditionSearch: any;

    if (type === "archive") {
      conditionSearch = {
        lte: dayjs().add(1, "day").format("YYYY-MM-DD HH:mm"),
      };
    } else {
      conditionSearch = {
        gte: dayjs().subtract(2, "day").format("YYYY-MM-DD HH:mm"),
      };
    }

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
        member_id: member_id,
        lotto: {
          period: conditionSearch,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip,
      take: limit,
    });

    const countLottos = await prisma.member_lotto.findMany({
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
        member_id: member_id,
        lotto: {
          period: conditionSearch,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({
      status: true,
      message: "Success",
      lottos,
      countLottos: countLottos.length,
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
