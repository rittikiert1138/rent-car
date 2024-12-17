import React from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import { Button } from "@/components/admin/ui/button";
import Link from "next/link";

const RolePage = () => {
  return (
    <AdminLayout title="Role" breadcrumb={[{ title: "Role", path: "/backend/console/role" }]}>
      <div className="grid grid-cols-12 mb-4">
        <div className="col-span-8"></div>
        <div className="col-span-4 text-right">
          <Link href="/backend/console/role/create">
            <Button>
              Create <i className="bi bi-plus-lg"></i>
            </Button>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default RolePage;
