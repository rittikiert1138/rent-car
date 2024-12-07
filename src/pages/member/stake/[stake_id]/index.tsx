import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MemberLayout from "@/components/member/includes/MemberLayout";
import withProtectedMember from "@/hoc/withProtectedMember";
import { useRouter } from "next/router";
import { useMember } from "@/context/MemberContext";
import { api } from "@/utils/api";
import { LIST_BET_TYPE } from "@/constants/constants";
import classNames from "classnames";

const StakeResult = () => {
  const router = useRouter();
  const { member } = useMember();
  const { stake_id } = router.query;

  const [lotto, setLotto] = useState<any>(null);

  const getStakeDetail = async () => {
    const response = await api.post("/api/member/lotto/stake/detail", {
      member_id: member.member_id,
      member_lotto_id: stake_id,
    });
    console.log("response ==>", response.data.lotto);
    if (response.data.status) {
      setLotto(response.data.lotto);
    }
  };

  useEffect(() => {
    if (stake_id) {
      getStakeDetail();
    }
  }, [stake_id]);

  const generateTotal = () => {
    let total = 0;
    lotto?.member_lotto_list.forEach((item: any) => {
      total += item.bet_amount;
    });
    return total;
  };

  const generateResult = () => {
    let total = 0;
    lotto?.member_lotto_list.forEach((item: any) => {
      total += item.bet_pay_result;
    });
    return total;
  };

  return (
    <MemberLayout title="โพยหวย">
      <div className="container px-2 ">
        <Link href="/member/stake">
          <div className="flex cursor-pointer text-primary mt-2">
            <i className="bi bi-arrow-left-circle text-xl mr-2"></i>
            <span className="mt-[2px]">ย้อนกลับ</span>
          </div>
        </Link>
        <div className="w-full bg-white rounded-sm p-2 mt-2">
          <div className="text-center">
            <p className="text-primary">{lotto?.lotto.lotto_type.lotto_type_name}</p>
            <p className="text-xs text-gray-500">เลขที่รายการแทง {lotto?.member_lotto_id}</p>
          </div>
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-6">
              <div className="h-16 border-r text-center pt-2">
                <p className="text-xs text-gray-500">แทงรวม</p>
                <p className="text-xl text-primary">{generateTotal()}</p>
              </div>
            </div>
            <div className="col-span-6">
              <div className="h-16 border-r text-center pt-2">
                <p className="text-xs text-gray-500">ผลชนะทั้งสิ้น</p>
                <p className="text-xl text-primary">{generateResult()}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-12 gap-2 mt-2">
          <div className="col-span-6">
            <Link href="/member/stake">
              <div className="w-full">
                <Button className="w-full h-8 bg-gray-500">ดูโพย</Button>
              </div>
            </Link>
          </div>
          <div className="col-span-6">
            <Link href="/member/lotto">
              <div className="w-full">
                <Button className="w-full h-8 bg-primary">แทงต่อ</Button>
              </div>
            </Link>
          </div>
        </div> */}

        {lotto?.member_lotto_list.length > 0 ? (
          lotto?.member_lotto_list.map((item: any, index: number) => (
            <div className="w-full" key={index}>
              <div className={classNames("w-full  h-7 mt-2 rounded-tl-sm rounded-tr-sm px-2", item.bet_pay_result > 0 ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500")}>
                <span className=" text-xs -mt-[10px]">
                  ลำดับที่ {index + 1} : {lotto?.lotto.lotto_type.lotto_type_name}
                </span>
              </div>
              <div className="w-full bg-white px-2 rounded-bl-sm rounded-br-sm pb-2">
                <div className="grid grid-cols-12 gap-0">
                  <div className="col-span-3">
                    <div className="text-center border-r mt-2">
                      <p className="text-xs text-gray-500">เลขที่ซื้อ {item.bet_type}</p>
                      <h3 className="text-primary text-[24px]">{item.bet_number}</h3>
                      <p className="text-xs text-gray-500">{LIST_BET_TYPE.find((bet) => bet.betTypeId === item.bet_type)?.label}</p>
                    </div>
                  </div>
                  <div className="col-span-9">
                    <div className="grid grid-cols-12 gap-0 mt-2 ">
                      <div className="col-span-4 text-center">
                        <p className="text-xs text-gray-500">เดิมพัน</p>
                        <p className="text-primary">{item.bet_amount}</p>
                      </div>
                      <div className="col-span-4 text-center">
                        <p className="text-xs text-gray-500">จ่าย</p>
                        <p className="text-primary">{item.bet_pay}</p>
                      </div>
                      <div className="col-span-4 text-center">
                        <p className="text-xs text-gray-500">เลขที่ออก</p>
                        <p className="text-primary">{item.bet_number_result}</p>
                      </div>
                      <div className="col-span-12 text-center px-2">
                        <div className="w-full h-6 bg-gray-200 pt-1 rounded-sm">
                          <p className={classNames("text-xs", item.bet_pay_result > 0 ? "text-green-500" : "text-red-500")}>
                            ผลได้เสีย <span>{item.bet_pay_result}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </MemberLayout>
  );
};

export default withProtectedMember(StakeResult);
