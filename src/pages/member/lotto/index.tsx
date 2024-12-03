import React, { useState, useEffect } from "react";
import Link from "next/link";
import withProtectedUser from "@/hoc/withProtectedMember";
import MemberLayout from "@/components/member/includes/MemberLayout";
import { api } from "@/utils/api";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import Countdown, { zeroPad } from "react-countdown";

dayjs.extend(buddhistEra);
dayjs.locale("th");

const LottoList = () => {
  const [lottoList, setLottoList] = useState([]);

  useEffect(() => {
    const fetchLottoList = async () => {
      try {
        const response = await api.get("/api/member/lotto/list");
        setLottoList(response.data);
      } catch (error: any) {
        console.log("Error ==>", error?.message);
      }
    };
    fetchLottoList();
  }, []);

  const renderer = (params: any) => {
    const { hours, minutes, seconds, completed } = params;
    if (completed) {
      return;
    } else {
      return (
        <div className="text-center mt-2">
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </div>
      );
    }
  };

  return (
    <MemberLayout title="แทงหวย">
      <div className="container px-2 ">
        <h3>หวยเด่นประจำวัน</h3>
        <div className="grid grid-cols-12 gap-2 mb-2">
          {/* <div className="col-span-12 lg:col-span-6">
            <div className="w-full h-10 bg-primary rounded-tl-sm rounded-tr-sm">
              <div className="grid grid-cols-12 gap-2 pt-1">
                <div className="col-span-6 px-2 flex">
                  <span className="mt-2 mr-2">
                    <img src="/icons/lotto_th.svg" className="w-6 h-4" />
                  </span>
                  <span className="text-white text-sm mt-[6px]">หวยรัฐบาล</span>
                </div>
                <div className="col-span-6 text-right px-2">
                  <span className="text-white text-xs">ปิดรับ 15:20</span>
                </div>
              </div>
            </div>
            <div className="w-full bg-white h-24 rounded-bl-sm rounded-br-sm p-2">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6 px-2 text-center">
                  <span className="text-gray-500 text-xs">3 ตัวบน</span>
                  <div className="w-full rounded-sm bg-gray-200 h-8">
                    <span className="text-lg text-primary">912</span>
                  </div>
                </div>
                <div className="col-span-6 text-center">
                  <span className="text-gray-500 text-xs">2 ตัวล่าง</span>
                  <div className="w-full rounded-sm bg-gray-200 h-8">
                    <span className="text-lg text-primary">92</span>
                  </div>
                </div>
              </div>
              <div className="w-full text-center">
                <span className="text-xs text-gray-500">16 พฤศจิกายน 2024</span>
              </div>
            </div>
          </div> */}
          {lottoList.length > 0 &&
            lottoList.map((lotto: any, index: number) => (
              <div className="col-span-12 lg:col-span-6" key={`lotto_list_${index}`}>
                <Link href={`/member/lotto/${lotto.lotto_id}`}>
                  <div className="w-full h-10 bg-primary rounded-tl-sm rounded-tr-sm">
                    <div className="grid grid-cols-12 gap-2 pt-1">
                      <div className="col-span-6 px-2 flex">
                        <span className="mt-2 mr-2">
                          <img src="/icons/oms.png" className="w-6 h-4" />
                        </span>
                        <span className="text-white text-sm mt-[6px]">{lotto.lotto_type.lotto_type_name}</span>
                      </div>
                      <div className="col-span-6 text-right px-2">
                        <span className="text-white text-xs">{dayjs(lotto.close_time).format("HH:mm")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-white h-24 rounded-bl-sm rounded-br-sm p-2">
                    <div className="text-center text-xl text-red-500 py-3">
                      <span>
                        <Countdown date={dayjs(lotto.close_time).toDate()} renderer={renderer} precision={2} />
                      </span>
                    </div>
                    <div className="w-full text-center">
                      <span className="text-xs text-gray-500">{dayjs(lotto.period).format("DD MMMM BBBB")}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
        <div className="grid grid-cols-12 gap-2"></div>
      </div>
    </MemberLayout>
  );
};

export default withProtectedUser(LottoList);
