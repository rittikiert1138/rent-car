// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, phone, password, user_id } = req.body;

    const checkDup = await prisma.member.findFirst({
      where: {
        username,
        phone: phone,
      },
    });

    if (checkDup) {
      res.status(200).json({ status: false, message: "มีผู้ใช้งานนี้ในระบบแล้ว" });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);

      await prisma.member.create({
        data: {
          username: username,
          password: hashPassword,
          phone: phone,
          status: 1,
          user_id: Number(user_id) ?? null,
        },
      });

      res.status(200).json({ status: true, message: "success" });
    }
  } catch (error: any) {
    res.status(400).json({ status: false, message: "มีผู้ใช้งานนี้ในระบบแล้ว" });
  }
}
