// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { balance, member_id } = req.body;

    const checkTransaction = await prisma.transaction.findFirst({
      where: {
        member_id: member_id,
        transaction_status: 1,
        transaction_type: 2,
      },
    });

    if (checkTransaction) {
      res.status(200).json({
        status: false,
        message: "มีรายการที่รอการตรวจสอบอยู่",
      });
    } else {
      const requests = await prisma.transaction.create({
        data: {
          transaction_type: 2,
          transaction_status: 1,
          balance: parseFloat(balance),
          member_id: member_id,
        },
      });

      await prisma.member.update({
        where: {
          member_id: member_id,
        },
        data: {
          balance: {
            decrement: parseFloat(balance),
          },
        },
      });

      res.status(200).json({
        status: true,
        message: "Success",
        requests,
      });
    }
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
}
