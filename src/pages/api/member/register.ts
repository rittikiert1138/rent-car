// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("req.body", req.body);
    const { username, phone, password, user_id } = req.body;

    const checkDup = await prisma.member.findFirst({
      where: {
        username,
        phone_number: phone,
      },
    });

    console.log("checkDup", checkDup);

    if (checkDup) {
      res.status(200).json({ status: false, message: "มีผู้ใช้งานนี้ในระบบแล้ว" });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);

      await prisma.member.create({
        data: {
          username: username,
          password: hashPassword,
          phone_number: phone,
          user_id: Number(user_id) ?? null,
        },
      });

      res.status(200).json({ status: true, message: "success" });
    }
  } catch (error: any) {
    console.log("error", error.message);
    res.status(400).json({ status: false, message: "มีผู้ใช้งานนี้ในระบบแล้ว" });
  }
}
