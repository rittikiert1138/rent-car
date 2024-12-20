// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { member_id } = req.body;
    const getMember: any = await prisma.member.findFirst({
      where: {
        member_id: member_id,
      },
      select: {
        balance: true,
      },
    });

    res.status(200).json({
      status: true,
      message: "Refresh success",
      balance: getMember?.balance,
    });
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
}
