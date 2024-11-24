import React from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import Link from "next/link";

const LottoPage = () => {
  const lottoList = [
    {
      id: 1,
      name: "หวยไทย",
      url: "/backend/console/lotto/1",
    },
    {
      id: 2,
      name: "หวย ธกส",
      url: "/backend/console/lotto/2",
    },
    {
      id: 3,
      name: "หวย ธกส",
      url: "/backend/console/lotto/3",
    },
    {
      id: 4,
      name: "หวยฮานอย",
      url: "/backend/console/lotto/4",
    },
  ];

  return (
    <AdminLayout title="Lotto" breadcrumb={[{ title: "Lotto", path: "/backend/console/lotto" }]}>
      <div className="grid grid-cols-12 gap-4">
        {lottoList.map((item, index) => (
          <div className="col-span-6" key={index}>
            <Link href={item.url}>
              <div className="w-full h-20  rounded-lg border text-aprimary bg-aprimary/30 cursor-pointer text-center pt-3 hover:bg-aprimary/60 hover:text-white">
                <h3 className="text-[32px]">{item.name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default LottoPage;
