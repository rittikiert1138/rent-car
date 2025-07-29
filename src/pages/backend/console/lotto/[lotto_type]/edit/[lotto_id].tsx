import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import { Label } from "@/components/admin/ui/label";
import { Button } from "@/components/admin/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Toaster } from "react-hot-toast";
import { alertSuccess, alertError } from "@/utils/alert";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import withProtectedAdmin from "@/hoc/withProtectedAdmin";

type FormValues = {
  lotto_type_id: number;
  period: Date;
  open_time: Date;
  close_time: Date;
  // start_time: Date;
  // close_time: Date;
};

const EditLotto = () => {
  // const { admin } = useAdmin();
  const router = useRouter();
  const { lotto_id } = router.query;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [types, setTypes] = useState([]);
  const [lotto, setLotto] = useState<FormValues | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTypes = async () => {
    try {
      const response = await api.get("/api/backend/lotto-type/list");

      if (response.data.status === false) {
        alertError(response.data.message);
      } else {
        const { lotto_types } = response.data;
        setTypes(lotto_types.map((item: any, index: number) => ({ ...item, index: index + 1 })));
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  const getLotto = async (lotto_id: number) => {
    try {
      const payload = {
        lotto_id: lotto_id,
      };
      const response = await api.post(`/api/backend/lotto/edit`, payload);
      if (response.data.status === true) {
        setLotto(response.data.lotto);
        reset(response.data.lotto);
      } else {
        alertError(response.data.message);
      }
    } catch (error: any) {
      alertError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lotto_id) {
      fetchTypes();
      getLotto(Number(lotto_id));
    }
  }, [lotto_id]);

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        lotto_id: lotto_id,
        lotto_type_id: data.lotto_type_id,
        period: dayjs(data.period).format("YYYY-MM-DD"),
        open_time: dayjs(data.open_time).format("YYYY-MM-DD HH:mm"),
        close_time: dayjs(data.close_time).format("YYYY-MM-DD HH:mm"),
      };
      const response = await api.post("/api/backend/lotto/update", payload);

      if (response.data.status === false) {
        alertError(response.data.message);
      } else {
        alertSuccess(response.data.message);
        router.push("/backend/console/lotto");
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  return (
    <AdminLayout
      title="แก้ไขหวย"
      breadcrumb={[
        { title: "หวย", path: "/backend/console/lotto" },
        { title: "แก้ไข", path: `/backend/console/lotto/edit/${lotto_id}` },
      ]}
    >
      {!loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4 justify-center">
            <div className="col-span-6">
              <Label>ประเภทหวย</Label>
              <select
                className={classNames("w-full h-12 border rounded-lg px-2 focus:outline-none focus:border-aprimary", errors?.lotto_type_id ? "border-danger focus:border-danger" : "")}
                {...register("lotto_type_id", {
                  required: {
                    value: true,
                    message: "ข้อมูลไม่ถูกต้อง",
                  },
                })}
                defaultValue={lotto?.lotto_type_id}
              >
                <option value="">ตัวเลือก</option>
                {types.map((item: any, index) => (
                  <option key={index} value={item.lotto_type_id}>
                    {item.lotto_type_name}
                  </option>
                ))}
              </select>
              {errors?.lotto_type_id && <small className="text-danger">{errors.lotto_type_id.message}</small>}
            </div>
            <div className="col-span-6">
              <Label>งวดประวันที่</Label>
              <div className="w-full">
                <DatePicker selected={watch("period")} onChange={(date: any) => setValue("period", new Date(date))} className="w-full h-12 border rounded-lg px-2 focus:outline-none focus:border-aprimary" />
              </div>
              {errors?.period && <small className="text-danger">{errors.period.message}</small>}
            </div>
            <div className="col-span-6">
              <Label>วันที่เปิดแทง</Label>
              <div className="w-full">
                <DatePicker selected={watch("open_time")} onChange={(date: any) => setValue("open_time", new Date(date))} timeInputLabel="Time:" dateFormat="MM/dd/yyyy h:mm aa" showTimeInput className="w-full h-12 border rounded-lg px-2 focus:outline-none focus:border-aprimary" />
              </div>
              {errors?.open_time && <small className="text-danger">{errors.open_time.message}</small>}
            </div>
            <div className="col-span-6">
              <Label>วันที่ปิดแทง</Label>
              <div className="w-full">
                <DatePicker selected={watch("close_time")} onChange={(date: any) => setValue("close_time", new Date(date))} timeInputLabel="Time:" dateFormat="MM/dd/yyyy h:mm aa" showTimeInput className="w-full h-12 border rounded-lg px-2 focus:outline-none focus:border-aprimary" />
              </div>
              {errors?.close_time && <small className="text-danger">{errors.close_time.message}</small>}
            </div>
          </div>
          <div className="text-right mt-4  pt-4">
            <Link href="/backend/console/lotto">
              <Button variant="danger" className="mr-2">
                ยกเลิก <i className="bi bi-x-circle"></i>
              </Button>
            </Link>
            <Button type="submit">
              แก้ไข <i className="bi bi-plus-circle"></i>
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

export default withProtectedAdmin(EditLotto);
