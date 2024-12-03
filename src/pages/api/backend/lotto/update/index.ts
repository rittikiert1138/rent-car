import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { lotto_type_id, period, open_time, close_time, lotto_id } = req.body;

    const checkDuplicate = await prisma.lotto.findFirst({
      where: {
        lotto_type_id: Number(lotto_type_id),
        period: dayjs(period).format("YYYY-MM-DD HH:mm"),
        lotto_id: {
          not: Number(lotto_id),
        },
      },
    });

    if (checkDuplicate) {
      res.status(200).json({
        status: false,
        message: `มีรายการหวยนี้แล้ว`,
      });
    } else {
      const lotto = await prisma.lotto.update({
        where: {
          lotto_id: Number(lotto_id),
        },
        data: {
          lotto_type_id: Number(lotto_type_id),
          period: dayjs(period).format("YYYY-MM-DD HH:mm"),
          open_time: dayjs(open_time).format("YYYY-MM-DD HH:mm"),
          close_time: dayjs(close_time).format("YYYY-MM-DD HH:mm"),
        },
      });

      res.status(200).json({
        status: true,
        message: "แก้ไขรายการหวยสำเร็จ",
        lotto,
      });
    }
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
