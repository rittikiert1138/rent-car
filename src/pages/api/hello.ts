// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// type Data = {
//   name: string | number | null;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const users = await prisma.user.findMany()

  res.status(200).json(users);
}
