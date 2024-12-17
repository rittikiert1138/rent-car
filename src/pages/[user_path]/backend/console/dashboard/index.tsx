import React from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";

const Dashboard = () => {
  return (
    <AdminLayout title="Dashboard" breadcrumb={[{ title: "Lotto List", path: "/backend/console/lotto" }]}>
      <div></div>
    </AdminLayout>
  );
};

export default Dashboard;
