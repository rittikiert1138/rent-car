import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface betSectionProps {
  betList: Array<string | number> | any;
  setSection: (_type: number) => void;
}

const BetResult = (props: betSectionProps) => {
  const { betList, setSection } = props;

  return (
    <div className="container px-2 ">
      <div className="flex text-primary ">
        <div className="flex cursor-pointer" onClick={() => setSection(1)}>
          <i className="bi bi-arrow-left-circle text-xl mr-2"></i>
          <span className="mt-[2px]">ย้อนกลับ</span>
        </div>
      </div>
      <div className="w-full bg-white rounded-sm p-2 mt-2">
        <div className="text-center">
          <p className="text-primary">หวยออมสิน</p>
          <p className="text-xs text-gray-500">เลขที่รายการแทง 3124441125</p>
        </div>
        <div className="grid grid-cols-12 gap-0">
          <div className="col-span-6">
            <div className="h-16 border-r text-center pt-2">
              <p className="text-xs text-gray-500">แทงรวม</p>
              <p className="text-xl text-primary">150</p>
            </div>
          </div>
          <div className="col-span-6">
            <div className="h-16 border-r text-center pt-2">
              <p className="text-xs text-gray-500">ผลชนะทั้งสิ้น</p>
              <p className="text-xl text-primary">0</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-2 mt-2">
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
      </div>

      <div className="w-full">
        <div className="w-full bg-red-100 h-7 mt-2 rounded-tl-sm rounded-tr-sm px-2">
          <span className="text-red-500 text-xs -mt-[10px]">ลำดับที่ 1 : หวยออมสิน</span>
        </div>
        <div className="w-full bg-white px-2 rounded-bl-sm rounded-br-sm pb-2">
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-3">
              <div className="text-center border-r mt-2">
                <p className="text-xs text-gray-500">เลขที่ซื้อ</p>
                <h3 className="text-primary text-[24px]">32</h3>
                <p className="text-xs text-gray-500">2 ตัวบน</p>
              </div>
            </div>
            <div className="col-span-9">
              <div className="grid grid-cols-12 gap-0 mt-2 ">
                <div className="col-span-4 text-center">
                  <p className="text-xs text-gray-500">เดิมพัน</p>
                  <p className="text-primary">50</p>
                </div>
                <div className="col-span-4 text-center">
                  <p className="text-xs text-gray-500">จ่าย</p>
                  <p className="text-primary">50</p>
                </div>
                <div className="col-span-4 text-center">
                  <p className="text-xs text-gray-500">เลขที่ออก</p>
                  <p className="text-primary">50</p>
                </div>
                <div className="col-span-12 text-center px-2">
                  <div className="w-full h-6 bg-gray-200 pt-1 rounded-sm">
                    <p className="text-xs text-gray-500">
                      ผลได้เสีย <span>0</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetResult;
