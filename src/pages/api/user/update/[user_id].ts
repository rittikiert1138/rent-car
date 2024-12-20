import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user_id } = req.query;

    const { phone, username, password, role, updatedBy } = req.body;

    const checkDuplicate = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: username,
          },
          { phone: phone },
        ],
        NOT: {
          user_id: Number(user_id),
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
      await prisma.user.update({
        data: {
          phone: phone,
          username: username,
          password: hashPassword,
          role: role,
          updatedBy: Number(updatedBy),
        },
        where: {
          user_id: Number(user_id),
        },
      });
    } else {
      await prisma.user.update({
        data: {
          phone: phone,
          username: username,
          role: role,
          updatedBy: Number(updatedBy),
        },
        where: {
          user_id: Number(user_id),
        },
      });
    }

    res.status(200).json({ status: true, message: "Update user success" });
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
}
