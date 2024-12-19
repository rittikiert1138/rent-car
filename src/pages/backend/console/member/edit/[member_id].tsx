import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Button } from "@/components/admin/ui/button";
import Link from "next/link";
import cryptoRandomString from "crypto-random-string";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Toaster } from "react-hot-toast";
import { alertSuccess, alertError } from "@/utils/alert";
import router from "next/router";
import { api } from "@/utils/api";
import { useAdmin } from "@/context/AdminContext";
import { useParams } from "next/navigation";

type FormValues = {
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
  status: number;
  balance: number;
};

const EditMember = () => {
  const { admin } = useAdmin();
  const { member_id } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<any>(null);

  const handleRandomString = () => {
    const randomString = cryptoRandomString({ length: 6 });
    setValue("password", randomString);
    setValue("confirmPassword", randomString);
    clearErrors(["password", "confirmPassword"]);
  };

  const getMember = async () => {
    try {
      const response = await api.get(`/api/backend/member/edit/${member_id}`);
      setMember(response.data);
    } catch (error: any) {
      console.log("Error ==>", error?.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (member_id) {
      getMember();
    }
  }, [member_id]);

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        username: data.username,
        phone: data.phone,
        password: data.password,
        status: data.status,
        balance: data.balance,
        member_id: member_id,
      };

      const response = await api.post("/api/backend/member/update", payload);

      const { status, message } = response.data;

      if (status === false) {
        alertError(response.data.message);
      } else {
        alertSuccess(message);
        router.push("/backend/console/member");
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  return (
    <AdminLayout
      title="Create User"
      breadcrumb={[
        { title: "Member", path: "/backend/console/member" },
        { title: "Create", path: "/backend/console/member" },
      ]}
    >
      {!loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4 justify-center">
            <div className="md:col-span-6 col-span-12">
              <Label>ชื่อผู้ใช้</Label>
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
                defaultValue={member.username}
              />
              {errors?.username && <small className="text-danger">{errors.username.message}</small>}
            </div>
            <div className="md:col-span-6 col-span-12">
              <Label>เบอร์โทรศัพท์</Label>
              <Input
                className={classNames(errors?.phone ? "border-danger focus:border-danger" : "")}
                {...register("phone", {
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
                defaultValue={member.phone}
              />
              {errors?.phone && <small className="text-danger">{errors.phone.message}</small>}
            </div>
            <div className="md:col-span-6 col-span-12">
              <Label>รหัสผ่าน</Label>
              <div className="relative">
                <Input
                  className={classNames(errors?.password ? "border-danger focus:border-danger" : "")}
                  {...register("password", {
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
                <div className="absolute right-2 top-0">
                  <Button type="button" variant="success" className="mt-2" size="sm" onClick={handleRandomString}>
                    Generate
                  </Button>
                </div>
              </div>
              {errors?.password && <small className="text-danger">{errors.password.message}</small>}
            </div>
            <div className="md:col-span-6 col-span-12">
              <Label>ยืนยันรหัสผ่าน</Label>
              <Input
                className={classNames(errors?.confirmPassword ? "border-danger focus:border-danger" : "")}
                {...register("confirmPassword", {
                  minLength: {
                    value: 4,
                    message: "ข้อมูลไม่ถูกต้อง",
                  },
                  maxLength: {
                    value: 50,
                    message: "ข้อมูลไม่ถูกต้อง",
                  },
                  validate: {
                    checkSame: (e) => e === watch("password") || "รหัสผ่านไม่ตรงกัน",
                  },
                })}
                maxLength={50}
              />
              {errors?.confirmPassword && <small className="text-danger">{errors.confirmPassword.message}</small>}
            </div>
            <div className="md:col-span-6 col-span-12">
              <Label>สถานะ</Label>
              <select
                className={classNames("w-full h-12 border rounded-lg px-2 focus:outline-none focus:border-aprimary mt-1", errors?.status ? "border-danger focus:border-danger" : "")}
                {...register("status", {
                  required: {
                    value: true,
                    message: "ข้อมูลไม่ถูกต้อง",
                  },
                })}
              >
                <option value="">Select</option>
                <option value="1" selected={member?.status === 1}>
                  ปกติ
                </option>
                <option value="2" selected={member?.status === 2}>
                  กำลังตรวจสอบ
                </option>
                <option value="3" selected={member?.status === 3}>
                  ระงับ
                </option>
              </select>
              {errors?.confirmPassword && <small className="text-danger">{errors.confirmPassword.message}</small>}
            </div>
            <div className="md:col-span-6 col-span-12">
              <Label>ยอดเงิน</Label>
              <Input
                className={classNames(errors?.phone ? "border-danger focus:border-danger" : "")}
                {...register("balance", {
                  required: {
                    value: true,
                    message: "ข้อมูลไม่ถูกต้อง",
                  },
                  // minLength: {
                  //   value: 10,
                  //   message: "ข้อมูลไม่ถูกต้อง",
                  // },
                  // maxLength: {
                  //   value: 10,
                  //   message: "ข้อมูลไม่ถูกต้อง",
                  // },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Error pattern",
                  },
                })}
                defaultValue={member.balance}
              />
              {errors?.balance && <small className="text-danger">{errors.balance.message}</small>}
            </div>
          </div>
          <div className="text-right mt-4  pt-4">
            <Link href="/backend/console/member">
              <Button variant="danger" className="mr-2">
                ยกเลิก <i className="bi bi-x-circle"></i>
              </Button>
            </Link>
            <Button type="submit">
              บันทึก <i className="bi bi-plus-circle"></i>
            </Button>
          </div>
        </form>
      ) : (
        <>Loading...</>
      )}

      <Toaster />
    </AdminLayout>
  );
};

export default EditMember;
