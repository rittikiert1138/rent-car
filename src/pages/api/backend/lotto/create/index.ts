import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { lotto_type_id, period, open_time, close_time } = req.body;
    console.log("req.body", req.body);

    const checkDuplicate = await prisma.lotto.findFirst({
      where: {
        lotto_type_id: Number(lotto_type_id),
        period: dayjs(period).format("YYYY-MM-DD HH:mm"),
      },
    });

    if (checkDuplicate) {
      res.status(200).json({
        status: false,
        message: `มีรายการหวยนี้แล้ว`,
      });
    } else {
      const lotto = await prisma.lotto.create({
        data: {
          lotto_type_id: Number(lotto_type_id),
          period: dayjs(period).format("YYYY-MM-DD HH:mm"),
          open_time: dayjs(open_time).format("YYYY-MM-DD HH:mm"),
          close_time: dayjs(close_time).format("YYYY-MM-DD HH:mm"),
          status: 1,
        },
      });

      res.status(200).json({
        status: true,
        message: "สร้างหวยสำเร็จ",
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
