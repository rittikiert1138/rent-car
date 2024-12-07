import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { flash_news_status, flash_news_id } = req.body;

    await prisma.flash_news.updateMany({
      data: {
        flash_news_status: 0,
      },
      where: {
        NOT: {
          flash_news_id: flash_news_id,
        },
      },
    });

    const changeStatus = await prisma.flash_news.update({
      data: {
        flash_news_status: flash_news_status,
      },
      where: {
        flash_news_id: flash_news_id,
      },
    });

    if (changeStatus) {
      res.status(200).json({
        status: true,
        message: "เปลี่ยนสถานะสำเร็จ",
      });
    } else {
      res.status(200).json({
        status: false,
        message: "เปลี่ยนสถานะไม่สำเร็จ",
      });
    }
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
