// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, password } = req.body;
    const secret: any = process.env.NEXT_PUBLIC_JWT_SECRET_FRONTEND;
    const secretKey = Buffer.from(secret, "utf8");
    const checkUser: any = await prisma.member.findFirst({
      where: {
        username: username,
        status: 1,
      },
      select: {
        member_id: true,
        username: true,
        password: true,
        phone: true,
        attemp: true,
        balance: true,
        user_id: true,
        total_bet: true,
      },
    });
    if (!checkUser) {
      return res.status(200).json({
        status: false,
        message: "ไม่มีผู้ใช้นี้ในระบบ",
      });
    }

    if (checkUser?.attemp >= 5) {
      return res.status(200).json({
        status: false,
        type: "attemp",
        message: "คุณได้พยายามลองเข้าระบบมากกว่า 5 ครั้ง กรุณาติดต่อทีมงาน",
      });
    }

    const checkPassword = await bcrypt.compare(password, checkUser?.password);
    if (!checkPassword) {
      await prisma.member.update({
        where: {
          member_id: checkUser?.member_id,
        },
        data: {
          attemp: checkUser?.attemp + 1,
        },
      });
      return res.status(200).json({
        status: false,
        type: "password",
        message: "รหัสผ่านไม่ถูกต้อง",
      });
    } else {
      await prisma.member.update({
        where: {
          member_id: checkUser?.member_id,
        },
        data: {
          attemp: 0,
        },
      });
    }
    delete checkUser?.password;
    const token = jwt.sign(checkUser, secretKey, { algorithm: "HS256", expiresIn: "30m" });
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
  }
}
