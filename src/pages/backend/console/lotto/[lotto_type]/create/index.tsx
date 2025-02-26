import React from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import { Label } from "@/components/admin/ui/label";
import { Button } from "@/components/admin/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Toaster } from "react-hot-toast";
import { alertSuccess, alertError } from "@/utils/alert";
import { api } from "@/utils/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import withProtectedAdmin from "@/hoc/withProtectedAdmin";
import { LOTTO_TYPE } from "@/constants/lotto_type";
import { useRouter } from "next/router";
import { Input } from "@/components/admin/ui/input";

type FormValues = {
  lotto_type_id: number;
  period: Date;
  open_time: Date;
  close_time: Date;
};

const CreateLottoType = () => {
  const router = useRouter();
  const { lotto_type } = router.query;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      lotto_type_id: 0,
      period: new Date(),
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        lotto_type_id: lotto_type,
        period: dayjs(data.period).format("YYYY-MM-DD"),
        open_time: dayjs(data.open_time).format("YYYY-MM-DD HH:mm"),
        close_time: dayjs(data.close_time).format("YYYY-MM-DD HH:mm"),
      };
      const response = await api.post("/api/backend/lotto/create", payload);

      if (response.data.status === false) {
        alertError(response.data.message);
      } else {
        alertSuccess(response.data.message);
        router.push(`/backend/console/lotto/${lotto_type}`);
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  return (
    <AdminLayout
      title="สร้างหวย"
      breadcrumb={[
        { title: "หวย", path: "/backend/console/lotto" },
        { title: "สร้าง", path: "/backend/console/lotto/create" },
      ]}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4 justify-center">
          <div className="md:col-span-6 col-span-12">
            <Label>ประเภทหวย</Label>
            <Input className={classNames(errors?.lotto_type_id ? "border-danger focus:border-danger" : "")} disabled defaultValue={LOTTO_TYPE.find((e: any) => e.lotto_type_id === Number(lotto_type))?.lotto_type_name} />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Label>งวดประวันที่</Label>
            <div className="w-full">
              <DatePicker selected={watch("period")} onChange={(date: any) => setValue("period", new Date(date))} className="w-full h-12 border rounded-lg px-2 focus:outline-none focus:border-aprimary" />
            </div>
            {errors?.period && <small className="text-danger">{errors.period.message}</small>}
          </div>
          <div className="md:col-span-6 col-span-12">
            <Label>วันที่เปิดแทง</Label>
            <div className="w-full">
              <DatePicker selected={watch("open_time")} onChange={(date: any) => setValue("open_time", new Date(date))} timeInputLabel="Time:" dateFormat="MM/dd/yyyy h:mm aa" showTimeInput className="w-full h-12 border rounded-lg px-2 focus:outline-none focus:border-aprimary" />
            </div>
            {errors?.open_time && <small className="text-danger">{errors.open_time.message}</small>}
          </div>
          <div className="md:col-span-6 col-span-12">
            <Label>วันที่ปิดแทง</Label>
            <div className="w-full">
              <DatePicker selected={watch("close_time")} onChange={(date: any) => setValue("close_time", new Date(date))} timeInputLabel="Time:" dateFormat="MM/dd/yyyy h:mm aa" showTimeInput className="w-full h-12 border rounded-lg px-2 focus:outline-none focus:border-aprimary" />
            </div>
            {errors?.close_time && <small className="text-danger">{errors.close_time.message}</small>}
          </div>
        </div>
        <div className="text-right mt-4  pt-4">
          <Link href={`/backend/console/lotto/${lotto_type}`}>
            <Button variant="danger" className="mr-2">
              ยกเลิก <i className="bi bi-x-circle"></i>
            </Button>
          </Link>
          <Button type="submit">
            สร้าง <i className="bi bi-plus-circle"></i>
          </Button>
        </div>
      </form>
      <Toaster />
    </AdminLayout>
  );
};

export default withProtectedAdmin(CreateLottoType);
