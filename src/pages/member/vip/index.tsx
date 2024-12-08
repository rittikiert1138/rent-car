import React from "react";
import MemberLayout from "@/components/member/includes/MemberLayout";
import { useMember } from "@/context/MemberContext";
import withProtectedMember from "@/hoc/withProtectedMember";
import { numberWithCommas } from "@/utils/utils";
import classNames from "classnames";

const VipPage = () => {
  const { member } = useMember();

  console.log(member);

  const vipList = [
    {
      level: 1,
      bet: 10000,
      bonus: 100,
    },
    {
      level: 2,
      bet: 50000,
      bonus: 400,
    },
    {
      level: 3,
      bet: 100000,
      bonus: 500,
    },
    {
      level: 4,
      bet: 1000000,
      bonus: 900,
    },
    {
      level: 5,
      bet: 5000000,
      bonus: 40000,
    },
    {
      level: 6,
      bet: 10000000,
      bonus: 50000,
    },
  ];

  const calculatePercentage = (_tota_bet: number, _bet_count: number) => {
    let percentage = (_tota_bet * 100) / _bet_count;

    return percentage;
  };

  return (
    <MemberLayout>
      <div className="container px-2">
        <div className="w-full px-2 py-4 bg-white rounded-md text-center">
          <p className="">ระดับปัจจุบัน</p>
          <div className="lg:w-2/4 mx-auto h-14 bg-primary rounded-md mt-2 pt-3">
            <p className="text-white text-xl">VIP 4</p>
          </div>
          <small>ยอดแทงสะสมทั้งหมดของคุณ</small>
          <p className="text-primary text-xl">{member?.total_bet}</p>
          <span className="text-[12px]">แถบแสดงยอดแทงเริ่มนับจาก VIP ปัจจุบัน</span>
          <div className="w-full h-4 bg-gray-200 rounded-md mt-2 mx-auto">
            <div className={classNames("h-full bg-primary rounded-md", `w-[${calculatePercentage(360, 10000)}%]`)}></div>
          </div>
          <small>ระดับต่อไปของคุณคือ VIP 3 เมื่อยอดแทงสะสมเพิ่มขึ้น</small>
          <p className="text-primary text-xl">100,000</p>
        </div>
        <div className="w-full p-2 pb-4 bg-white rounded-md text-center mt-2">
          <div className="w-full px-2 py-4 bg-purple-300 rounded-sm mb-4">
            <p className="text-white">
              ระดับ VIP จะเลื่อนตามยอดแทงสะสม
              <br />
              รับเครดิตจากเรา โดยการกดปุ่มรับโบนัสด้านล่าง
            </p>
          </div>
          {vipList.map((item, index) => (
            <div className="w-full mt-2 flex border-t " key={`vip_${index}`}>
              <div className="w-[20%] pt-1">
                <span className="text-primary">VIP {item.level}</span>
              </div>
              <div className="w-[60%]">
                <p className="text-[12px]">
                  {member?.total_bet < item.bet ? member?.total_bet : item.bet}/{numberWithCommas(item.bet)}
                </p>
                <div className="w-full h-2 bg-gray-200 rounded-md mx-auto">
                  <div className={classNames("h-full bg-primary rounded-md", `w-[${calculatePercentage(member?.total_bet, item.bet) < 1 ? "50" : "0"}%]`)}></div>
                </div>
              </div>
              <div className="w-[20%] pt-1">
                <span className="text-xs">{item.bonus}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MemberLayout>
  );
};

export default withProtectedMember(VipPage);
