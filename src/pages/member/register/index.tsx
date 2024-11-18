import React from "react";
import Link from "next/link";
import MemberLayout from "@/components/includes/MemberLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  return (
    <MemberLayout>
      <div className="w-[600px] mx-auto bg-white p-8 mt-8 rounded-sm">
        <img src="/images/Logo.png" className="w-1/2 block mx-auto" />
        <div className="mt-4">
          <Label>หมายเลขโทรศัพท์</Label>
          <Input />
        </div>
        <div className="mt-4">
          <Label>รหัสผ่าน</Label>
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
    </MemberLayout>
  );
};

export default RegisterPage;
