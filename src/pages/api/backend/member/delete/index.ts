import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { member_id } = req.body;

    const member = await prisma.member.delete({
      where: {
        member_id: Number(member_id),
      },
    });

    if (member) {
      res.status(200).json({ status: true, message: "Delete member success" });
    } else {
      res.status(200).json({ status: false, message: "Delete member failed" });
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
