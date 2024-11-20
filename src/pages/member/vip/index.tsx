import React from "react";
import MemberLayout from "@/components/member/includes/MemberLayout";

const VipPage = () => {
  return (
    <MemberLayout>
      <div className="container px-2">
        <div className="w-full px-2 py-4 bg-white rounded-md text-center">
          <p className="">ระดับปัจจุบัน</p>
          <div className="lg:w-2/4 mx-auto h-14 bg-primary rounded-md mt-2 pt-3">
            <p className="text-white text-xl">VIP 4</p>
          </div>
          <small>ยอดแทงสะสมทั้งหมดของคุณ</small>
          <p className="text-primary text-xl">52,333</p>
          <span className="text-[12px]">แถบแสดงยอดแทงเริ่มนับจาก VIP ปัจจุบัน</span>
          <div className="w-full h-4 bg-gray-200 rounded-md mt-2 mx-auto">
            <div className="w-3/4 h-full bg-primary rounded-md"></div>
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
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div className="w-full mt-2 flex border-t " key={`vip_${item}`}>
              <div className="w-[20%] pt-1">
                <span className="text-primary">VIP {item}</span>
              </div>
              <div className="w-[60%]">
                <p className="text-[12px]">10000/100000</p>
                <div className="w-full h-2 bg-gray-200 rounded-md mx-auto">
                  <div className="w-3/4 h-full bg-primary rounded-md"></div>
                </div>
              </div>
              <div className="w-[20%] pt-1">
                <span className="text-xs">40000</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MemberLayout>
  );
};

export default VipPage;
