"use client";
import React, { useState } from "react";
import Link from "next/link";
import Countdown, { zeroPad } from "react-countdown";
import { useForm, SubmitHandler } from "react-hook-form";
import withProtectedUser from "@/hoc/withProtectedMember";
import MemberLayout from "@/components/member/includes/MemberLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMember } from "@/context/MemberContext";
import { api } from "@/utils/api";
import toast, { Toaster } from "react-hot-toast";

type Inputs = {
  total?: string;
  slip?: FileList;
};

const DepositPage = () => {
  const { member } = useMember();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const [section, setSection] = useState<number>(1);

  const onSubmitTotal: SubmitHandler<Inputs> = (params) => {
    try {
      setSection(2);
      setValue("total", params.total);
    } catch (error: any) {
      console.log("Error onSubmitTotal ==>", error.message);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (params) => {
    try {
      const formData = new FormData();
      formData.append("slip", params?.slip?.[0] ?? "");
      formData.append("total", params?.total ?? "");
      formData.append("member_id", member.member_id.toString());
      await fetch("/api/member/deposit", {
        method: "POST",
        body: formData,
      });
    } catch (error: any) {
      console.log("Error onSubmitTotal ==>", error.message);
      toast.error("Error !", error.message);
    } finally {
      reset();
      setSection(3);
    }
  };

  const renderer = (params: any) => {
    const { minutes, seconds, completed } = params;
    if (completed) {
      return;
    } else {
      return (
        <div className="text-center mt-2">
          <p className="text-destructive text-adanger">ท่านมีเวลาโอนเงิน 15 นาที</p>
          <p className="text-[50px] text-destructive">
            {minutes}:{zeroPad(seconds)}
          </p>
        </div>
      );
    }
  };

  return (
    <MemberLayout>
      <Toaster />
      <div className="sm:container px-2 mt-2">
        <div className="w-full bg-white rounded-sm p-2 pb-3">
          {section == 1 && (
            <form onSubmit={handleSubmit(onSubmitTotal)}>
              <div className="mt-2">
                <Label>จำนวนเงิน</Label>
                <Input
                  placeholder="ระบุจำนวนเงิน"
                  {...register("total", {
                    required: {
                      value: true,
                      message: "กรุณาระบุจำนวนเงิน",
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "กรุณาจำนวนเงินให้ถูกต้อง",
                    },
                  })}
                  maxLength={3}
                />
                {errors?.total && <small className="text-destructive">{errors?.total.message}</small>}
                <div className="grid grid-cols-10 gap-2 mt-2">
                  {["100", "200", "300", "400", "500", "600", "700", "800", "900", "1000"].map((v) => (
                    <div className="col-span-2" key={`money__${v}`}>
                      <Button variant="outline" className="w-full h-8" onClick={() => setValue("total", v)} type="button">
                        {v}
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-12 gap-2 mt-2">
                  <div className="col-span-6">
                    <Link href="/member">
                      <Button className="w-full mt-2" type="button" variant="outline">
                        ย้อนกลับ
                      </Button>
                    </Link>
                  </div>
                  <div className="col-span-6">
                    <Button className="w-full mt-2" type="submit">
                      ถัดไป
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
          {section == 2 && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-2">
                <div className="grid grid-cols-12 gap-2 mt-2">
                  <div className="col-span-4">
                    <img src="/images/kbank-logo.png" className="w-[80px]" />
                  </div>
                  <div className="col-span-8">
                    <p>ธนาคาร : กสิกรไทย</p>
                    <p>ชื่อบัญชี : สมหมาย ขายดี</p>
                    <p>เลขที่บัญชี : 1098827889</p>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-slate-200 mt-4"></div>
                <div className="mt-2">
                  <p>
                    จำนวนเงิน : <span className="text-primary">{watch("total")}</span>
                  </p>
                </div>
                <div className="mt-2">
                  <Label>รูปภาพสลิป</Label>
                  <Input
                    accept="image/*"
                    type="file"
                    {...register("slip", {
                      required: {
                        value: true,
                        message: "กรุณาเพิ่มสลิปการโอนเงิน",
                      },
                      validate: (value: File | undefined | any) => {
                        console.log("value", value?.[0].type);
                        const accept = ["image/png", "image/jpeg", "image/jpg"];
                        const fileType = value?.[0]?.type;
                        const fileSize = value?.[0]?.size;
                        const checkFileSize = Math.round((fileSize / 1024) * 100) / 100;

                        if (!accept.includes(fileType)) {
                          return "กรุณาเพิ่มสลิปการโอนเงินในรูปแบบ png, jpeg, jpg";
                        }

                        if (checkFileSize > 1024) {
                          return "ขนาดไฟล์สลิปการโอนเงินต้องน้อยกว่า 1 MB";
                        }
                        return true;
                      },
                    })}
                  />
                  {errors?.slip && <small className="text-adanger">{errors?.slip.message}</small>}
                </div>
                <Countdown
                  date={Date.now() + 899000}
                  renderer={renderer}
                  precision={2}
                  onComplete={() => {
                    reset();
                    setSection(1);
                  }}
                />
                <div className="grid grid-cols-12 gap-2 mt-2">
                  <div className="col-span-6">
                    <Button className="w-full mt-2" type="button" variant="outline" onClick={() => setSection(1)}>
                      ย้อนกลับ
                    </Button>
                  </div>
                  <div className="col-span-6">
                    <Button className="w-full mt-2" type="submit">
                      แจ้งฝากเงิน
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
          {section == 3 && (
            <div className="text-center">
              <p>ทำรายการเสร็จเรียบร้อย</p>
              <div className="grid grid-cols-12 gap-2 mt-2">
                <div className="col-span-6">
                  <Link href="/member">
                    <Button className="w-full mt-2" type="button" variant="outline">
                      ย้อนกลับ
                    </Button>
                  </Link>
                </div>
                <div className="col-span-6">
                  <Link href="/member">
                    <Button className="w-full mt-2" type="button">
                      ตรวจสอบรายการฝาก
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MemberLayout>
  );
};

export default withProtectedUser(DepositPage);
