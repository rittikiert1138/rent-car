import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { useAdmin } from "@/context/AdminContext";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import { Button } from "@/components/admin/ui/button";
import { api } from "@/utils/api";
import { alertError } from "@/utils/alert";
import { alertSuccess } from "@/utils/alert";
import router from "next/router";

type FormValues = {
  username: string;
  password: string;
};

const AdminpageLogin = () => {
  const { admin, login } = useAdmin();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();

  console.log("adminContext", admin);

  // const randomString = cryptoRandomString({ length: 10 });

  const handleLogin = async (params: FormValues) => {
    try {
      login(params);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-[#dcdcdc]">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="w-[400px] bg-white absolute -translate-y-1/2 -translate-x-1/2  top-1/2 left-1/2 px-8 py-10 rounded-lg">
          <div className="mb-4">
            <img src="/images/Head-logo.png" className="w-full" />
          </div>
          <div className="mb-4">
            <h2 className="text-xl">Login</h2>
          </div>
          <div className="mb-4">
            <Label>Username</Label>
            <Input placeholder="Username..." {...register("username")} />
          </div>
          <div className="mb-4">
            <Label>Password</Label>
            <Input placeholder="Password..." {...register("password")} />
          </div>
          <div className="mb-4">
            <Button className="w-full" type="submit">
              <span>Login</span>
              <i className="bi bi-box-arrow-in-right text-xl"></i>
            </Button>
          </div>
          <div className="text-right">
            <Link href="/backend/console/forgot-password">
              <span className="underline text-sm hover text-aprimary cursor-pointer">ลืมรหัสผ่าน</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminpageLogin;
