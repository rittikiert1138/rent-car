// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, password } = req.body;

    const secret: any = process.env.NEXT_PUBLIC_JWT_SECRET_BACKEND;

    const secretKey = Buffer.from(secret, "utf8");

    const checkUser: any = await prisma.user.findFirst({
      where: {
        username: username,
        status: 1,
      },
      select: {
        user_id: true,
        username: true,
        password: true,
        phone: true,
        role: true,
      },
    });

    if (!checkUser) {
      return res.status(200).json({
        status: false,
        message: "ไม่มีผู้ใช้นี้ในระบบ",
      });
    }

    const checkPassword = await bcrypt.compare(password, checkUser?.password);

    if (!checkPassword) {
      return res.status(200).json({
        status: false,
        message: "รหัสผ่านไม่ถูกต้อง",
      });
    }

    delete checkUser?.password;

    const token = jwt.sign(checkUser, secretKey, { algorithm: "HS256", expiresIn: "1h" });

    res.status(200).json({
      status: true,
      message: "Login success",
      token: token,
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
