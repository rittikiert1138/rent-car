import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const banners = await prisma.banner.findMany();

    if (banners) {
      res.status(200).json({
        status: true,
        message: "Get banner success",
        banners,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Get banner failed",
        banners,
      });
    }
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
