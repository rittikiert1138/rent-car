import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // const { user_id } = req.query;

    const { phone, username, password, status, updatedBy, member_id, balance } = req.body;

    const checkDuplicate = await prisma.member.findFirst({
      where: {
        OR: [
          {
            username: username,
          },
          { phone: phone },
        ],
        NOT: {
          member_id: Number(member_id),
        },
      },
    });

    if (checkDuplicate) {
      return res.status(200).json({
        status: false,
        message: "Phone or Username already exists",
      });
    }

    if (password.length > 0) {
      const hashPassword = await bcrypt.hash(password, 10);
      await prisma.member.update({
        data: {
          phone: phone,
          username: username,
          password: hashPassword,
          status: Number(status),
          balance: Number(balance),
          //   updatedBy: Number(updatedBy),
        },
        where: {
          member_id: Number(member_id),
        },
      });
    } else {
      await prisma.member.update({
        data: {
          phone: phone,
          username: username,
          status: Number(status),
          balance: Number(balance),
          //   updatedBy: Number(updatedBy),
        },
        where: {
          member_id: Number(member_id),
        },
      });
    }

    res.status(200).json({ status: true, message: "Update member success" });
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
