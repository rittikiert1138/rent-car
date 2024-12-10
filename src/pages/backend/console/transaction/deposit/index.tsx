"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import DataTable from "react-data-table-component";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { alertSuccess } from "@/utils/alert";
import { alertError } from "@/utils/alert";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { api } from "@/utils/api";

const UserPage = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const payload = {
        transaction_type: 1,
      };

      const response = await api.post("/api/member/transaction", payload);

      console.log("response ==>", response.data);
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

  // const handleDelete = async (user_id: number) => {
  //   try {
  //     Swal.fire({
  //       text: "Are you sure you want to delete this user?",
  //       icon: "question",
  //       confirmButtonText: "ตกลง",
  //       confirmButtonColor: "#5e72e4",
  //       showCancelButton: true,
  //       cancelButtonText: "ยกเลิก",
  //       cancelButtonColor: "#f5365c",
  //     }).then(async (result: any) => {
  //       if (result.isConfirmed) {
  //         const response = await axios.delete(`/api/user/delete/${user_id}`);

  //         if (response.data.status === false) {
  //           alertError(response.data.message);
  //         } else {
  //           alertSuccess(response.data.message);
  //           fetchTransactions();
  //         }
  //       }
  //     });
  //   } catch (error: any) {
  //     alertError(error.message);
  //   }
  // };

  const handleApprove = async (transaction_id: number) => {
    try {
      const transaction: any = transactions.find((item: any) => item.transaction_id === transaction_id);

      const payload = {
        transaction_id: transaction_id,
        transaction_status: 2,
        transaction_amount: transaction?.balance,
        member_id: transaction?.member_id,
      };
      const response = await api.post(`/api/member/transaction/update`, payload);

      if (response.data.status === false) {
        alertError(response.data.message);
      } else {
        alertSuccess(response.data.message);
        fetchTransactions();
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  const handleReject = async (transaction_id: number) => {
    try {
      const payload = {
        transaction_id: transaction_id,
        transaction_status: 3,
      };
      const response = await api.post(`/api/member/transaction/update`, payload);

      if (response.data.status === false) {
        alertError(response.data.message);
      } else {
        alertSuccess(response.data.message);
        fetchTransactions();
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  const handleView = (transaction_id: number) => {
    const transaction: any = transactions.find((item: any) => item.transaction_id === transaction_id);
    Swal.fire({
      imageUrl: `/uploads/${transaction?.transaction_slip}`,
      imageWidth: 400,
      imageHeight: 600,
      imageAlt: "Custom image",
      showDenyButton: transaction.transaction_status === 1,
      showCancelButton: true,
      showConfirmButton: transaction.transaction_status === 1,
      confirmButtonText: `อนุมัติ`,
      confirmButtonColor: "#5e72e4",
      denyButtonText: `ปฏิเสธ`,
      cancelButtonText: "ยกเลิก",
      cancelButtonColor: "#f5365c",
    }).then((result) => {
      if (result.isConfirmed) {
        handleApprove(transaction_id);
      } else if (result.isDenied) {
        handleReject(transaction_id);
      }
    });
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
          return <span className="badge bg-awarning/30 uppercase px-2 py-1 text-awarning font-bold rounded">กำลังรอ</span>;
        } else if (row.transaction_status === 2) {
          return <span className="badge bg-asuccess/40 uppercase px-2 py-1 text-asuccess font-bold rounded">สำเร็จ</span>;
        } else if (row.transaction_status === 3) {
          return <span className="badge bg-adanger/30 uppercase px-2 py-1 text-adanger font-bold rounded">ถูกปฏิเสธ</span>;
        }
      },
    },
    {
      name: "สร้างเมื่อ",
      sortable: true,
      selector: (row: any) => dayjs(row.createdAt).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      name: "",
      sortable: false,
      center: true,
      width: "20%",
      cell: (row: any) => (
        <Button className="border h-10" onClick={() => handleView(row.transaction_id)}>
          ตรวจสอบ
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout title="Transaction" breadcrumb={[{ title: "Transaction", path: "/backend/console/transaction" }]}>
      <div className="grid grid-cols-12 mb-4">
        <div className="col-span-8">
          <Input type="text" className="w-1/4" id="filter-text-box" placeholder="Search..." />
        </div>
      </div>
      <DataTable fixedHeader persistTableHead={true} className="border" columns={columns} data={transactions} pagination />
      {/* <div className="w-full h-[100vh] bg-red-500 fixed top-0 left-0 z-[100] ">sasdasd</div> */}
    </AdminLayout>
  );
};

export default UserPage;
