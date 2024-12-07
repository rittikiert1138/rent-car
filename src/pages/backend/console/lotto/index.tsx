import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import Link from "next/link";
import { Button } from "@/components/admin/ui/button";
import { api } from "@/utils/api";
import { alertSuccess, alertError } from "@/utils/alert";
import dayjs from "dayjs";
import DataTable from "react-data-table-component";
import { Switch } from "@/components/admin/ui/switch";
import withProtectedAdmin from "@/hoc/withProtectedAdmin";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";

dayjs.extend(buddhistEra);
dayjs.locale("th");

const LottoPage = () => {
  const [lottos, setLottos] = useState([]);

  const getLottos = async () => {
    try {
      const response = await api.get("/api/backend/lotto/list");
      if (response.data.status === true) {
        setLottos(response.data.lottos.map((item: any, index: number) => ({ ...item, index: index + 1 })));
      } else {
        alertError(response.data.message);
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  useEffect(() => {
    getLottos();
  }, []);

  const handleChangeStatus = async (lotto_id: number, status: number, lotto_type: number) => {
    try {
      const payload = {
        lotto_id: lotto_id,
        status: status === 1 ? 0 : 1,
        lotto_type: lotto_type,
      };
      const response = await api.post("/api/backend/lotto/change-status", payload);
      if (response.data.status === true) {
        getLottos();
      } else {
        alertError(response.data.message);
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  const handleDelete = async (lotto_id: number) => {
    try {
      const payload = {
        lotto_id: lotto_id,
      };
      const response = await api.post("/api/backend/lotto/delete", payload);
      if (response.data.status === true) {
        alertSuccess(response.data.message);
        getLottos();
      } else {
        alertError(response.data.message);
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  const columns = [
    {
      name: "ลำดับ",
      width: "90px",
      sortable: true,
      selector: (row: any) => row.index,
    },
    {
      name: "ชื่อหวย",
      sortable: true,
      selector: (row: any) => row.lotto_type.lotto_type_name,
    },

    {
      name: "งวดประวันที่",
      sortable: true,
      selector: (row: any) => dayjs(row.period).format("DD MMMM BBBB"),
    },

    {
      name: "เวลาเปิดรับแทง",
      sortable: true,
      selector: (row: any) => dayjs(row.open_time).format("DD MMMM BBBB HH:mm:ss"),
    },
    {
      name: "เวลาปิดรับแทง",
      sortable: true,
      selector: (row: any) => dayjs(row.close_time).format("DD MMMM BBBB HH:mm:ss"),
    },
    {
      name: "สถานะ",
      sortable: true,
      center: true,
      cell: (row: any) => (
        <>
          <Switch checked={row.status === 1 ? true : false} onCheckedChange={(e) => handleChangeStatus(row.lotto_id, row.status, row.lotto_type)} />
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
          <Link href={`/backend/console/lotto/list/${row.lotto_id}`}>
            <Button className="border h-10" variant="success">
              <i className="bi bi-search"></i>
            </Button>
          </Link>
          <Link href={`/backend/console/lotto/edit/${row.lotto_id}`}>
            <Button className="border h-10" variant="warning">
              <i className="bi bi-pencil"></i>
            </Button>
          </Link>
          <Button className="border h-10" variant="danger" onClick={() => handleDelete(row.lotto_id)}>
            <i className="bi bi-trash3"></i>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout title="หวย" breadcrumb={[{ title: "หวย", path: "/backend/console/lotto" }]}>
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-6">{/* <h3 className="text-2xl font-bold">หวยไทย</h3> */}</div>
        <div className="col-span-6 text-right">
          <Link href="/backend/console/lotto/create">
            <Button>
              สร้าง <i className="bi bi-plus-lg"></i>
            </Button>
          </Link>
        </div>
      </div>
      <DataTable fixedHeader persistTableHead={true} className="border" columns={columns} data={lottos} pagination />
    </AdminLayout>
  );
};

export default withProtectedAdmin(LottoPage);
