import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { lotto_type_id } = req.body;

    const lottos = await prisma.lotto.findMany({
      include: {
        lotto_result: {
          include: {
            lotto_result_list: true,
          },
        },
      },
      where: {
        lotto_type_id: Number(lotto_type_id),
      },
      orderBy: [
        {
          period: "desc",
        },
        {
          status: "desc",
        },
      ],
    });

    // const lottos = await prisma.lotto.findMany({
    //   include: {
    //     // lotto_type: {
    //     //   select: {
    //     //     lotto_type_name: true,
    //     //   },
    //     // },
    // lotto_result: {
    //   include: {
    //     lotto_result_list: true,
    //   },
    // },
    //   },
    // orderBy: [
    //   {
    //     status: "desc",
    //   },
    //   {
    //     lotto_type_id: "asc",
    //   },
    // ],
    // });

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
  } finally {
    await prisma.$disconnect();
  }
}
