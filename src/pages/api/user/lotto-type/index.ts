// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// type Data = {
//   name: string | number | null;
// };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const lottoTypes = await prisma.lotto_type.findMany();

    if (lottoTypes) {
      res.status(200).json({ status: true, message: "Get lotto success", data: lottoTypes });
    } else {
      res.status(200).json({ status: false, message: "Get lotto failed" });
    }
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
