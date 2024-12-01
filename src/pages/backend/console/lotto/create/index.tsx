import React from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Button } from "@/components/admin/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import Link from "next/link";
import cryptoRandomString from "crypto-random-string";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import toast, { Toaster } from "react-hot-toast";
import { alertSuccess, alertError } from "@/utils/alert";
import router from "next/router";
import { api } from "@/utils/api";
import { useAdmin } from "@/context/AdminContext";

type FormValues = {
  lotto_type_name: string;
};

const CreateLottoType = () => {
  const { admin } = useAdmin();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        lotto_type_name: data.lotto_type_name,
      };
      const response = await api.post("/api/user/lotto-type/create", payload);

      if (response.data.status === false) {
        alertError(response.data.message);
      } else {
        alertSuccess("Create member success");
        router.push("/backend/console/lotto");
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  return (
    <AdminLayout
      title="Create Lotto Type"
      breadcrumb={[
        { title: "Lotto", path: "/backend/console/lotto" },
        { title: "Create", path: "/backend/console/lotto/create" },
      ]}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4 justify-center">
          <div className="col-span-6">
            <Label>ชื่อ</Label>
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
          <Link href="/backend/console/lotto">
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
