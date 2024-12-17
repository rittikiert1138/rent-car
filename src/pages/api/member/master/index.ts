// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const master = await prisma.user.findFirst({
      where: {
        role: "MASTER",
      },
    });

    res.status(200).json({ status: true, message: "success", master });
  } catch (error: any) {
    console.log("error", error.message);
    res.status(400).json({ status: false, message: "Internal server error" });
  }
}
