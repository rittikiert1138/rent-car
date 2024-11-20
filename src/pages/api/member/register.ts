// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// type Data = {
//   name: string | number | null;
// };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = req.body;

    const checkDup = await prisma.member.findFirst({
      where: {
        username: body.username,
        phone_number: body.phoneNumber,
      },
    });

    console.log("checkDup", checkDup);

    if (checkDup) {
      console.log("iff checkDup");
      await prisma.member.create({
        data: {
          username: body.username,
          password: body.password,
          phone_number: body.phoneNumber,
        },
      });

      res.status(200).json({ status: false, message: "มีผู้ใช้งานนี้ในระบบแล้ว" });
    } else {
      await prisma.member.create({
        data: {
          username: body.username,
          password: body.password,
          phone_number: body.phoneNumber,
        },
      });

      res.status(200).json({ status: true, message: "success" });
    }
  } catch (error: any) {
    console.log("error", error.message);
    res.status(200).json({ status: false, message: "มีผู้ใช้งานนี้ในระบบแล้ว" });
  }
}
