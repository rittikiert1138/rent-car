import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { transaction_id } = req.query;

    const transaction = await prisma.transaction.findFirst({
      include: {
        member: {
          select: {
            balance: true,
            phone: true,
            username: true,
            status: true,
          },
        },
      },
      where: {
        transaction_id: Number(transaction_id),
      },
    });

    if (transaction) {
      res.status(200).json({
        status: true,
        message: "ดึงข้อมูลสำเร็จ",
        transaction,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "ดึงข้อมูลไม่สำเร็จ",
        transaction: null,
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
