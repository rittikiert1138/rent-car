import React from "react";
import { LOTTO_TYPE } from "@/constants/lotto_type";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";

dayjs.extend(buddhistEra);
dayjs.locale("th");

interface ResultProps {
  result: any;
}

const ResultCard = ({ result }: ResultProps) => {
  const getFlag = (_id: number) => {
    const image = LOTTO_TYPE.find((e) => e.lotto_type_id == _id);

    return image.lotto_type_icon;
  };

  const twoDigit = result?.lotto_result_list.find((l: any) => l.lotto_result_type === 4);
  const threeDigit = result?.lotto_result_list?.find((l: any) => l.lotto_result_type === 1);

  return (
    <div className="col-span-6 lg:col-span-6">
      <div className="w-full h-10 bg-gray-500 rounded-tl-sm rounded-tr-sm">
        <div className="grid grid-cols-12 gap-2 pt-1">
          <div className="col-span-6 px-2 flex">
            <span className="mt-2 mr-2">
              <img src={getFlag(result?.lotto?.lotto_type_id)} className="w-6 h-4" />
            </span>
            <span className="text-white text-sm mt-[6px]">{LOTTO_TYPE.find((e) => e.lotto_type_id == result?.lotto?.lotto_type_id)?.lotto_type_name}</span>
          </div>
        </div>
      </div>
      <div className="w-full bg-white h-24 rounded-bl-sm rounded-br-sm p-2 pt-1">
        <div className="grid grid-cols-12 gap-2 mb-2">
          <div className="col-span-6 text-center">
            <span className="text-gray-500 text-xs">3 ตัวบน</span>
            <div className="bg-gray-200 rounded-sm h-[28px]">
              <span className="text-primary text-[16px]">{threeDigit?.lotto_result_number}</span>
            </div>
          </div>
          <div className="col-span-6 text-center">
            <div>
              <span className="text-gray-500 text-xs">2 ตัวล่าง</span>
              <div className="bg-gray-200 rounded-sm h-[28px]">
                <span className="text-primary text-[16px]">{twoDigit?.lotto_result_number}</span>
              </div>
            </div>
          </div>
          <div className="col-span-12 text-center">
            <span className="text-gray-500 text-xs">{dayjs(result?.lotto?.period).format("DD MMMM BBBB")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
