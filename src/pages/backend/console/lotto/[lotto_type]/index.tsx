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
import { useRouter } from "next/router";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { useAdmin } from "@/context/AdminContext";
import { LOTTO_TYPE } from "@/constants/lotto_type";

dayjs.extend(buddhistEra);
dayjs.locale("th");

const LottoPage = () => {
  const router = useRouter();
  const { lotto_type } = router.query;
  const { admin } = useAdmin();
  const [lottos, setLottos] = useState([]);

  const [loading, setLoading] = useState(true);

  const getLottos = async (_lotto_type: number) => {
    try {
      const payload = {
        lotto_type_id: _lotto_type,
      };
      const response = await api.post("/api/backend/lotto/list", payload);
      if (response.data.status === true) {
        setLottos(response.data.lottos.map((item: any, index: number) => ({ ...item, index: index + 1 })));
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
    if (lotto_type) getLottos(Number(lotto_type));
  }, [lotto_type]);

  const handleChangeStatus = async (lotto_id: number, status: number, lotto_type: number) => {
    try {
      const payload = {
        lotto_id: lotto_id,
        status: status === 1 ? 0 : 1,
        lotto_type: lotto_type,
      };
      const response = await api.post("/api/backend/lotto/change-status", payload);
      if (response.data.status === true) {
        getLottos(Number(lotto_type));
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
        getLottos(Number(lotto_type));
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
      selector: (row: any) => LOTTO_TYPE.find((e) => e.lotto_type_id === row.lotto_type_id)?.lotto_type_name,
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
          <Switch disabled={admin.role === "AGENT"} checked={row.status === 1 ? true : false} onCheckedChange={() => handleChangeStatus(row.lotto_id, row.status, row.lotto_type)} />
        </>
      ),
    },
    {
      name: "Action",
      sortable: false,
      center: true,
      width: "20%",
      cell: (row: any) => (
        <>
          {admin.role === "AGENT" && (
            <div>
              <Link href={`/backend/console/lotto/limit/${row.lotto_id}`}>
                <Button className="border h-10">
                  <i className="bi bi-exclamation-circle"></i>
                </Button>
              </Link>
            </div>
          )}
          {["MASTER", "ADMIN"].includes(admin.role) && (
            <div className="w-full text-center">
              <Link href={`/backend/console/lotto/list/${row.lotto_id}`}>
                <Button className="border h-10" variant="success">
                  <i className="bi bi-search"></i>
                </Button>
              </Link>
              {row.lotto_result.length > 0 ? (
                <Button className="border h-10" variant="warning" disabled>
                  <i className="bi bi-pencil"></i>
                </Button>
              ) : (
                <Link href={`/backend/console/lotto/${lotto_type}/edit/${row.lotto_id}`}>
                  <Button className="border h-10" variant="warning">
                    <i className="bi bi-pencil"></i>
                  </Button>
                </Link>
              )}
              <Button className="border h-10" variant="danger" onClick={() => handleDelete(row.lotto_id)} disabled={row.lotto_result.length > 0}>
                <i className="bi bi-trash3"></i>
              </Button>
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <AdminLayout title="หวย" breadcrumb={[{ title: "หวย", path: "/backend/console/lotto" }]}>
      {loading ? (
        <>Loading. . .</>
      ) : (
        <>
          <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-6"></div>
            <div className="col-span-6 text-right">
              <Link href={`/backend/console/lotto/${lotto_type}/create`}>
                <Button>
                  สร้าง <i className="bi bi-plus-lg"></i>
                </Button>
              </Link>
            </div>
          </div>
          <DataTable fixedHeader persistTableHead={true} className="border" columns={columns} data={lottos} pagination />
        </>
      )}
    </AdminLayout>
  );
};

export default withProtectedAdmin(LottoPage);
