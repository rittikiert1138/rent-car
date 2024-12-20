import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Button } from "@/components/admin/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Toaster } from "react-hot-toast";
import { alertSuccess, alertError } from "@/utils/alert";
import router from "next/router";
import { useParams } from "next/navigation";
import { api } from "@/utils/api";

type FormValues = {
  lotto_type_name: string;
  icon_image: File;
};

const EditLottoType = () => {
  const { lotto_type_id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [lottoType, setLottoType] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("lottoType", lottoType);

  const getLottoType = async () => {
    try {
      const response = await api.get(`/api/backend/lotto-type/edit/${lotto_type_id}`);
      console.log("ress", response.data);
      const { status, message, lotto_type } = response.data;
      if (status) {
        setLottoType(lotto_type);
      } else {
        alertError(message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lotto_type_id) {
      getLottoType();
    }
  }, [lotto_type_id]);

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("lotto_type_name", data?.lotto_type_name ?? "");
      formData.append("icon_image", data?.icon_image?.[0] ?? "");
      const response = await fetch("/api/backend/lotto-type/create", {
        method: "POST",
        body: formData,
      });
      const res = await response.json();

      console.log("res", res);

      if (res.status === false) {
        alertError(res.message);
      } else {
        alertSuccess(res.message);
        router.push("/backend/console/type-lotto");
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  return (
    <AdminLayout
      title="สร้างประเภทหวย"
      breadcrumb={[
        { title: "ประเภทหวย", path: "/backend/console/type-lotto" },
        { title: "สร้าง", path: "/backend/console/type-lotto/create" },
      ]}
    >
      {!loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4 justify-center">
            <div className="md:col-span-8 col-span-12">
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
                defaultValue={lottoType?.lotto_type_name ?? ""}
              />
              {errors?.lotto_type_name && <small className="text-danger">{errors.lotto_type_name.message}</small>}
            </div>
            <div className="col-span-8">
              <div>
                <img src={`/uploads/lotto-type/${lottoType.lotto_type_icon}`} />
              </div>
              <Label>ไอคอน</Label>
              <Input
                className={classNames("pt-3", errors?.icon_image ? "border-adanger focus:border-adanger" : "border-aprimary focus:border-aprimary")}
                accept="image/*"
                type="file"
                {...register("icon_image", {
                  required: {
                    value: true,
                    message: "กรุณาเพิ่มรูปภาพ",
                  },
                  // onChange: (e) => {
                  //   setImageUrl(URL.createObjectURL(e.target.files?.[0]));
                  // },
                  validate: (value: File | undefined | any) => {
                    const accept = ["image/png", "image/jpeg", "image/jpg"];
                    const fileType = value?.[0]?.type;
                    const fileSize = value?.[0]?.size;
                    const checkFileSize = Math.round((fileSize / 1024) * 100) / 100;

                    if (!accept.includes(fileType)) {
                      return "กรุณาเพิ่มรูปภาพในรูปแบบ png, jpeg, jpg";
                    }

                    if (checkFileSize > 5120) {
                      return "ขนาดไฟล์สลิปการโอนเงินต้องน้อยกว่า 5 MB";
                    }
                    return true;
                  },
                })}
              />
            </div>
          </div>
          <div className="text-right mt-4  pt-4">
            <Link href="/backend/console/type-lotto">
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

export default EditLottoType;
