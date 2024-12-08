import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { lotto_list, member_lotto_id, lotto_id, lotto_result } = req.body;

    const createLottoResult = await prisma.lotto_result.create({
      data: {
        lotto_id: Number(lotto_id),
      },
    });

    await prisma.lotto_result_list.createMany({
      data: lotto_result.map((l: any) => {
        return {
          lotto_result_id: createLottoResult.lotto_result_id,
          lotto_result_type: l.type,
          lotto_result_number: l.bet_number.toString(),
        };
      }),
    });

    await prisma.member_lotto.update({
      data: {
        status: 2,
      },
      where: {
        member_lotto_id: member_lotto_id,
      },
    });

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
      message: "ออกผลหวยสำเร็จ",
    });
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
