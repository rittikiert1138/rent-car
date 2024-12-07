import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { lotto_list } = req.body;

    for (let i = 0; i < lotto_list.length; i++) {
      const s = lotto_list[i];

      await prisma.member_lotto_list.update({
        data: {
          bet_number_result: s.bet_number_result,
          bet_pay_result: s.bet_pay_result,
          bet_status: s.status,
        },
        where: {
          member_lotto_list_id: Number(s.member_lotto_list_id),
        },
      });

      await prisma.member.update({
        where: {
          member_id: s.member_id,
        },
        data: {
          balance: {
            increment: s.bet_pay_result,
          },
        },
      });
    }
    res.status(200).json({
      status: true,
      message: "ดึงข้อมูลหวยสำเร็จ",
    });
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
