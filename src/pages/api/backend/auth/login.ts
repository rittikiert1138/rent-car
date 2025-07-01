// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { api } from "@/utils/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("Request body:", req.body);
    const response = await api.post(
      "http://localhost:5050/api/users/login",
      req.body
    );
    console.log("response", response.data);
    if (response.status === 200) {
      return res.status(200).json("success");
    }
    // return res.status(200).send("success");
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
