"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
// import axios from "axios";
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
  username: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const [numberCaptcha, setNumberCaptcha] = useState("");
  const [section, setSection] = useState<number>(1);
  const [data, setData] = useState({ phoneNumber: "0838427290", captcha: "3623", otp: "123444" });

  useEffect(() => {
    const rendomNumber = Math.floor(1000 + Math.random() * 9000);
    setNumberCaptcha(rendomNumber.toString());
  }, []);

  const onSubmit = async (params: any) => {
    if (params.captcha !== numberCaptcha) {
      setError("captcha", { type: "custom", message: "รหัสความปลอดภัยไม่ถูกต้อง" });
    } else {
      console.log("else");
      setData(params);
      setSection(2);
    }
  };

  const handleVerify = (_otp: string) => {
    setData({ ...data, otp: _otp });
    setSection(3);
  };

  const handleRegister = async (params: any) => {
    if (params.password !== params.confirmPassword) {
      setError("password", { type: "notmatch", message: "รหัสผ่านไม่ตรงกัน" });
      setError("confirmPassword", { type: "notmatch", message: "รหัสผ่านไม่ตรงกัน" });
    } else {
      toast.success("ลงทะเบียนสำเร็จ");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      // try {
      //   const payload = {
      //     phoneNumber: data.phoneNumber,
      //     username: params.username,
      //     password: params.password,
      //   };

      //   const response = await axios.post("/api/member/register", payload);

      //   const { status, message } = response.data;
      //   if (status) {
      //     toast.success(message);
      //     router.push("/login");
      //   } else {
      //     toast.error(message);
      //   }
      // } catch (error: any) {
      //   toast.error(error.message);
      // }
    }
  };

  return (
    <MemberLayout display={false}>
      <Toaster />
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
                {errors?.phoneNumber && <small className="text-danger">{errors.phoneNumber.message}</small>}
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
                  maxLength={4}
                />
                {errors?.captcha && <small className="text-danger">{errors.captcha.message}</small>}
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2">
                  <Link href="/login">
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

          {section === 3 && (
            <div className="w-full">
              <form onSubmit={handleSubmit(handleRegister)}>
                <div className="mt-4">
                  <Label>หมายเลขโทรศัพท์</Label>
                  <Input className={classNames(errors?.phoneNumber ? "border-danger focus:border-danger" : "")} defaultValue={data.phoneNumber} disabled />
                </div>
                <div className="mt-2">
                  <Label>บัญชีผู้ใช้งาน</Label>
                  <Input
                    className={classNames(errors?.username ? "border-danger focus:border-danger" : "")}
                    {...register("username", {
                      required: {
                        value: true,
                        message: "ข้อมูลไม่ถูกต้อง",
                      },
                      minLength: {
                        value: 3,
                        message: "ข้อมูลไม่ถูกต้อง",
                      },
                      maxLength: {
                        value: 50,
                        message: "ข้อมูลไม่ถูกต้อง",
                      },
                      pattern: {
                        value: /^[a-z0-9_-]{3,15}$/,
                        message: "รูปแบบข้อมูลไม่ถูกต้อง",
                      },
                    })}
                    maxLength={50}
                  />
                  {errors?.username && <small className="text-danger">{errors.username.message}</small>}
                </div>
                <div className="mt-2">
                  <Label>รหัสผ่าน</Label>
                  <Input
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

export default RegisterPage;
