import React from "react";
import Link from "next/link";
import withProtectedUser from "@/hoc/withProtectedMember";
import MemberLayout from "@/components/member/includes/MemberLayout";

const LottoList = () => {
  return (
    <MemberLayout title="แทงหวย">
      <div className="container px-2 ">
        <h3>หวยเด่นประจำวัน</h3>
        <div className="grid grid-cols-12 gap-2 mb-2">
          <div className="col-span-12 lg:col-span-6">
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
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Link href="/member/lotto/1">
              <div className="w-full h-10 bg-primary rounded-tl-sm rounded-tr-sm">
                <div className="grid grid-cols-12 gap-2 pt-1">
                  <div className="col-span-6 px-2 flex">
                    <span className="mt-2 mr-2">
                      <img src="/icons/oms.png" className="w-6 h-4" />
                    </span>
                    <span className="text-white text-sm mt-[6px]">หวยออมสิน</span>
                  </div>
                  <div className="col-span-6 text-right px-2">
                    <span className="text-white text-xs">90 รอบ</span>
                  </div>
                </div>
              </div>

              <div className="w-full bg-white h-24 rounded-bl-sm rounded-br-sm p-2">
                <div className="text-center text-xl text-red-500 py-3">
                  <span>เปิดรับ 24 ชม</span>
                </div>
                <div className="w-full text-center">
                  <span className="text-xs text-gray-500">20 พฤศจิกายน 2024</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2"></div>
      </div>
    </MemberLayout>
  );
};

export default withProtectedUser(LottoList);
