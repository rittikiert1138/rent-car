import React from "react";
import Link from "next/link";

const ButtomNavbar = () => {
  return (
    <div className="w-full h-12 bg-primary fixed left-0 bottom-0">
      <div className="grid grid-cols-12 gap-0">
        <div className="col-span-2">
          <Link href="/member/home">
            <div className="px-2 pt-1 text-center cursor-pointer">
              <i className="bi bi-house text-white"></i>
              <p className="text-[10px] text-white">หน้าแรก</p>
            </div>
          </Link>
        </div>
        <div className="col-span-2">
          <div className="px-2 pt-1 text-center cursor-pointer">
            <i className="bi bi-trophy text-white"></i>
            <p className="text-[10px] text-white">ผลรางวัล</p>
          </div>
        </div>
        <div className="col-span-4">
          <div className="p-1 text-center cursor-pointer">
            <Link href="/member/lotto">
              <div className="w-full h-10 pt-1 bg-secondary rounded-sm">
                <img src="/icons/bell-light.png" className="w-5 block mx-auto" />
                <p className="text-[10px] text-white">แทงหวย</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-span-2">
          <div className="px-2 pt-1 text-center cursor-pointer">
            <i className="bi bi-file-earmark-text text-white"></i>
            <p className="text-[10px] text-white">โพยหวย</p>
          </div>
        </div>
        <div className="col-span-2">
          <Link href="/member/vip">
            <div className="px-2 pt-1 text-center cursor-pointer">
              <i className="bi bi-gem text-white"></i>
              <p className="text-[10px] text-white">วีไอพี</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ButtomNavbar;
