// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    await prisma.member.update({
      where: {
        member_id: req.body.member_id,
      },
      data: {
        password: hashPassword,
      },
    });

    res.status(200).json({ status: true, message: "เปลี่ยนรหัสผ่านสำเร็จ" });
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
