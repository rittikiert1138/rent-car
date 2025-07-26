import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import toast, { Toaster } from "react-hot-toast";
import MemberLayout from "@/components/member/includes/MemberLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMember } from "@/context/MemberContext";

type FormValues = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const { login } = useMember();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleLogin = async (params: FormValues) => {
    try {
      console.log("params", params);
      login(params);
    } catch (error: any) {
      toast.error("Error !");
      console.log("error", error.message);
    }
  };

  return (
    <MemberLayout display={false}>
      <Toaster />
      <div className="px-2">
        <div className="md:w-[600px] w-full mx-auto bg-white p-8 rounded-sm">
          <img src="/images/Head-logo.png" className="w-1/2 block mx-auto" />
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="mt-4">
              <Label>ชื่อผู้ใช้งาน </Label>
              <Input
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
            </div>
            <div className="mt-4">
              <Label>รหัสผ่าน</Label>
              <Input
                type="password"
                className={classNames(
                  errors?.password ? "border-danger focus:border-danger" : ""
                )}
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
            </div>
            <Button className="w-full mt-4" type="submit">
              เข้าสู่ระบบ
            </Button>
          </form>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <Link href="/forgot-password">
                <Button className="w-full mt-4" variant="outline">
                  ลืมรหัสผ่าน
                </Button>
              </Link>
            </div>
            <div className="col-span-2">
              <Link href="/register">
                <Button className="w-full mt-4 bg-secondary" type="submit">
                  สมัครสมาชิก
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default LoginPage;
