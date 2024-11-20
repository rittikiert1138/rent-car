import React from "react";
import Link from "next/link";
import MemberLayout from "@/components/member/includes/MemberLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <MemberLayout>
      <div className="w-[600px] mx-auto bg-white p-8 mt-8 rounded-sm">
        <img src="/images/Logo.png" className="w-1/2 block mx-auto" />
        <div className="mt-4">
          <Label>ชื่อผู้ใช้งาน</Label>
          <Input />
        </div>
        <div className="mt-4">
          <Label>รหัสผ่าน</Label>
          <Input />
        </div>
        <Link href="/member/home">
          <Button className="w-full mt-4">เข้าสู่ระบบ</Button>
        </Link>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2">
            <Button className="w-full mt-4" variant="outline">
              ลืมรหัสผ่าน
            </Button>
          </div>
          <div className="col-span-2">
            <Link href="/register">
              {" "}
              <Button className="w-full mt-4 bg-secondary">สมัครสมาชิก</Button>
            </Link>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default LoginPage;
