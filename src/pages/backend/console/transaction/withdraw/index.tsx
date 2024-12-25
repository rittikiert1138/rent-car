"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import DataTable from "react-data-table-component";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import Link from "next/link";
import { alertSuccess } from "@/utils/alert";
import axios from "axios";
import { alertError } from "@/utils/alert";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { api } from "@/utils/api";

const UserPage = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const payload = {
        transaction_type: 2,
      };
      const response = await api.post("/api/member/transaction", payload);

      if (response.data.status === false) {
        alertError(response.data.message);
      } else {
        setTransactions(response.data.map((item: any, index: number) => ({ ...item, index: index + 1 })));
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (user_id: number) => {
    try {
      Swal.fire({
        text: "Are you sure you want to delete this user?",
        icon: "question",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#5e72e4",
        showCancelButton: true,
        cancelButtonText: "ยกเลิก",
        cancelButtonColor: "#f5365c",
      }).then(async (result: any) => {
        if (result.isConfirmed) {
          const response = await axios.delete(`/api/user/delete/${user_id}`);

          if (response.data.status === false) {
            alertError(response.data.message);
          } else {
            alertSuccess(response.data.message);
            fetchTransactions();
          }
        }
      });
    } catch (error: any) {
      alertError(error.message);
    }
  };

  const columns = [
    {
      name: "No.",
      width: "70px",
      sortable: true,
      selector: (row: any) => row.index,
    },
    {
      name: "ชื่อผู้ใช้",
      sortable: true,
      selector: (row: any) => row.member.username,
    },
    {
      name: "จำนวนเงิน",
      sortable: true,
      selector: (row: any) => row.balance,
    },

    {
      name: "ประเภท",
      sortable: true,
      selector: (row: any) => row.transaction_type,
      cell: (row: any) => {
        if (row.transaction_type === 1) {
          return <span className="badge bg-asuccess/40 uppercase px-2 py-1 text-asuccess font-bold rounded">ฝาก</span>;
        } else if (row.transaction_type === 2) {
          return <span className="badge bg-adanger/30 uppercase px-2 py-1 text-adanger font-bold rounded">ถอน</span>;
        }
      },
    },
    {
      name: "สถานะ",
      sortable: true,
      selector: (row: any) => row.balance,
      cell: (row: any) => {
        if (row.transaction_status === 1) {
          return <span className="badge bg-awarning/30 uppercase px-2 py-1 text-awarning font-bold rounded">กำลังรอการอนุมัติ</span>;
        } else if (row.transaction_status === 2) {
          return <span className="badge bg-asuccess/40 uppercase px-2 py-1 text-asuccess font-bold rounded">สำเร็จ</span>;
        } else if (row.transaction_status === 3) {
          return <span className="badge bg-adanger/30 uppercase px-2 py-1 text-adanger font-bold rounded">ถูกปฏิเสธ</span>;
        }
      },
    },
    {
      name: "Created At",
      sortable: true,
      selector: (row: any) => dayjs(row.createdAt).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      name: "",
      sortable: false,
      center: true,
      width: "20%",
      cell: (row: any) => (
        <div className="w-full text-center">
          {/* <Link href={`/backend/console/user/edit/${row.user_id}`}>
            <Button className="border h-10">
              <i className="bi bi-pencil"></i>
            </Button>
          </Link>
          <Button className="border h-10" variant="danger" onClick={() => handleDelete(row.user_id)}>
            <i className="bi bi-trash3"></i>
          </Button> */}
          <Link href={`/backend/console/transaction/withdraw/view/${row.transaction_id}`}>
            <Button className="border h-10" variant="success">
              <i className="bi bi-search"></i>
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout title="Transaction" breadcrumb={[{ title: "Transaction", path: "/backend/console/transaction" }]}>
      <div className="grid grid-cols-12 mb-4">
        <div className="col-span-8">{/* <Input type="text" className="w-1/4" id="filter-text-box" placeholder="Search..." /> */}</div>
      </div>
      <DataTable fixedHeader persistTableHead={true} className="border" columns={columns} data={transactions} pagination />
    </AdminLayout>
  );
};

export default UserPage;
