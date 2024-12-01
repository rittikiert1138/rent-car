// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { transaction_status, transaction_id, transaction_amount, member_id } = req.body;

    console.log("req.body", req.body);

    if (transaction_status === 2) {
      await prisma.transaction.update({
        where: {
          transaction_id: transaction_id,
        },
        data: {
          transaction_status: transaction_status,
        },
      });

      await prisma.member.update({
        where: {
          member_id: member_id,
        },
        data: {
          balance: {
            increment: transaction_amount,
          },
        },
      });
    } else if (transaction_status === 3) {
      await prisma.transaction.update({
        where: {
          transaction_id: transaction_id,
        },
        data: {
          transaction_status: transaction_status,
        },
      });
    }
    res.status(200).json({ status: true, message: "Success" });
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
