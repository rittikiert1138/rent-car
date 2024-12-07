import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { flash_news_id } = req.body;

    console.log("flash_news_id ==>", flash_news_id);

    const deletenews = await prisma.flash_news.delete({
      where: {
        flash_news_id: Number(flash_news_id),
      },
    });

    if (deletenews) {
      res.status(200).json({
        status: true,
        message: "ลบข้อมูลสำเร็จ",
      });
    } else {
      res.status(200).json({
        status: false,
        message: "ลบข้อมูลไม่สำเร็จ",
      });
    }
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
