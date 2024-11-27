"use client";
import React, { useState } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import { Button } from "@/components/admin/ui/button";
import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link";
import { useParams } from "next/navigation";
import DataTable from "react-data-table-component";
import { Input } from "@/components/admin/ui/input";

const LottoList = () => {
  const [token, setToken] = useState("");

  const { lotto_type } = useParams();

  const fetchToken = async () => {
    const response = await axios.get("/api/auth/generate-token");
    setToken(response.data);
    console.log("response", response.data);
  };

  const verifyToken = async () => {
    const response = await axios.get("/api/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response", response.data);
  };

  const columns = [
    {
      name: "เลขที่",
      width: "70px",
      sortable: true,
      selector: (row: any) => row.index,
    },
    {
      name: "ชื่อ",
      sortable: true,
      selector: (row: any) => row.username,
    },
    {
      name: "งวดที่",
      sortable: true,
      selector: (row: any) => row.phone,
    },
    {
      name: "ปิดรับ",
      sortable: true,
      selector: (row: any) => row.role,
      cell: (row: any) => {
        if (row.role === "ADMIN") {
          return <span className="badge bg-aprimary/40 uppercase px-2 py-1 text-aprimary font-bold rounded">Admin</span>;
        } else if (row.role === "AGENT") {
          return <span className="badge bg-adanger/30 uppercase px-2 py-1 text-adanger font-bold rounded">AGENT</span>;
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
        <div className="w-full text-center">
          <Link href={`/backend/console/user/edit/${row.user_id}`}>
            <Button className="border h-10">
              <i className="bi bi-pencil"></i>
            </Button>
          </Link>
          <Button className="border h-10" variant="danger">
            <i className="bi bi-trash3"></i>
          </Button>
          <Button className="border h-10" variant="success" onClick={() => alert(row.user_id)}>
            <i className="bi bi-search"></i>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout title="Lotto" breadcrumb={[{ title: "Lotto", path: "/backend/console/lotto" }]}>
      <div className="grid grid-cols-12 mb-4">
        <div className="col-span-8">
          <Input type="text" className="w-1/4" id="filter-text-box" placeholder="Search..." />
        </div>
        <div className="col-span-4 text-right">
          <Link href={`/backend/console/lotto/${lotto_type}/create`}>
            <Button>
              Create <i className="bi bi-plus-lg"></i>
            </Button>
          </Link>
        </div>
      </div>
      <DataTable fixedHeader persistTableHead={true} className="border" columns={columns} data={[]} pagination />
    </AdminLayout>
  );
};

export default LottoList;
