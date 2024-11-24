// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { transaction_type } = req.body;

    const transactions = await prisma.transaction.findMany({
      where: {
        transaction_type: transaction_type,
      },
      include: {
        member: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        transaction_status: "asc",
      },
    });

    res.status(200).json(transactions);
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
