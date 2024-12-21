import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import dayjs from "dayjs";
import Link from "next/link";
import { Button } from "@/components/admin/ui/button";
import DataTable from "react-data-table-component";
import { Input } from "@/components/admin/ui/input";
import { api } from "@/utils/api";
import { alertError, alertSuccess } from "@/utils/alert";
import Swal from "sweetalert2";

const MemberPage = () => {
  const [members, setMembers] = useState([]);

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
      selector: (row: any) => row.username,
    },
    {
      name: "เบอร์โทรศัพท์",
      sortable: true,
      selector: (row: any) => row.phone,
    },
    {
      name: "จำนวนเงิน",
      sortable: true,
      selector: (row: any) => row.balance,
    },
    {
      name: "เอเจ้น",
      sortable: true,
      selector: (row: any) => row?.user?.username ?? "",
    },
    {
      name: "สถานะ",
      sortable: true,
      cell: (row: any) => (
        <>
          {row.status === 1 && <span className="bg-asuccess/20 px-4 text-asuccess rounded font-bold">ปกติ</span>}
          {row.status === 2 && <span className="bg-warning/20 px-4 text-warning rounded font-bold">กำลังตรวจสอบ</span>}
          {row.status === 3 && <span className="bg-adanger/20 px-4 text-adanger rounded font-bold">ระงับ</span>}
        </>
      ),
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
      name: "Action",
      sortable: false,
      center: true,
      width: "20%",
      cell: (row: any) => (
        <div className="w-full text-center">
          <Link href={`/backend/console/member/edit/${row.member_id}`}>
            <Button className="border h-10">
              <i className="bi bi-pencil"></i>
            </Button>
          </Link>
          <Button className="border h-10" variant="danger" onClick={() => handleDelete(row.member_id)}>
            <i className="bi bi-trash3"></i>
          </Button>
        </div>
      ),
    },
  ];

  const fetchMembers = async () => {
    try {
      const response = await api.get("/api/member/list");
      console.log("response", response.data);
      setMembers(response.data.map((item: any, index: number) => ({ ...item, index: index + 1 })));
    } catch (error: any) {
      alertError(error.message);
    }
  };

  const handleDelete = async (member_id: number) => {
    try {
      Swal.fire({
        text: "Are you sure you want to delete this member?",
        icon: "question",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#5e72e4",
        showCancelButton: true,
        cancelButtonText: "ยกเลิก",
        cancelButtonColor: "#f5365c",
      }).then(async (result: any) => {
        if (result.isConfirmed) {
          const payload = {
            member_id: member_id,
          };
          const response = await api.post(`/api/backend/member/delete`, payload);

          const { status, message } = response.data;

          if (status === false) {
            alertError(message);
          } else {
            alertSuccess(message);
            fetchMembers();
          }
        }
      });
    } catch (error: any) {
      alertError(error.message);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <AdminLayout title="Member" breadcrumb={[{ title: "Member", path: "/backend/console/member" }]}>
      <div className="grid grid-cols-12 mb-4">
        <div className="col-span-8">
          <Input type="text" className="w-1/4" id="filter-text-box" placeholder="Search..." />
        </div>
        <div className="col-span-4 text-right">
          <Link href="/backend/console/member/create">
            <Button>
              Create <i className="bi bi-plus-lg"></i>
            </Button>
          </Link>
        </div>
      </div>
      <DataTable fixedHeader persistTableHead={true} className="border" columns={columns} data={members} pagination />
    </AdminLayout>
  );
};

export default MemberPage;
