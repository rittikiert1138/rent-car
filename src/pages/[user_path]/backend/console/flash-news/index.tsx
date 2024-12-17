import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import dayjs from "dayjs";
import { Button } from "@/components/admin/ui/button";
import Link from "next/link";
import DataTable from "react-data-table-component";
import { useForm } from "react-hook-form";
import { Label } from "@/components/admin/ui/label";
import withProtectedAdmin from "@/hoc/withProtectedAdmin";
import classNames from "classnames";
import { api } from "@/utils/api";
import { alertError, alertSuccess } from "@/utils/alert";
import { Switch } from "@/components/admin/ui/switch";
import Swal from "sweetalert2";

type FormValues = {
  flash_news_content: string;
};

const FlashNews = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const [flashNews, setFlashNews] = useState([]);
  const [modal, setModal] = useState(false);

  const getFlashNews = async () => {
    try {
      const response = await api.get("/api/backend/flash-news/list");

      const { status, message, flash_news } = response.data;

      if (status) {
        setFlashNews(flash_news.map((item: any, index: number) => ({ ...item, index: index + 1 })));
      } else {
        alertError(message);
      }
    } catch (error: any) {
      console.log(error);
      alertError(error.message);
    }
  };

  useEffect(() => {
    getFlashNews();
  }, []);

  const handleChangeStatus = async (flash_news_id: number, flash_news_status: number) => {
    try {
      const payload = {
        flash_news_status: flash_news_status === 1 ? 0 : 1,
        flash_news_id: flash_news_id,
      };

      const response = await api.post("/api/backend/flash-news/change-status", payload);

      const { status, message } = response.data;

      if (status) {
        getFlashNews();
      } else {
        alertError(message);
      }
    } catch (error: any) {
      console.log(error);
      alertError(error.message);
    }
  };

  const handleDelete = async (flash_news_id: number) => {
    Swal.fire({
      text: "ต้องการลบข้อมูลหรือไม่ ?",
      icon: "question",
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#5e72e4",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      cancelButtonColor: "#f5365c",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        const payload = {
          flash_news_id: flash_news_id,
        };

        const response = await api.post(`/api/backend/flash-news/delete`, payload);

        if (response.data.status === false) {
          alertError(response.data.message);
        } else {
          alertSuccess(response.data.message);
          getFlashNews();
        }
      }
    });
  };

  const columns = [
    {
      name: "ลำดับ",
      width: "90px",
      sortable: true,
      selector: (row: any) => row.index,
    },
    {
      name: "รายละเอียด",
      sortable: true,
      //   selector: (row: any) => row.flash_news_content,
      cell: (row: any) => <>{row.flash_news_content.length > 80 ? `${row.flash_news_content.substring(0, 80)}...` : row.flash_news_content}</>,
    },
    {
      name: "สร้างเมื่อ",
      sortable: true,
      selector: (row: any) => dayjs(row.createdAt).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      name: "แก้ไขเมื่อ",
      sortable: true,
      selector: (row: any) => dayjs(row.updatedAt).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      name: "สถานะ",
      sortable: true,
      center: true,
      cell: (row: any) => (
        <>
          <Switch checked={row.flash_news_status === 1 ? true : false} onCheckedChange={() => handleChangeStatus(row.flash_news_id, row.flash_news_status)} />
        </>
      ),
    },
    {
      name: "Action",
      sortable: false,
      center: true,
      width: "20%",
      cell: (row: any) => (
        <div className="w-full text-center">
          <Link href={`/backend/console/lotto/edit/${row.lotto_id}`}>
            <Button className="border h-10" variant="warning">
              <i className="bi bi-pencil"></i>
            </Button>
          </Link>
          <Button className="border h-10" variant="danger" onClick={() => handleDelete(row.flash_news_id)}>
            <i className="bi bi-trash3"></i>
          </Button>
        </div>
      ),
    },
  ];

  const onSubmit = async (params: any) => {
    try {
      setModal(false);
      const response = await api.post("/api/backend/flash-news/create", params);

      const { status } = response.data;

      if (status) {
        getFlashNews();
        alertSuccess(response.data.message);
      } else {
        alertError(response.data.message);
      }
    } catch (error: any) {
      console.log(error);
      alertError(error.message);
    }
  };

  useEffect(() => {
    setValue("flash_news_content", "");
  }, [modal]);

  return (
    <AdminLayout title="Flash News" breadcrumb={[{ title: "Flash News", path: "/backend/console/flash-news" }]}>
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-6"></div>
        <div className="col-span-6 text-right">
          <Button onClick={() => setModal(true)}>
            สร้าง <i className="bi bi-plus-lg"></i>
          </Button>
        </div>
      </div>
      <DataTable fixedHeader persistTableHead={true} className="border" columns={columns} data={flashNews} pagination />
      {modal && (
        <div className="w-full h-[100vh] bg-black/20 fixed top-0 left-0 z-[900]">
          <div className="w-full h-full  relative">
            <div className="absolute -translate-y-1/2 -translate-x-1/2  top-1/2 left-[58%] bg-white w-1/2 rounded-lg p-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full">
                  <Label>รายละเอียด</Label>
                  <textarea
                    {...register("flash_news_content", {
                      required: {
                        value: true,
                        message: "กรุณาระบุรายละเอียด",
                      },
                    })}
                    className={classNames("w-full border focus:outline-none  p-2 rounded-sm", errors?.flash_news_content ? "border-danger focus:border-danger" : "border-primary focus:border-primary")}
                    rows={8}
                  ></textarea>
                  {errors?.flash_news_content && <small className="text-danger">{errors?.flash_news_content.message}</small>}
                </div>
                <div className="w-full text-right mt-2">
                  <Button type="button" onClick={() => setModal(false)} variant="danger" className="mr-2">
                    ยกเลิก <i className="bi bi-x-lg"></i>
                  </Button>
                  <Button type="submit">
                    เพิ่มข้อมูล <i className="bi bi-plus-lg"></i>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default withProtectedAdmin(FlashNews);
