import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { phone, username, password, role, createdBy, updatedBy } = req.body;

    const checkPhone = await prisma.user.findFirst({
      where: {
        phone: phone,
        username: username,
      },
    });

    if (checkPhone) {
      return res.status(200).json({
        message: "Phone or Username already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const users = await prisma.user.create({
      data: {
        phone: phone,
        username: username,
        password: hashPassword,
        role: role,
        status: 1,
        createdBy: 1,
        updatedBy: 1,
      },
    });

    res.status(200).json(users);
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
