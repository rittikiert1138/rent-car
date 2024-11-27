// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import axios from "axios";
import cryptoRandomString from "crypto-random-string";
import dayjs from "dayjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { phone, ref, type = "register" } = req.body;

    if (type === "forgot") {
      const findMember = await prisma.member.findFirst({
        where: {
          phone: phone,
        },
      });

      if (!findMember) {
        res.status(200).json({ status: false, message: "ไม่พบผู้ใช้งานนี้ในระบบ" });
      } else {
        const otp = cryptoRandomString({ length: 6, type: "numeric" });
        const randomString = cryptoRandomString({ length: 6 });

        const expired = dayjs().add(1, "minutes").toDate();

        const createOTP = await prisma.otp_system.create({
          data: {
            otp: otp,
            ref: randomString,
            phone: phone,
            expired: expired,
          },
          select: {
            ref: true,
            expired: true,
            phone: true,
            otp: true,
          },
        });

        // const textOTP = `OTP code = ${createOTP.otp} for Ref ${createOTP.ref} do not disclose and use within 5 mins.`;

        // const dataSendSMS = {
        //   sender: "LUCA",
        //   msisdn: [createOTP.phone],
        //   message: textOTP,
        // };

        // const resSendSMS = await axios.post(`${process.env.NEXT_PUBLIC_API_SEND_OTP}`, dataSendSMS, {
        //   data: dataSendSMS,
        //   headers: {
        //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SEND_OTP_TOKEN}`,
        //   },
        // });

        // const { success } = resSendSMS?.data;

        const success = true;

        if (success) {
          res.status(200).json({ status: true, message: "Send otp success", data: createOTP });
        } else {
          res.status(200).json({ status: false, message: "Send otp failed" });
        }
      }
    } else if (type === "register") {
      const checkDup = await prisma.member.findFirst({
        where: {
          phone: phone,
        },
      });

      if (checkDup) {
        res.status(200).json({ status: false, message: "มีผู้ใช้งานนี้ในระบบแล้ว" });
      } else {
        const otp = cryptoRandomString({ length: 6, type: "numeric" });

        const expired = dayjs().add(1, "minutes").toDate();

        const createOTP = await prisma.otp_system.create({
          data: {
            otp: otp,
            ref: ref,
            phone: phone,
            expired: expired,
          },
          select: {
            ref: true,
            expired: true,
            phone: true,
            otp: true,
          },
        });

        // const textOTP = `OTP code = ${createOTP.otp} for Ref ${createOTP.ref} do not disclose and use within 5 mins.`;

        // const dataSendSMS = {
        //   sender: "LUCA",
        //   msisdn: [createOTP.phone],
        //   message: textOTP,
        // };

        // const resSendSMS = await axios.post(`${process.env.NEXT_PUBLIC_API_SEND_OTP}`, dataSendSMS, {
        //   data: dataSendSMS,
        //   headers: {
        //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SEND_OTP_TOKEN}`,
        //   },
        // });

        // const { success } = resSendSMS?.data;
        const success = true;

        if (success) {
          res.status(200).json({ status: true, message: "Send otp success", data: createOTP });
        } else {
          res.status(200).json({ status: false, message: "Send otp failed" });
        }
      }
    }

    // if (checkDup && type === "register") {
    //   res.status(200).json({ status: false, message: "มีผู้ใช้งานนี้ในระบบแล้ว" });
    // } else {

    // }
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
