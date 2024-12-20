import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user_id } = req.query;

    const users = await prisma.user.findUnique({
      select: {
        user_id: true,
        username: true,
        phone: true,
        role: true,
      },
      where: {
        user_id: Number(user_id),
      },
    });

    res.status(200).json(users);
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
}
