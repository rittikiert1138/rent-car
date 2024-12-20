// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { lotto_id, member_id, betList, bet_count } = req.body;

    const checkBalance = await prisma.member.findUnique({
      where: {
        member_id: member_id,
      },
    });

    if (checkBalance.balance < bet_count) {
      res.status(200).json({ status: false, message: "คุณมีเครดิตไม่เพียงพอ" });
    }

    await prisma.member.update({
      where: {
        member_id: member_id,
      },
      data: {
        balance: { decrement: bet_count },
        total_bet: { increment: bet_count },
      },
    });

    const createLottoMember = await prisma.member_lotto.create({
      data: {
        lotto_id: Number(lotto_id),
        member_id: member_id,
      },
    });

    if (createLottoMember) {
      await prisma.member_lotto_list.createMany({
        data: betList.map((bet: any) => {
          return {
            lotto_id: Number(lotto_id),
            member_lotto_id: createLottoMember.member_lotto_id,
            member_id: member_id,
            bet_type: bet.bet_type,
            bet_number: bet.unit,
            bet_amount: bet.bet_price,
            bet_status: 1,
            bet_pay: parseFloat(bet.bet_pay),
          };
        }),
      });

      res.status(200).json({ status: true, message: "สำเร็จ", memberLotto: createLottoMember });
    } else {
      res.status(400).json({ status: false, message: "เกิดข้อผิดพลาด" });
    }
  } catch (error: any) {
    console.log("error", error);
    res.status(400).json({ status: false, message: "เกิดข้อผิดพลาด" });
  } finally {
    await prisma.$disconnect();
  }
}
