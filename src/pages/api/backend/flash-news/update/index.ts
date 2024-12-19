import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { flash_news_id, flash_news_content } = req.body;

    const udpateNews = await prisma.flash_news.update({
      data: {
        flash_news_content: flash_news_content,
      },
      where: {
        flash_news_id: Number(flash_news_id),
      },
    });

    if (udpateNews) {
      res.status(200).json({
        status: true,
        message: "Update data success",
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Update data failed",
      });
    }
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
