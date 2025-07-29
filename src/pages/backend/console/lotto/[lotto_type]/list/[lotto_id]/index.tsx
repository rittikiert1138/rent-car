import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import Link from "next/link";
import { Button } from "@/components/admin/ui/button";
import { api } from "@/utils/api";
import { alertSuccess, alertError } from "@/utils/alert";
import dayjs from "dayjs";
import DataTable from "react-data-table-component";
import withProtectedAdmin from "@/hoc/withProtectedAdmin";
import { useParams } from "next/navigation";
import { LIST_BET_TYPE } from "@/constants/constants";

const LottoPage = () => {
  const [lottoList, setLottoList] = useState([]);
  const { lotto_id } = useParams();

  const getLottoList = async () => {
    try {
      const response = await api.post("/api/backend/lotto/bet-list", { lotto_id: lotto_id });

      console.log("response.data", response.data);
      if (response.data.status === true) {
        setLottoList(response.data.lottoList.map((item: any, index: number) => ({ ...item, index: index + 1 })));
      } else {
        alertError(response.data.message);
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  useEffect(() => {
    if (lotto_id) {
      getLottoList();
    }
  }, [lotto_id]);

  // const handleChangeStatus = async (lotto_id: number, status: number, lotto_type: number) => {
  //   try {
  //     const payload = {
  //       lotto_id: lotto_id,
  //       status: status === 1 ? 0 : 1,
  //       lotto_type: lotto_type,
  //     };
  //     const response = await api.post("/api/backend/lotto/change-status", payload);
  //     if (response.data.status === true) {
  //       getLottoList();
  //     } else {
  //       alertError(response.data.message);
  //     }
  //   } catch (error: any) {
  //     alertError(error.message);
  //   }
  // };

  const handleDelete = async (lotto_id: number) => {
    try {
      const payload = {
        lotto_id: lotto_id,
      };
      const response = await api.post("/api/backend/lotto/delete", payload);
      if (response.data.status === true) {
        alertSuccess(response.data.message);
        getLottoList();
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
      name: "ชื่อผู้ใช้",
      sortable: true,
      selector: (row: any) => row.member_lotto.member.username,
    },
    {
      name: "ประเภท",
      sortable: true,
      selector: (row: any) => LIST_BET_TYPE.find((e) => e.betTypeId === row.bet_type)?.label,
    },
    {
      name: "ตัวเลขที่แทง",
      sortable: true,
      selector: (row: any) => row.bet_number,
    },

    {
      name: "จำนวนเงิน",
      sortable: true,
      selector: (row: any) => row.bet_amount,
    },
    {
      name: "วันที่แทง",
      sortable: true,
      center: true,
      selector: (row: any) => dayjs(row.createdAt).format("DD/MM/YYYY HH:mm"),
    },
    {
      name: "สถานะ",
      center: true,
      sortable: true,
      cell: (row: any) => (
        <div className="w-full text-center">
          {row.bet_status === 1 && <span className="text-white bg-warning rounded-sm px-2">รอออกผล</span>}
          {row.bet_status === 2 && <span className="text-white bg-asuccess rounded-sm px-2">ถูกรางวัล</span>}
          {row.bet_status === 3 && <span className="text-white bg-adanger rounded-sm px-2">ไม่ถูกรางวัล</span>}
        </div>
      ),
    },
    {
      name: "",
      sortable: false,
      center: true,
      width: "20%",
      cell: (row: any) => (
        <div className="w-full text-center">
          <Button className="border h-10" variant="danger" onClick={() => handleDelete(row.member_lotto_list_id)}>
            <i className="bi bi-trash3"></i>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout
      title="หวย"
      breadcrumb={[
        { title: "หวย", path: "/backend/console/lotto" },
        { title: "รายการ", path: "/backend/console/lotto" },
      ]}
    >
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-6">{/* <h3 className="text-2xl font-bold">หวยไทย</h3> */}</div>
        <div className="col-span-6 text-right">
          <Link href={`/backend/console/lotto/list/${lotto_id}/summary`}>
            <Button>
              ออกผล <i className="bi bi-plus-lg"></i>
            </Button>
          </Link>
        </div>
      </div>
      <DataTable fixedHeader persistTableHead={true} className="border" columns={columns} data={lottoList} pagination />
    </AdminLayout>
  );
};

export default withProtectedAdmin(LottoPage);
