"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import MemberLayout from "@/components/member/includes/MemberLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Inputs = {
  total: string;
  note?: string;
};

const WitdrawPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [section, setSection] = useState<number>(1);

  const onSubmitTotal: SubmitHandler<Inputs> = (params) => {
    try {
      console.log("params", params);

      setSection(2);
    } catch (error: any) {
      console.log("Error onSubmitTotal ==>", error.message);
    }
  };

  return (
    <MemberLayout>
      <div className="sm:container px-2">
        <div className="w-full bg-white p-2 rounded-sm">
          {section == 1 && (
            <form onSubmit={handleSubmit(onSubmitTotal)}>
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
                จำนวนเงินคงเหลือ : <span className="text-primary f-bold">879.23</span>
              </div>
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
                    min: {
                      value: 300,
                      message: "ยอดถอนขั้นต่ำต้องมากกว่า 300 บาท",
                    },
                  })}
                />
                {errors?.total && <small className="text-destructive">{errors?.total.message}</small>}
              </div>
              <div className="mt-2">
                <Label>หมายเหตุ</Label>
                <textarea {...register("note")} className="w-full border focus:outline-none focus:border-primary p-2 rounded-sm"></textarea>
                {/* <Textarea {...register("note")} /> */}
              </div>
              <div className="mt-2">
                <p className="text-sm text-slate-500">ยอดถอดขั้นต่ำ 300</p>
              </div>
              <div className="grid grid-cols-12 gap-2 mt-2">
                <div className="col-span-6">
                  <Link href="/member/home">
                    <Button className="w-full mt-2" type="button" variant="outline">
                      ยกเลิก
                    </Button>
                  </Link>
                </div>
                <div className="col-span-6">
                  <Button className="w-full mt-2" type="submit">
                    แจ้งถอนเงิน
                  </Button>
                </div>
              </div>
            </form>
          )}
          {section == 2 && (
            <div className="text-center py-6">
              <p>ทำรายการเสร็จเรียบร้อย</p>
              <div className="grid grid-cols-12 gap-2 mt-2">
                <div className="col-span-6">
                  <Link href="/member/home">
                    <Button className="w-full mt-2" type="button" variant="outline">
                      ย้อนกลับ
                    </Button>
                  </Link>
                </div>
                <div className="col-span-6">
                  <Link href="/home">
                    <Button className="w-full mt-2" type="button">
                      ตรวจสอบรายการ
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

export default WitdrawPage;
