import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import dayjs from "dayjs";
import Link from "next/link";
import { Button } from "@/components/admin/ui/button";
import DataTable from "react-data-table-component";
import { Input } from "@/components/admin/ui/input";
import { api } from "@/utils/api";
import { alertError } from "@/utils/alert";

const MemberPage = () => {
  const [members, setMembers] = useState([]);

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
      name: "Balance",
      sortable: true,
      selector: (row: any) => row.balance,
    },
    {
      name: "Group",
      sortable: true,
      selector: (row: any) => row.user.username,
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

  const fetchMembers = async () => {
    try {
      const response = await api.get("/api/member/list");
      console.log("response", response.data);
      setMembers(response.data.map((item: any, index: number) => ({ ...item, index: index + 1 })));
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
