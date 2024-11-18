"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import MemberLayout from "@/components/member/includes/MemberLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  const [numberCaptcha, setNumberCaptcha] = useState("");

  useEffect(() => {
    let rendomNumber = Math.floor(1000 + Math.random() * 9000);
    setNumberCaptcha(rendomNumber.toString());
  }, []);

  return (
    <MemberLayout>
      <div className="px-2">
        <div className="md:w-[600px] w-full mx-auto bg-white p-8 rounded-sm">
          <img src="/images/Logo.png" className="w-1/2 block mx-auto" />
          <div className="mt-4">
            <Label>หมายเลขโทรศัพท์</Label>
            <Input />
          </div>
          <div className=" p-4 mt-4 flex justify-center">
            {numberCaptcha.split("").map((item: any) => (
              <img src={`/number/${item}.png`} className="h-10 mr-4" />
            ))}
          </div>
          <div className="mt-2">
            <Label>รหัสความปลอดภัย</Label>
            <Input />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <Link href="/member/login">
                <Button className="w-full mt-4">มีบัญชีแล้ว</Button>
              </Link>
            </div>
            <div className="col-span-2">
              <Link href="/member/register">
                <Button className="w-full mt-4">ถัดไป</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default RegisterPage;
