// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

// type Data = {
//   name: string | number | null;
// };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    var decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);

    console.log("decoded", decoded);

    // const token = jwt.sign({ user_id: 1 }, "M1R3eff74wX9ghj3qCvLXVh1RfVWG7Lk" as string);

    res.status(200).json(decoded);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
