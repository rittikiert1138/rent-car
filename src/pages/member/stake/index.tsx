import React from "react";
import Link from "next/link";
import MemberLayout from "@/components/member/includes/MemberLayout";

const StakePage = () => {
  return (
    <MemberLayout title="โพยหวย">
      <div className="container px-2">
        <Link href={`/member/stake/1`}>
          <div className="w-full">
            <div className="w-full bg-red-100 h-9 mt-2 rounded-tl-sm rounded-tr-sm px-2 pt-1">
              <div className="grid grid-cols-12 gap-0">
                <div className="col-span-6">
                  <span className="text-gray-500 text-xs -mt-[10px] mr-1"># เลขที่รายการ</span>
                  <span className="text-red-500 text-xs -mt-[10px]">3124441125</span>
                </div>
                <div className="col-span-6">
                  <div className="text-right">
                    <span className="border border-red-500 text-xs px-1 rounded-lg font-bold text-red-500">ไม่ถูกรางวัล</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-white px-2 rounded-bl-sm rounded-br-sm pb-2">
              <div className="grid grid-cols-12 gap-0 py-2">
                <div className="col-span-6">
                  <div className="w-full h-10 border-r">
                    <h4 className="text-primary">หวยออมสิน</h4>
                    <p className="text-xs text-gray-500">20 พ.ย. 2024</p>
                  </div>
                </div>
                <div className="col-span-6 px-2">
                  <div className="grid grid-cols-12 gap-0">
                    <div className="col-span-6">
                      <p className="text-sm text-gray-500 mt-1">เดิมพัน</p>
                    </div>
                    <div className="col-span-6 text-right">
                      <p className="text-primary">50</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-0">
                    <div className="col-span-6">
                      <p className="text-sm text-gray-500 mt-1">ผลได้เสีย</p>
                    </div>
                    <div className="col-span-6 text-right">
                      <p className="text-primary">0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </MemberLayout>
  );
};

export default StakePage;
