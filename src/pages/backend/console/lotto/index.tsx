import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import Link from "next/link";
import { Button } from "@/components/admin/ui/button";
import { api } from "@/utils/api";
import { alertSuccess, alertError } from "@/utils/alert";

const LottoPage = () => {
  const [lottoTypes, setLottoTypes] = useState([]);

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

  const getLottoTypes = async () => {
    try {
      const response = await api.get("/api/user/lotto-type");
      if (response.data.status === true) {
        setLottoTypes(response.data.data);
      } else {
        alertError(response.data.message);
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  useEffect(() => {
    getLottoTypes();
  }, []);

  return (
    <AdminLayout title="Lotto" breadcrumb={[{ title: "Lotto", path: "/backend/console/lotto" }]}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">{/* <h3 className="text-2xl font-bold">หวยไทย</h3> */}</div>
        <div className="col-span-6 text-right">
          <Link href="/backend/console/lotto/create">
            <Button>
              Create <i className="bi bi-plus-lg"></i>
            </Button>
          </Link>
        </div>
      </div>
      {/* <div className="grid grid-cols-12 gap-4">
        {lottoList.map((item, index) => (
          <div className="col-span-6" key={index}>
            <Link href={item.url}>
              <div className="w-full h-20  rounded-lg border text-aprimary bg-aprimary/30 cursor-pointer text-center pt-3 hover:bg-aprimary/60 hover:text-white">
                <h3 className="text-[32px]">{item.name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div> */}
      <table className="w-full border mt-4 rounded-lg">
        <thead className="h-14">
          <tr>
            <th className="text-center w-[50px]">ลำดับ</th>
            <th className="text-left">ชื่อ</th>
            <th className="text-left">สถานะ</th>
            <th className="text-left"></th>
          </tr>
        </thead>
        <tbody className="border h-16">
          {lottoTypes.map((item: any, index) => (
            <tr key={index} className="border">
              <td className="text-center w-[80px]">{index + 1}</td>
              <td className="text-left">{item.lotto_type_name}</td>
              <td className="text-left">{item.lotto_type_status}</td>
              <td className="text-center w-[20%]">
                <div className="w-full text-center">
                  <Link href={`/backend/console/lotto/${item.lotto_type_id}`}>
                    <Button className="border h-10" variant="success">
                      <i className="bi bi-list-task"></i>
                    </Button>
                  </Link>
                  <Link href={`/backend/console/lotto/edit/${item.lotto_type_id}`}>
                    <Button className="border h-10">
                      <i className="bi bi-pencil"></i>
                    </Button>
                  </Link>
                  <Button className="border h-10" variant="danger">
                    <i className="bi bi-trash3"></i>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default LottoPage;
