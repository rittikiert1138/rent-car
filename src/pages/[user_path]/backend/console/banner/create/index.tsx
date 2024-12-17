import React, { useState } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import withProtectedAdmin from "@/hoc/withProtectedAdmin";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/admin/ui/input";
import { Button } from "@/components/admin/ui/button";
import { alertSuccess, alertError } from "@/utils/alert";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/navigation";

type Inputs = {
  banner_image?: FileList;
};
const CreateBannerPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [imageUrl, setImageUrl] = useState<string | null | any>(null);

  const onSubmit: SubmitHandler<Inputs> = async (params) => {
    try {
      const formData = new FormData();
      formData.append("banner_image", params?.banner_image?.[0] ?? "");
      const res = await fetch("/api/backend/banner/create", {
        method: "POST",
        body: formData,
      });
      if (res.status === 200) {
        alertSuccess("สร้างรายการสำเร็จ");
        router.push("/backend/console/banner");
      } else {
        alertError("สร้างรายการไม่สำเร็จ");
      }
    } catch (error: any) {
      console.log("Error onSubmit ==>", error.message);
    }
  };

  return (
    <AdminLayout
      title="Banner"
      breadcrumb={[
        { title: "Banner", path: "/backend/console/banner" },
        { title: "Create", path: "/backend/console/banner/create" },
      ]}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 items-center">
          <div className="w-1/2">
            <div className="mb-4">{imageUrl && <img src={imageUrl} alt="Selected Image" className="w-1/2 block mx-auto" />}</div>
            <Input
              className={classNames("pt-3", errors?.banner_image ? "border-adanger focus:border-adanger" : "border-aprimary focus:border-aprimary")}
              accept="image/*"
              type="file"
              {...register("banner_image", {
                required: {
                  value: true,
                  message: "กรุณาเพิ่มรูปภาพ",
                },
                onChange: (e) => {
                  setImageUrl(URL.createObjectURL(e.target.files?.[0]));
                },
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
            {errors?.banner_image && <small className="text-adanger">{errors?.banner_image.message}</small>}
          </div>
          <div className="w-1/2 text-right">
            <Link href="/backend/console/banner">
              <Button variant="danger" className="mr-2">
                ยกเลิก <i className="bi bi-x-circle"></i>
              </Button>
            </Link>
            <Button type="submit">
              เพิ่มรูปภาพ
              <i className="bi bi-plus-circle"></i>
            </Button>
          </div>
          {/* <div className="col-span-6">
            <Button type="submit">เพิ่มรูปภาพ</Button>
          </div> */}
        </div>
      </form>
    </AdminLayout>
  );
};

export default withProtectedAdmin(CreateBannerPage);
