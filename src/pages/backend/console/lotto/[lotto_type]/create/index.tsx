import React, { useState } from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/admin/includes/AdminLayout";

const CreateLotto = () => {
  const { lotto_type } = useParams();

  const [startDate, setStartDate] = useState(new Date());

  return (
    <AdminLayout
      title={`Create Lotto`}
      breadcrumb={[
        { title: "Lotto", path: `/backend/console/lotto/${lotto_type}` },
        { title: "Create", path: `/backend/console/lotto/${lotto_type}/create` },
      ]}
    >
      <div className="w-full"></div>
    </AdminLayout>
  );
};

export default CreateLotto;
