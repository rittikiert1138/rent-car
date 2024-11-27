"use client";
import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import Countdown, { zeroPad } from "react-countdown";
import MemberLayout from "@/components/member/includes/MemberLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import classNames from "classnames";
import OtpConponent from "@/components/member/register/OtpConponent";
import { api } from "@/utils/api";
import cryptoRandomString from "crypto-random-string";
import dayjs from "dayjs";
import axios from "axios";

type FormValues = {
  phone: string;
  captcha: string;
  captcha_generate: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const ForgotPasswordPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const [numberCaptcha, setNumberCaptcha] = useState("");
  const [section, setSection] = useState<number>(1);
  const [data, setData] = useState({ phone: "", captcha: "", otp: "", expired: null, ref: "", username: "", member_id: "" });
  const [dataOTP, setDataOTP] = useState({
    data: "",
    error: false,
    message: "",
    resend: false,
  });
  const [resend, setResend] = useState(false);

  useEffect(() => {
    const rendomNumber = cryptoRandomString({ length: 4, type: "numeric" });
    setNumberCaptcha(rendomNumber.toString());
    setDataOTP({ ...dataOTP, resend: false });
  }, [section]);

  const onSubmit = async (params: any) => {
    if (params.captcha !== numberCaptcha) {
      setError("captcha", { type: "custom", message: "รหัสความปลอดภัยไม่ถูกต้อง" });
    } else {
      try {
        const randomString = cryptoRandomString({ length: 6 });
        const payload = {
          phone: params.phone,
          ref: randomString,
          type: "forgot",
        };

        const response = await api.post("/api/member/otp/send", payload);

        const { status, message, data } = response.data;

        if (status) {
          const params = new URLSearchParams();
          params.set("phone", data.phone);
          params.set("ref", data.ref);
          router.push(`${pathname}?${params.toString()}`);
          setSection(2);
          const persisData = {
            step: 2,
            expired: data.expired,
            phone: data.phone,
          };

          localStorage.setItem("checkStep", JSON.stringify(persisData));
          setData({ ...data, ref: data.ref, expired: data.expired, phone: data.phone });
        } else {
          toast.error(message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const handleVerify = async (_otp: string) => {
    if (_otp.length === 6) {
      setData({ ...data, otp: _otp });

      const payload = {
        phone: data.phone,
        otp: _otp,
        ref: data.ref,
        type: "forgot",
      };

      try {
        const response = await api.post("/api/member/otp/verify", payload);
        console.log("response", response.data);

        const { status, message, member } = response.data;

        if (status) {
          setData({ ...data, username: member.username, member_id: member.member_id });
          const persisData = {
            step: 3,
            expired: data.expired,
            phone: data.phone,
          };

          localStorage.setItem("checkStep", JSON.stringify(persisData));
          setSection(3);
        } else {
          toast.error(message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
      // setSection(3);
    } else {
      setDataOTP({ ...dataOTP, error: true, message: "รหัสยืนยันไม่ถูกต้อง" });
    }
  };

  const handleChangePassword = async (params: any) => {
    if (params.password !== params.confirmPassword) {
      setError("password", { type: "notmatch", message: "รหัสผ่านไม่ตรงกัน" });
      setError("confirmPassword", { type: "notmatch", message: "รหัสผ่านไม่ตรงกัน" });
    } else {
      try {
        const payload = {
          member_id: data.member_id,
          password: params.password,
        };

        const response = await api.post("/api/member/change-password", payload);

        const { status, message } = response.data;
        if (status) {
          toast.success(message);
          localStorage.removeItem("checkStep");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          toast.error(message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const renderer = (params: any) => {
    const { minutes, seconds, completed } = params;
    if (completed) {
      return;
    } else {
      return (
        <div className="text-center">
          <button className={classNames("text-[12px] underline", !resend ? "cursor-not-allowed text-slate-500" : "")} disabled={!resend} onClick={() => console.log("click")}>
            <span>ส่งรหัสอีกครั้ง </span>
            {!resend && (
              <span>
                ({minutes}:{zeroPad(seconds)})
              </span>
            )}
          </button>
        </div>
      );
    }
  };

  useEffect(() => {
    const currentDate = dayjs();
    const getStep: any = localStorage.getItem("checkStep");
    console.log("getStep", getStep);
    const stepData = JSON.parse(getStep);
    if (stepData && currentDate.isBefore(dayjs(stepData.expired))) {
      setSection(parseInt(stepData.step));
      setData({ ...data, phone: stepData.phone });
    } else {
      localStorage.removeItem("checkStep");
      setSection(1);
      const params = new URLSearchParams();
      params.delete("phone");
      params.delete("ref");
      router.push(`${pathname}`);
    }
  }, []);

  return (
    <MemberLayout display={false}>
      <Toaster />
      <div className="px-2">
        <div className="md:w-[600px] w-full mx-auto bg-white p-8 rounded-sm">
          <div className="text-center mb-4">
            <img src="/images/Head-logo.png" className="w-1/2 block mx-auto" />
            <h1 className="text-2xl font-bold my-4">ลืมรหัสผ่าน</h1>
            <div className="relative w-full h-10 mt-4">
              <div className={classNames("w-5 h-5 rounded-full bg-white  border-2 absolute top-1/2 -translate-y-1/2 z-20", section >= 1 ? "border-primary" : "border-slate-400")}></div>
              <div className={classNames("w-1/2 h-[2px]  absolute top-1/2 -translate-y-1/2 z-10", section > 1 ? "bg-secondary" : "bg-slate-400")}></div>
              <div className={classNames("w-5 h-5 rounded-full bg-white border-primary border-2 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 z-20", section >= 2 ? "border-primary" : "border-slate-400")}></div>
              <div className={classNames("w-1/2 h-[2px] bg-secondary absolute top-1/2 -translate-y-1/2 z-10 right-0", section > 2 ? "bg-secondary" : "bg-slate-400")}></div>
              <div className={classNames("w-5 h-5 rounded-full bg-white border-primary border-2 absolute top-1/2 -translate-y-1/2 translate-x-1/2 right-0 z-20", section >= 3 ? "border-primary" : "border-slate-400")}></div>
            </div>
          </div>
          {section === 1 && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                <Label>หมายเลขโทรศัพท์</Label>
                <Input
                  className={classNames(errors?.phone ? "border-danger focus:border-danger" : "")}
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "ข้อมูลไม่ถูกต้อง",
                    },
                    minLength: {
                      value: 10,
                      message: "ข้อมูลไม่ถูกต้อง",
                    },
                    maxLength: {
                      value: 10,
                      message: "ข้อมูลไม่ถูกต้อง",
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Error pattern",
                    },
                    validate: {
                      checkDigit: (e) => e.split("")[0] === "0" || "ข้อมูลไม่ถูกต้อง",
                    },
                  })}
                />
                {errors?.phone && <small className="text-danger">{errors.phone.message}</small>}
              </div>
              <div className=" p-4 mt-4 flex justify-center">
                {numberCaptcha.split("").map((item: any, indexImage) => (
                  <img src={`/number/${item}.png`} className="h-10 mr-4" key={`captcha_${indexImage}`} />
                ))}
              </div>
              <div className="mt-2">
                <Label>รหัสความปลอดภัย</Label>
                <Input
                  className={classNames(errors?.captcha ? "border-danger focus:border-danger" : "")}
                  {...register("captcha", {
                    required: {
                      value: true,
                      message: "ข้อมูลไม่ถูกต้อง",
                    },
                    minLength: {
                      value: 4,
                      message: "ข้อมูลไม่ถูกต้อง",
                    },
                    maxLength: {
                      value: 4,
                      message: "ข้อมูลไม่ถูกต้อง",
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Error pattern",
                    },
                  })}
                  maxLength={4}
                />
                {errors?.captcha && <small className="text-danger">{errors.captcha.message}</small>}
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2">
                  <Link href="/login">
                    <Button className="w-full mt-4" variant="outline">
                      มีบัญชีแล้ว
                    </Button>
                  </Link>
                </div>
                <div className="col-span-2">
                  <Button className="w-full mt-4" type="submit">
                    ถัดไป
                  </Button>
                </div>
              </div>
            </form>
          )}
          {section === 2 && (
            <>
              <div className="text-center justify-center w-full">
                <OtpConponent dataOTP={dataOTP} setDataOTP={setDataOTP} />
                {dataOTP.error && <small className="text-danger">{dataOTP.message}</small>}
              </div>
              <div className="flex justify-center">
                <Button className="w-1/3 mt-4 mx-1" onClick={() => setSection(1)}>
                  ย้อนกลับ
                </Button>
                <Button className="w-1/3 mt-4 mx-1" onClick={() => handleVerify(dataOTP.data)}>
                  ยืนยันรหัส
                </Button>
              </div>
            </>
          )}
          {section === 3 && (
            <div className="w-full">
              <form onSubmit={handleSubmit(handleChangePassword)}>
                <div className="mt-4">
                  <Label>หมายเลขโทรศัพท์</Label>
                  <Input className={classNames(errors?.captcha ? "border-danger focus:border-danger" : "")} defaultValue={data.phone} disabled />
                </div>
                <div className="mt-2">
                  <Label>บัญชีผู้ใช้งาน</Label>
                  <Input disabled autoComplete="off" className={classNames(errors?.username ? "border-danger focus:border-danger" : "")} defaultValue={data.username} {...register("username", {})} maxLength={50} />
                  {errors?.username && <small className="text-danger">{errors.username.message}</small>}
                </div>
                <div className="mt-2">
                  <Label>รหัสผ่าน</Label>
                  <Input
                    autoComplete="off"
                    type="password"
                    className={classNames(errors?.password ? "border-danger focus:border-danger" : "")}
                    {...register("password", {
                      required: {
                        value: true,
                        message: "ข้อมูลไม่ถูกต้อง",
                      },
                      minLength: {
                        value: 4,
                        message: "ข้อมูลไม่ถูกต้อง",
                      },
                      maxLength: {
                        value: 50,
                        message: "ข้อมูลไม่ถูกต้อง",
                      },
                    })}
                    maxLength={50}
                  />
                  {errors?.password && <small className="text-danger">{errors.password.message}</small>}
                </div>
                <div className="mt-2">
                  <Label>ยืนยันรหัสผ่าน</Label>
                  <Input
                    autoComplete="off"
                    type="password"
                    className={classNames(errors?.confirmPassword ? "border-danger focus:border-danger" : "")}
                    {...register("confirmPassword", {
                      required: {
                        value: true,
                        message: "ข้อมูลไม่ถูกต้อง",
                      },
                      minLength: {
                        value: 4,
                        message: "ข้อมูลไม่ถูกต้อง",
                      },
                      maxLength: {
                        value: 50,
                        message: "ข้อมูลไม่ถูกต้อง",
                      },
                      validate: {
                        checkSame: (e) => e === watch("password") || "รหัสผ่านไม่ตรงกัน",
                      },
                    })}
                    maxLength={50}
                  />
                  {errors?.confirmPassword && <small className="text-danger">{errors.confirmPassword.message}</small>}
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-4">
                    <Button className="w-full mt-4" type="submit">
                      สมัครสมาชิก
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </MemberLayout>
  );
};

export default ForgotPasswordPage;
