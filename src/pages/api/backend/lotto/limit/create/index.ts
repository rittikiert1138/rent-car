import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { lotto_id, limit_list, user_id } = req.body;

    const checkLottoLimit = await prisma.lotto_limit.findFirst({
      where: {
        lotto_id: Number(lotto_id),
      },
    });

    if (checkLottoLimit) {
      await prisma.lotto_limit_list.createMany({
        data: limit_list.map((l: any) => {
          return {
            lotto_limit_id: checkLottoLimit.lotto_limit_id,
            limit_number: l.number,
            limit_amount: parseFloat(l.price),
            bet_type: Number(l.type),
          };
        }),
      });
    } else {
      const createLottoLimit = await prisma.lotto_limit.create({
        data: {
          lotto_id: Number(lotto_id),
          user_id: Number(user_id),
        },
      });

      await prisma.lotto_limit_list.createMany({
        data: limit_list.map((l: any) => {
          return {
            lotto_limit_id: createLottoLimit.lotto_limit_id,
            limit_number: l.number,
            limit_amount: parseFloat(l.price),
            bet_type: Number(l.type),
          };
        }),
      });
    }

    res.status(200).json({
      status: true,
      message: "เพิ่มข้อมูลหวยสำเร็จ",
    });
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
