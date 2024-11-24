import React from "react";
import Link from "next/link";

import { useAdmin } from "@/context/AdminContext";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import { Button } from "@/components/admin/ui/button";

const AdminpageLogin = () => {
  const { admin } = useAdmin();

  console.log("adminContext", admin);

  // const randomString = cryptoRandomString({ length: 10 });

  return (
    <div className="w-full h-[100vh] bg-[#dcdcdc]">
      <div className="w-[400px] bg-white absolute -translate-y-1/2 -translate-x-1/2  top-1/2 left-1/2 px-8 py-10 rounded-lg">
        <div className="mb-4">
          <img src="/images/Head-logo.png" className="w-full" />
        </div>
        <div className="mb-4">
          <h2 className="text-xl">Login</h2>
        </div>
        <div className="mb-4">
          <Label>Username</Label>
          <Input placeholder="Username..." />
        </div>
        <div className="mb-4">
          <Label>Password</Label>
          <Input placeholder="Password..." />
        </div>
        <div className="mb-4">
          <Link href="/backend/console/dashboard">
            <Button className="w-full">
              <span>Login</span>
              <i className="bi bi-box-arrow-in-right text-xl"></i>
            </Button>
          </Link>
        </div>
        <div className="text-right">
          <Link href="/backend/console/forgot-password">
            <span className="underline text-sm hover text-aprimary cursor-pointer">ลืมรหัสผ่าน</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminpageLogin;
