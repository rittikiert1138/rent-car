// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username } = req.body;
    const secret: any = process.env.NEXT_PUBLIC_JWT_SECRET_FRONTEND;
    const secretKey = Buffer.from(secret, "utf8");
    const getMember: any = await prisma.member.findFirst({
      where: {
        username: username,
      },
      select: {
        member_id: true,
        username: true,
        password: true,
        phone: true,
        attemp: true,
        balance: true,
      },
    });

    const token = jwt.sign(getMember, secretKey, { algorithm: "HS256", expiresIn: "30m" });
    res.status(200).json({
      status: true,
      message: "Refresh success",
      token: token,
    });
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
