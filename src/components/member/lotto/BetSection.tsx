import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import "sweetalert2/src/sweetalert2.scss";
import { LIST_BET_TYPE } from "@/constants/constants";
import { useForm } from "react-hook-form";
import { useMember } from "@/context/MemberContext";
import { api } from "@/utils/api";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

interface ConditionTypes2 {
  listId?: number;
  label?: string;
  unit?: string;
  value?: number;
  type?: number;
  span?: number;
  min?: number;
  max?: number;
  maxPerUnit?: number;
}

interface betSectionProps {
  betList: Array<string | number> | any;
  setSection: (_type: number) => void;
  setBetlist: (_betList: Array<string | number> | any) => void;
  setTypeactive: (_type: Array<number>) => void;
  setBettype: (_type: number) => void;
  setCondition: (_type: Array<ConditionTypes2 | undefined> | any) => void;
}

const BetSection = (props: betSectionProps) => {
  const router = useRouter();
  const { member, balance, refresh } = useMember();
  const { lotto_id } = useParams();

  const { betList, setSection, setBetlist, setTypeactive, setBettype, setCondition } = props;

  const [isShowDuplicate, setIsShowDuplicate] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const renderLabel = (_value: number, _type: number, _label: string) => {
    const resultList = betList.filter((e: any) => e.typeId === _type && e.betType === _value);

    if (resultList.length > 0) {
      return (
        <>
          <span>{_label}</span>
          <div className="grid grid-cols-12 gap-0 mt-0">
            <div className="col-span-1"></div>
            <div className="col-span-2 text-center">
              <span className="text-primary text-xs">เลขที่แทง</span>
            </div>
            <div className="col-span-2 text-center">
              <span className="text-primary text-xs">อัตราจ่าย</span>
            </div>
            <div className="col-span-3 text-center">
              <span className="text-primary text-xs">ชนะ</span>
            </div>
            <div className="col-span-2 text-center">
              <span className="text-primary text-xs">จำนวนเงิน</span>
            </div>
            <div className="col-span-2"></div>
          </div>
        </>
      );
    }
  };

  const handleDelete = (_betId: string) => {
    const resultDelete = betList.filter((e: any) => e.betId !== _betId);
    setBetlist(resultDelete);
  };

  const checkSameBet = (_unit: string, _betId: string) => {
    const resultList = betList.filter((e: any) => e.unit === _unit && e.betId !== _betId);
    return resultList.length > 0;
  };

  const renderList = (_value: number, _type: number, _unit: number, _min: number, _max: number) => {
    const resultList = betList.filter((e: any) => e.typeId === _type && e.betType === _value);
    const resultElements = [];
    for (let i = 0; i < resultList.length; i++) {
      const bet = resultList[i];
      resultElements.push(
        <div className="grid grid-cols-12 gap-0 border h-9 rounded mb-1" key={`list_${i}`}>
          <div className="col-span-1 text-center pt-[8px] text-xs">{i + 1}</div>
          <div className="col-span-2">
            <div className={classNames("w-full h-full  text-center pt-[2px]", checkSameBet(bet.unit, bet.betId) && isShowDuplicate ? "bg-red-500 text-white" : " bg-slate-300 text-primary")}>
              <span className=" text-xs">{bet.unit}</span>
            </div>
          </div>
          <div className="col-span-2 text-center pt-[4px]">
            <span className="text-primary text-xs">{bet.price}</span>
          </div>
          <div className="col-span-3 text-center pt-[3px]">
            <span className="text-white bg-primary px-2 rounded text-xs">{bet.price * watch(`bet_${bet.betId}`)}</span>
          </div>
          <div className="col-span-2 text-center pt-[4px]">
            <input
              type="text"
              className={classNames("border w-full text-center focus:outline-none ", errors[`bet_${bet.betId}`] ? "border-danger" : "focus:border-primary")}
              {...register(`bet_${bet.betId}`, {
                required: {
                  value: true,
                  message: "This field is required",
                },
                min: {
                  value: _min,
                  message: "Error min value",
                },
                max: {
                  value: _max,
                  message: "Error max value",
                },
              })}
              defaultValue={watch(`bet_${bet.betId}`)}
            />
          </div>
          <div className="col-span-2 text-right pt-[3px] pr-2">
            <Button className="h-6 sm:w-[80px] w-[40px]" type="button" onClick={() => handleDelete(bet.betId)}>
              ลบ
            </Button>
          </div>
        </div>
      );
    }

    return resultElements;
  };

  const handleBetByValue = (_value: number) => {
    for (let i = 0; i < betList.length; i++) {
      const bet = betList[i];
      setValue(`bet_${bet.betId}`, _value);
    }
    clearErrors();
  };

  const generateCount = () => {
    let resultCount = 0;
    for (let i = 0; i < betList.length; i++) {
      const bet = betList[i];
      resultCount += parseInt(watch(`bet_${bet.betId}`));
    }

    return resultCount;
  };

  const onSubmit = async (params: any) => {
    try {
      const result = betList.map((t: any) => {
        return {
          ...t,
          bet_price: parseInt(params[`bet_${t.betId}`]),
        };
      });

      let _betCount = 0;

      for (let i = 0; i < result.length; i++) {
        const _bet = result[i];
        _betCount += _bet.bet_price;
      }

      if (member.balance < _betCount) {
        toast.error("คุณมีเครดิตไม่เพียงพอ");
      } else {
        const payload = {
          member_id: member.member_id,
          lotto_id: lotto_id,
          bet_count: _betCount,
          betList: betList.map((bet: any) => {
            const betTypeId = LIST_BET_TYPE.find((e) => e.value === bet.betType && e.type === bet.typeId);
            return { ...bet, bet_pay: bet.price, bet_type: betTypeId?.betTypeId, bet_price: params[`bet_${bet.betId}`] };
          }),
        };

        const response = await api.post("/api/member/bet/create", payload);

        const { status, message, memberLotto } = response.data;

        if (status) {
          refresh();
          router.push(`/member/stake/${memberLotto.member_lotto_id}`);
        } else {
          toast.error(message);
        }
      }
    } catch (error: any) {
      console.log("Error submit", error.message);
    }
  };

  console.log("betList", betList);

  const handleDeleteDuplicate = () => {
    let resultList: any = [];
    for (let i = 0; i < betList.length; i++) {
      const bet = betList[i];
      const checkDuplicate = resultList.find((e: any) => e.unit === bet.unit);
      if (!checkDuplicate) {
        resultList.push(bet);
      }
    }
    setBetlist(resultList);
  };

  useEffect(() => {
    handleBetByValue(1);
  }, []);

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container px-2">
          <div className="flex text-primary ">
            <div className="flex cursor-pointer" onClick={() => setSection(1)}>
              <i className="bi bi-arrow-left-circle text-xl mr-2"></i>
              <span className="mt-[2px]">ย้อนกลับ</span>
            </div>
          </div>
          <div className="w-full bg-white rounded py-2 px-2 mt-2">
            <div className="text-center">รายการแทงทั้งหมด {betList.length} รายการ</div>
            {LIST_BET_TYPE.map((bet) => (
              <div key={`bet__${bet.listId}`}>
                {renderLabel(bet.value, bet.type, bet.label)}
                {renderList(bet.value, bet.type, parseInt(bet.unit), bet.min, bet.max)}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-2 mt-2">
            <div className="col-span-4">
              <div>
                <Button className="h-8 w-full" type="button" onClick={() => setIsShowDuplicate(!isShowDuplicate)}>
                  แสดงเลขซ้ำ
                </Button>
              </div>
            </div>
            <div className="col-span-4">
              <div>
                <Button className="h-8 w-full bg-slate-400" type="button" onClick={() => handleDeleteDuplicate()}>
                  ตัดเลขซ้ำ
                </Button>
              </div>
            </div>
            <div className="col-span-4">
              <div>
                <Button
                  className="h-8 w-full"
                  type="button"
                  onClick={() => {
                    setBetlist([]);
                    setSection(1);
                    setTypeactive([]);
                    setBettype(0);
                    setCondition([]);
                  }}
                >
                  ลบทั้งหมด
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full bg-white p-2 mt-2 rounded">
            <div className="relative border rounded h-10">
              <div className="w-[140px] h-full bg-slate-300 absolute left-0 top-0 text-center pt-1">
                <span className="text-sm">ราคาเท่ากัน</span>
              </div>
              <input className="w-full h-full pl-[156px] focus:outline-none" onChange={(e) => handleBetByValue(parseInt(e.target.value))} />
            </div>
            <div className="grid grid-cols-10 gap-2 mt-2">
              {[5, 10, 20, 50, 100].map((item) => (
                <div className="col-span-2" key={`bet_by_value_${item}`}>
                  <div className="w-full h-8 border border-primary text-center pt-[2px] rounded cursor-pointer" onClick={() => handleBetByValue(item)}>
                    <span className="text-primary">{item}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-12 gap-2 mt-2">
              <div className="col-span-6">
                <div className="w-full h-8 bg-slate-900 text-white text-center rounded-tl rounded-tr">
                  <span className="text-xs">ยอดคงเหลือ</span>
                </div>
                <div className="text-center border rounded-bl rounded-br pt-1 pb-2">{balance}</div>
              </div>
              <div className="col-span-6">
                <div className="w-full h-8 bg-slate-900 text-white text-center rounded-tl rounded-tr">
                  <span className="text-xs">ยอดเดิมพัน</span>
                </div>
                <div className="text-center border rounded-bl rounded-br pt-1 pb-2">{generateCount()}</div>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <Button className="w-full" type="submit">
              ส่งโพย
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default BetSection;
