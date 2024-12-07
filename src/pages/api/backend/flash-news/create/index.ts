import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const news = await prisma.flash_news.create({
      data: {
        flash_news_content: req.body.flash_news_content,
        flash_news_status: 0,
      },
    });

    if (news) {
      res.status(200).json({
        status: true,
        message: "เพิ่มข้อมูลสำเร็จ",
      });
    } else {
      res.status(200).json({
        status: false,
        message: "เพิ่มข้อมูลสำเร็จ",
      });
    }
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
