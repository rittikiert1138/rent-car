// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("req.body", req.body);
    const { lotto_id, member_id, betList } = req.body;

    const createLottoMember = await prisma.member_lotto.create({
      data: {
        lotto_id: Number(lotto_id),
        member_id: member_id,
      },
    });

    if (createLottoMember) {
      const createLottoList = await prisma.member_lotto_list.createMany({
        data: betList.map((bet: any) => {
          return {
            lotto_id: Number(lotto_id),
            member_lotto_id: createLottoMember.member_lotto_id,
            member_id: member_id,
            bet_type: bet.typeId,
            bet_number: bet.unit,
            bet_amount: bet.bet_price,
            bet_status: 1,
          };
        }),
      });

      res.status(200).json(createLottoList);
    } else {
      res.status(400).json(createLottoMember);
    }
  } catch (error: any) {
    console.log("error", error);
    res.status(400).json({ status: false, message: "มีผู้ใช้งานนี้ในระบบแล้ว" });
  }
}
