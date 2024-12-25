import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import Link from "next/link";
import { Button } from "@/components/admin/ui/button";
import { api } from "@/utils/api";
import { alertSuccess, alertError } from "@/utils/alert";
import dayjs from "dayjs";
import DataTable from "react-data-table-component";
import withProtectedAdmin from "@/hoc/withProtectedAdmin";
import { useParams } from "next/navigation";
import { LIST_BET_TYPE } from "@/constants/constants";
import { LOTTO_TYPE } from "@/constants/lotto_type";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import classNames from "classnames";

dayjs.extend(buddhistEra);
dayjs.locale("th");

const LottoPage = () => {
  const { lotto_id } = useParams();
  const [lottoList, setLottoList] = useState([]);
  const [lottoResult, setLottoResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lotto, setLotto] = useState(null);

  const getLottoList = async () => {
    try {
      const response = await api.post("/api/backend/lotto/bet-list", { lotto_id: lotto_id });

      console.log("response.data", response.data);
      if (response.data.status === true) {
        setLottoList(response.data.lottoList.map((item: any, index: number) => ({ ...item, index: index + 1 })));
        setLottoResult(response.data.lottoResult);
        setLotto(response.data.lotto);
      } else {
        alertError(response.data.message);
      }
    } catch (error: any) {
      alertError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lotto_id) {
      getLottoList();
    }
  }, [lotto_id]);

  // const handleChangeStatus = async (lotto_id: number, status: number, lotto_type: number) => {
  //   try {
  //     const payload = {
  //       lotto_id: lotto_id,
  //       status: status === 1 ? 0 : 1,
  //       lotto_type: lotto_type,
  //     };
  //     const response = await api.post("/api/backend/lotto/change-status", payload);
  //     if (response.data.status === true) {
  //       getLottoList();
  //     } else {
  //       alertError(response.data.message);
  //     }
  //   } catch (error: any) {
  //     alertError(error.message);
  //   }
  // };

  const handleDelete = async (lotto_id: number) => {
    try {
      const payload = {
        lotto_id: lotto_id,
      };
      const response = await api.post("/api/backend/lotto/delete", payload);
      if (response.data.status === true) {
        alertSuccess(response.data.message);
        getLottoList();
      } else {
        alertError(response.data.message);
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  console.log("lotto", lotto);

  const columns = [
    {
      name: "ลำดับ",
      width: "90px",
      sortable: true,
      selector: (row: any) => row.index,
    },
    {
      name: "ชื่อผู้ใช้",
      sortable: true,
      selector: (row: any) => row.member_lotto.member.username,
    },
    {
      name: "ประเภท",
      sortable: true,
      selector: (row: any) => LIST_BET_TYPE.find((e) => e.betTypeId === row.bet_type)?.label,
    },
    {
      name: "ตัวเลขที่แทง",
      sortable: true,
      selector: (row: any) => row.bet_number,
    },
    {
      name: "จำนวนเงิน",
      sortable: true,
      selector: (row: any) => row.bet_amount,
    },
    {
      name: "ราคาจ่าย",
      sortable: true,
      selector: (row: any) => row.bet_pay,
    },
    {
      name: "ผลได้เสีย",
      sortable: true,
      selector: (row: any) => row.bet_pay_result,
    },
    {
      name: "วันที่แทง",
      sortable: true,
      center: true,
      selector: (row: any) => dayjs(row.createdAt).format("DD/MM/YYYY HH:mm"),
    },
    {
      name: "สถานะ",
      center: true,
      sortable: true,
      cell: (row: any) => (
        <div className="w-full text-center">
          {row.bet_status === 1 && <span className="text-white bg-warning rounded-sm px-2">รอออกผล</span>}
          {row.bet_status === 2 && <span className="text-white bg-asuccess rounded-sm px-2">ถูกรางวัล</span>}
          {row.bet_status === 3 && <span className="text-white bg-adanger rounded-sm px-2">ไม่ถูกรางวัล</span>}
        </div>
      ),
    },
    // {
    //   name: "",
    //   sortable: false,
    //   center: true,
    //   width: "20%",
    //   cell: (row: any) => (
    //     <div className="w-full text-center">
    //       <Button className="border h-10" variant="danger" onClick={() => handleDelete(row.member_lotto_list_id)}>
    //         <i className="bi bi-trash3"></i>
    //       </Button>
    //     </div>
    //   ),
    // },
  ];

  const getFlag = (_id: number) => {
    const image = LOTTO_TYPE.find((e) => e.lotto_type_id == _id);

    return image.lotto_type_icon;
  };

  const getBuyAll = () => {
    let _buyAll = 0;

    for (let i = 0; i < lottoList.length; i++) {
      const _list = lottoList[i];
      _buyAll += _list.bet_amount;
    }

    return _buyAll;
  };

  const getPayAll = () => {
    const _result = lottoList.filter((e) => e.bet_status == 2);
    let _payAll = 0;
    for (let i = 0; i < _result.length; i++) {
      const _list = _result[i];
      _payAll += _list.bet_amount;
    }
    return _payAll;
  };

  const getSome = () => {
    let _buyAll = getBuyAll();
    let _payAll = getPayAll();
    return _buyAll - _payAll;
  };

  return (
    <AdminLayout
      title="หวย"
      breadcrumb={[
        { title: "หวย", path: "/backend/console/lotto" },
        { title: "รายการ", path: "/backend/console/lotto" },
      ]}
    >
      {loading ? (
        <>Loading. . .</>
      ) : (
        <>
          {lottoResult ? (
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="xl:col-span-3 md:col-span-6 col-span-12">
                <div className="w-full bg-aprimary px-2 pb-2 text-white rounded">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                      <div className="flex">
                        <span>
                          <img src={getFlag(lottoResult?.lotto?.lotto_type_id)} className="w-6 h-4 mt-2 mr-2" />
                        </span>
                        <span>{LOTTO_TYPE.find((e) => e.lotto_type_id == lottoResult?.lotto?.lotto_type_id)?.lotto_type_name}</span>
                      </div>
                    </div>
                    <div className="col-span-6 text-right">
                      <span className="text-white text-xs">{dayjs(lottoResult?.lotto?.period).format("DD MMMM BBBB")}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6 text-center">
                      <p>เลขท้าย 3 ตัว</p>
                      <span className="bg-white text-aprimary rounded px-2">{lottoResult?.lotto_result_list.find((l: any) => l.lotto_result_type === 1)?.lotto_result_number}</span>
                    </div>
                    <div className="col-span-6 text-center">
                      <p>เลขท้าย 2 ตัว</p>
                      <span className="bg-white text-aprimary rounded px-2">{lottoResult?.lotto_result_list.find((l: any) => l.lotto_result_type === 4)?.lotto_result_number}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl:col-span-3 md:col-span-6 col-span-12">
                <div className="w-full bg-asuccess px-2 py-3 text-white rounded h-[80px]">
                  <p>ยอดซื้อทั้งหมด</p>
                  <span className="text-2xl mr-2">{getBuyAll().toLocaleString()}</span>
                  <span>บาท</span>
                </div>
              </div>
              <div className="xl:col-span-3 md:col-span-6 col-span-12">
                <div className="w-full bg-adanger px-2 py-3 text-white rounded h-[80px]">
                  <p>ยอดจ่ายทั้งหมด</p>
                  <span className="text-2xl mr-2">{getPayAll().toLocaleString()}</span>
                  <span>บาท</span>
                </div>
              </div>
              <div className="xl:col-span-3 md:col-span-6 col-span-12">
                <div className={classNames("w-full  px-2 py-3 text-white rounded h-[80px]", getSome() < 0 ? "bg-adanger" : "bg-asuccess")}>
                  <p>ผลลัพท์</p>
                  <span className="text-2xl mr-2">{getSome().toLocaleString()}</span>
                  <span>บาท</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-6"></div>
              <div className="col-span-6 text-right">
                <Link href={`/backend/console/lotto/list/${lotto_id}/summary`}>
                  <Button disabled={lotto.close_time > dayjs().format("YYYY-MM-DD HH:mm") ? true : false}>
                    ออกผล <i className="bi bi-plus-lg"></i>
                  </Button>
                </Link>
              </div>
            </div>
          )}
          <DataTable fixedHeader persistTableHead={true} className="border" columns={columns} data={lottoList} pagination />
        </>
      )}
    </AdminLayout>
  );
};

export default withProtectedAdmin(LottoPage);
