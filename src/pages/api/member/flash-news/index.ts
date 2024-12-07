import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const flash_news = await prisma.flash_news.findFirst({
      where: {
        flash_news_status: 1,
      },
    });
    if (flash_news) {
      res.status(200).json({
        status: true,
        message: "ดึงข้อมูลสำเร็จ",
        flash_news: flash_news,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "ดึงข้อมูลไม่สำเร็จ",
      });
    }
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
