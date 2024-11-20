"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import OtpInput from "react-otp-input";
import { useForm } from "react-hook-form";
import MemberLayout from "@/components/member/includes/MemberLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import classNames from "classnames";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

type FormValues = {
  phoneNumber: string;
  captcha: string;
  captcha_generate: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const [numberCaptcha, setNumberCaptcha] = useState("");
  const [section, setSection] = useState<number>(2);

  useEffect(() => {
    let rendomNumber = Math.floor(1000 + Math.random() * 9000);
    setNumberCaptcha(rendomNumber.toString());
  }, []);

  const onSubmit = async (params: any) => {
    if (params.captcha !== numberCaptcha) {
      setError("captcha", { type: "custom", message: "รหัสความปลอดภัยไม่ถูกต้อง" });
    } else {
      console.log("else");
      setSection(2);
    }
  };

  const handleVerify = (_otp: string) => {
    setSection(3);
  };

  console.log("errors", errors);

  return (
    <MemberLayout>
      <div className="px-2">
        <div className="md:w-[600px] w-full mx-auto bg-white p-8 rounded-sm">
          <img src="/images/Logo.png" className="w-1/2 block mx-auto" />
          {section === 1 && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                <Label>หมายเลขโทรศัพท์</Label>
                <Input
                  className={classNames(errors?.phoneNumber ? "border-danger focus:border-danger" : "")}
                  {...register("phoneNumber", {
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
                {errors?.phoneNumber && <small>{errors.phoneNumber.message}</small>}
              </div>
              <div className=" p-4 mt-4 flex justify-center">
                {numberCaptcha.split("").map((item: any, indexImage) => (
                  <img src={`/number/${item}.png`} className="h-10 mr-4" key={`captcha_${indexImage}`} />
                ))}
              </div>
              <div className="mt-2">
                <Label>รหัสความปลอดภัย</Label>
                <Input
                  className={classNames(errors?.phoneNumber ? "border-danger focus:border-danger" : "")}
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
                />
                {errors?.captcha && <small>{errors.captcha.message}</small>}
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2">
                  <Link href="/member/login">
                    <Button className="w-full mt-4">มีบัญชีแล้ว</Button>
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
            <div className="text-center justify-center w-full">
              <InputOTP maxLength={6} onChange={(e) => e.length >= 6 && handleVerify(e)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={4} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <p className="mt-4">ส่งรหัสอีกครั้ง</p>
            </div>
          )}

          {section === 3 && <div className="text-center justify-center w-full">Fill</div>}
        </div>
      </div>
    </MemberLayout>
  );
};

export default RegisterPage;
