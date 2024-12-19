import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { member_id } = req.query;

    const member = await prisma.member.findUnique({
      select: {
        member_id: true,
        username: true,
        phone: true,
        status: true,
        attemp: true,
        balance: true,
        user_id: true,
      },
      where: {
        member_id: Number(member_id),
      },
    });

    res.status(200).json(member);
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
