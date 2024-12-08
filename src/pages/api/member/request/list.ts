// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const requests = await prisma.transaction.findMany({
      where: {
        member_id: req.body.member_id,
        transaction_status: 1,
      },
    });
    res.status(200).json({
      status: true,
      message: "Success",
      requests,
    });
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
