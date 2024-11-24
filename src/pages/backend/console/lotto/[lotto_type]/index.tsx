"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import { Button } from "@/components/admin/ui/button";
import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link";

const LottoList = () => {
  const [token, setToken] = useState("");

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
      name: "No.",
      width: "70px",
      sortable: true,
      selector: (row: any) => row.index,
    },
    {
      name: "Username",
      sortable: true,
      selector: (row: any) => row.username,
    },
    {
      name: "Phone",
      sortable: true,
      selector: (row: any) => row.phone,
    },
    {
      name: "Role",
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
      name: "Created At",
      sortable: true,
      selector: (row: any) => dayjs(row.createdAt).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      name: "Updated At",
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
    <AdminLayout title="Lotto List" breadcrumb={[{ title: "Lotto List", path: "/backend/console/lotto" }]}>
      LottoList
      <Button onClick={() => fetchToken()}>Click</Button>
      <Button onClick={() => verifyToken()}>Verify</Button>
    </AdminLayout>
  );
};

export default LottoList;
