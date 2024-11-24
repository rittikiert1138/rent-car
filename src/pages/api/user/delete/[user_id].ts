// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  try {

    const { user_id } = req.query;

    await prisma.user.delete({
        where:{
            user_id: Number(user_id)
        }
    });

    res.status(200).json({status: true, message: "Delete user success"});
  } catch (error:any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
