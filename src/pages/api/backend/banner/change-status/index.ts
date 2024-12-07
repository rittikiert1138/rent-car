import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { banner_status, banner_id } = req.body;

    const changeStatus = await prisma.banner.update({
      data: {
        banner_status: banner_status,
      },
      where: {
        banner_id: banner_id,
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
