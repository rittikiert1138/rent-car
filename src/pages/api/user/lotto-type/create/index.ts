// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { lotto_type_name } = req.body;

    const checkLottoTypeName = await prisma.lotto_type.findFirst({
      where: {
        lotto_type_name: lotto_type_name,
      },
    });
    if (checkLottoTypeName) {
      res.status(200).json({ status: false, message: "Lotto type name already exists" });
    } else {
      const lottoType = await prisma.lotto_type.create({
        data: {
          lotto_type_name: lotto_type_name,
          lotto_type_status: 1,
          order_seq: 1,
          lotto_type_width: "col-span-12",
        },
      });

      if (lottoType) {
        res.status(200).json({ status: true, message: "Create lotto success" });
      } else {
        res.status(200).json({ status: false, message: "Create lotto failed" });
      }
    }
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
