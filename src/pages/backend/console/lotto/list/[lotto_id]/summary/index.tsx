import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import withProtectedAdmin from "@/hoc/withProtectedAdmin";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/admin/ui/input";
import { Button } from "@/components/admin/ui/button";
import { api } from "@/utils/api";
import { alertError, alertSuccess } from "@/utils/alert";
import { getThreeNumber } from "@/utils/utils";

const SummaryPage = () => {
  const { lotto_id } = useParams();
  const { register, handleSubmit } = useForm();

  const [lottoList, setLottoList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLottoList = async () => {
    try {
      setLoading(true);
      const response = await api.post("/api/backend/lotto/bet-list", { lotto_id: lotto_id });

      console.log("response.data", response.data);
      if (response.data.status === true) {
        setLottoList(response.data.lottoList.map((item: any, index: number) => ({ ...item, index: index + 1 })));
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

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const result: any = [
        {
          type: 1,
          bet_number: data.lotto_number_3,
        },
        {
          type: 2,
          bet_number: getThreeNumber(data.lotto_number_3),
        },
        {
          type: 3,
          bet_number: data.lotto_number_3.substring(1, 3),
        },
        {
          type: 4,
          bet_number: data.lotto_number_2,
        },
        {
          type: 5,
          bet_number: data.lotto_number_3.split(""),
        },
        {
          type: 6,
          bet_number: data.lotto_number_2.split(""),
        },
      ];

      const resultList: any = [];

      for (let i = 0; i < lottoList.length; i++) {
        const elem: any = lottoList[i];
        console.log(elem.bet_type);
        if (elem.bet_type === 1 || elem.bet_type === 3 || elem.bet_type === 4) {
          const findResult = result.find((e: any) => e.type === elem.bet_type);
          if (findResult && findResult.bet_number === elem.bet_number) {
            resultList.push({ ...elem, status: 2, bet_number_result: findResult.bet_number, bet_pay_result: elem.bet_amount * elem.bet_pay });
          } else {
            resultList.push({ ...elem, status: 3, bet_number_result: findResult.bet_number, bet_pay_result: 0 });
          }
        } else if (elem.bet_type === 2) {
          const findResultList = result.find((e: any) => e.type === elem.bet_type);
          const findResult = findResultList.bet_number.find((e: any) => e === elem.bet_number);
          if (findResult) {
            resultList.push({ ...elem, status: 2, bet_number_result: data.lotto_number_3, bet_pay_result: elem.bet_amount * elem.bet_pay });
          } else {
            resultList.push({ ...elem, status: 3, bet_number_result: data.lotto_number_3, bet_pay_result: 0 });
          }
        } else if (elem.bet_type === 5) {
          const findResultList = result.find((e: any) => e.type === elem.bet_type);
          const findResult = findResultList.bet_number.find((e: any) => e === elem.bet_number);
          if (findResult) {
            resultList.push({ ...elem, status: 2, bet_number_result: data.lotto_number_3, bet_pay_result: elem.bet_amount * elem.bet_pay });
          } else {
            resultList.push({ ...elem, status: 3, bet_number_result: data.lotto_number_3, bet_pay_result: 0 });
          }
        } else if (elem.bet_type === 6) {
          const findResultList = result.find((e: any) => e.type === elem.bet_type);
          const findResult = findResultList.bet_number.find((e: any) => e === elem.bet_number);
          if (findResult) {
            resultList.push({ ...elem, status: 2, bet_number_result: data.lotto_number_2, bet_pay_result: elem.bet_amount * elem.bet_pay });
          } else {
            resultList.push({ ...elem, status: 3, bet_number_result: data.lotto_number_2, bet_pay_result: 0 });
          }
        }
      }

      const payload = {
        lotto_id: lotto_id,
        member_lotto_id: lottoList[0].member_lotto_id,
        lotto_result: [
          {
            type: 1,
            bet_number: data.lotto_number_3,
          },
          {
            type: 4,
            bet_number: data.lotto_number_2,
          },
        ],
        lotto_list: resultList,
      };

      const response = await api.post(`/api/backend/lotto/summary`, payload);
      const { status, message } = response.data;
      if (status) {
        alertSuccess(message);
      } else {
        alertError(message);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <AdminLayout
      title="ออกผล"
      breadcrumb={[
        { title: "หวย", path: "/backend/console/lotto" },
        { title: "รายการ", path: `/backend/console/lotto/list/${lotto_id}` },
        { title: "ออกผล", path: `/backend/console/lotto/list/${lotto_id}/summary` },
      ]}
      loading={loading}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <h3 className="text-2xl font-bold">ออกผล</h3>
          </div>
          <div className="col-span-6">
            <div className="w-full">
              <label htmlFor="lotto_number">3 ตัวบน</label>
              <Input type="text" {...register("lotto_number_3")} className="w-full" />
            </div>
          </div>
          <div className="col-span-6">
            <div className="w-full">
              <label htmlFor="lotto_number">2 ตัวล่าง</label>
              <Input type="text" {...register("lotto_number_2")} className="w-full" />
            </div>
          </div>
          <div className="col-span-6">
            <Button type="submit">ออกผล</Button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default withProtectedAdmin(SummaryPage);
