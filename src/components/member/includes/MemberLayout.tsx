import React from "react";
import Link from "next/link";
import ButtonNavbar from "./ButtomNavbar";
import TopNav from "./TopNav";
import { useMember } from "@/context/MemberContext";

const MemberLayout = ({ children, title = "แทงหวย", display = true }: Readonly<{ children: React.ReactNode; title?: string; display?: boolean }>) => {
  const { member } = useMember();
  return (
    <div className="pt-14 pb-14">
      {member ? <TopNav /> : <></>}
      {display ? (
        <div className="flex px-2">
          <Link href="/member">
            <div className="w-[40px] h-7 bg-white mr-[4px] text-center rounded-lg pt-[1px]">
              <i className="bi bi-house text-primary"></i>
            </div>
          </Link>
          <div className="w-[calc(100%-40px)] h-7 bg-white text-center rounded-lg">
            <span className="text-primary text-sm">{title}</span>
          </div>
        </div>
      ) : (
        <></>
      )}
      {children}
      {member ? <ButtonNavbar /> : <></>}
    </div>
  );
};

export default MemberLayout;
