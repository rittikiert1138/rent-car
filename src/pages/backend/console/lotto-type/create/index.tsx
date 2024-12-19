import React from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Button } from "@/components/admin/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { alertSuccess, alertError } from "@/utils/alert";
import router from "next/router";

type FormValues = {
  lotto_type_name: string;
};

const CreateLottoType = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post("/api/backend/lotto-type/create", data);

      if (response.data.status === false) {
        alertError(response.data.message);
      } else {
        alertSuccess(response.data.message);
        router.push("/backend/console/lotto-type");
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  return (
    <AdminLayout
      title="สร้างประเภทหวย"
      breadcrumb={[
        { title: "ประเภทหวย", path: "/backend/console/lotto-type" },
        { title: "สร้าง", path: "/backend/console/lotto-type/create" },
      ]}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4 justify-center">
          <div className="md:col-span-6 col-span-12">
            <Label>ประเภทหวย</Label>
            <Input
              className={classNames(errors?.lotto_type_name ? "border-danger focus:border-danger" : "")}
              {...register("lotto_type_name", {
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
              })}
              maxLength={50}
            />
            {errors?.lotto_type_name && <small className="text-danger">{errors.lotto_type_name.message}</small>}
          </div>
        </div>
        <div className="text-right mt-4  pt-4">
          <Link href="/backend/console/user">
            <Button variant="danger" className="mr-2">
              Cancel <i className="bi bi-x-circle"></i>
            </Button>
          </Link>
          <Button type="submit">
            Create <i className="bi bi-plus-circle"></i>
          </Button>
        </div>
      </form>
      <Toaster />
    </AdminLayout>
  );
};

export default CreateLottoType;
