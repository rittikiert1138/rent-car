import React from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";

const Bank = () => {
  return (
    <AdminLayout title="ธนาคาร" breadcrumb={[{ title: "ธนาคาร", path: "/backend/console/bank" }]}>
      Bank
    </AdminLayout>
  );
};

export default Bank;
