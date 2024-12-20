// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { phone, ref, otp, type = "register" } = req.body;

    const findOTP = await prisma.otp_system.findFirst({
      where: {
        phone: phone,
        ref: ref,
      },
    });

    if (type === "forgot") {
      const findMember = await prisma.member.findFirst({
        where: {
          phone: phone,
        },
        select: {
          username: true,
          member_id: true,
        },
      });

      if (findOTP?.otp === otp) {
        res.status(200).json({ status: true, message: "รหัส OTP ถูกต้อง", member: findMember });
      } else {
        res.status(200).json({ status: false, message: "รหัส OTP ไม่ถูกต้อง" });
      }
    } else if (type === "register") {
      if (findOTP?.otp === otp) {
        res.status(200).json({ status: true, message: "รหัส OTP ถูกต้อง" });
      } else {
        res.status(200).json({ status: false, message: "รหัส OTP ไม่ถูกต้อง" });
      }
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
