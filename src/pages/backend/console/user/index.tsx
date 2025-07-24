"use client";

import React, { useState, useEffect, useMemo } from "react";
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
import { apiInternal } from "@/utils/api";

const UserPage = () => {
  const [users, setUsers] = useState({
    all: [],
    filter: [],
  });

  const [keyword, setKeyword] = useState<any>("");

  const fetchUsers = async () => {
    try {
      const response = await apiInternal.get("/api/backend/users");

      if (response.data.status === false) {
        alertError(response.data.message);
      } else {
        setUsers({
          all: response.data.map((item: any, index: number) => ({
            ...item,
            index: index + 1,
          })),
          filter: response.data.map((item: any, index: number) => ({
            ...item,
            index: index + 1,
          })),
        });
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
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
            fetchUsers();
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
          return (
            <span className="badge bg-aprimary/40 uppercase px-2 py-1 text-aprimary font-bold rounded">
              Admin
            </span>
          );
        } else if (row.role === "AGENT") {
          return (
            <span className="badge bg-adanger/30 uppercase px-2 py-1 text-adanger font-bold rounded">
              AGENT
            </span>
          );
        }
      },
    },
    {
      name: "Created At",
      sortable: true,
      selector: (row: any) =>
        dayjs(row.createdAt).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      name: "Updated At",
      sortable: true,
      selector: (row: any) =>
        dayjs(row.updatedAt).format("DD/MM/YYYY HH:mm:ss"),
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
          <Button
            className="border h-10"
            variant="danger"
            onClick={() => handleDelete(row.user_id)}
          >
            <i className="bi bi-trash3"></i>
          </Button>
          <Button
            className="border h-10"
            variant="success"
            onClick={() => alert(row.user_id)}
          >
            <i className="bi bi-search"></i>
          </Button>
        </div>
      ),
    },
  ];

  const handleSearch = () => {
    if (keyword.length <= 0) {
      setUsers({ ...users, filter: users.all });
    } else {
      let results = users.all.filter((item) => {
        return (
          item.username.toLowerCase().includes(keyword.toLowerCase()) ||
          item.phone.toLowerCase().includes(keyword.toLowerCase()) ||
          item.role.toLowerCase().includes(keyword.toLowerCase()) ||
          dayjs(item.createdAt)
            .format("DD/MM/YYYY HH:mm:ss")
            .toLowerCase()
            .includes(keyword.toLowerCase()) ||
          dayjs(item.updatedAt)
            .format("DD/MM/YYYY HH:mm:ss")
            .toLowerCase()
            .includes(keyword.toLowerCase())
        );
      });
      setUsers({ ...users, filter: results });
    }
  };

  return (
    <AdminLayout
      title="User"
      breadcrumb={[{ title: "User", path: "/backend/console/user" }]}
    >
      <div className="grid grid-cols-12 mb-4">
        <div className="col-span-8">
          <div className="flex">
            <Input
              type="text"
              className="w-1/4"
              id="filter-text-box"
              placeholder="ค้นหา..."
              onChange={(e) => {
                if (e.target.value.length <= 0) {
                  setUsers({ ...users, filter: users.all });
                } else {
                  setKeyword(e.target.value);
                }
              }}
            />
            <Button className="mt-1 ml-4" onClick={() => handleSearch()}>
              ค้นหา <i className="bi bi-search"></i>
            </Button>
          </div>
        </div>
        <div className="col-span-4 text-right">
          <Link href="/backend/console/user/create">
            <Button>
              เพิ่ม <i className="bi bi-plus-lg"></i>
            </Button>
          </Link>
        </div>
      </div>
      <DataTable
        fixedHeader
        persistTableHead={true}
        className="border"
        columns={columns}
        data={users.filter}
        pagination
      />
    </AdminLayout>
  );
};

export default UserPage;
