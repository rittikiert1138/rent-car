"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import classNames from "classnames";
import { Button } from "../../ui/button";
import { useMember } from "@/context/MemberContext";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { jwtVerify } from "jose";

const TopNav = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const wrapperRef = useRef(null);
  const { logout, member } = useMember();
  const [balance, setBalance] = useState<any>(null);

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setToggle(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideAlerter(wrapperRef);

  const refresh = async () => {
    console.log("refresh");
    try {
      const secret: any = process.env.NEXT_PUBLIC_JWT_SECRET_FRONTEND;
      const secretKey = Buffer.from(secret, "utf8");

      const payloadData = {
        member_id: member.member_id,
      };
      const response = await api.post("/api/member/auth/refresh", payloadData);
      const { token } = response.data;
      localStorage.setItem("token", token);

      const { payload } = await jwtVerify(token, secretKey as any);
      setBalance(payload.balance);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    setBalance(member.balance);
  }, []);

  return (
    <>
      {member ? (
        <>
          <div className="w-full h-12 bg-primary fixed left-0 top-0 z-10">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-2">
                <div className="pt-2">
                  {/* <Link href="/member/home">
                <img src="/images/Logo.png" className="w-[100px] block mt-1" />
              </Link> */}
                </div>
              </div>
              <div className="col-span-10">
                <div className="flex justify-end">
                  <div className="w-auto h-8 mx-1 bg-white cursor-pointer flex mt-2 rounded-sm pl-2">
                    <div className="pt-1">{balance}</div>
                    <div className="w-8 h-8 cursor-pointer pt-[4px] text-center" onClick={() => refresh()}>
                      <i className="bi bi-arrow-clockwise"></i>
                    </div>
                  </div>
                  <div className="w-12 h-12 mx-1 pt-[10px] cursor-pointer text-center ">
                    <i className="bi bi-envelope-paper text-xl text-white"></i>
                  </div>
                  <div className="w-12 h-12 mx-1 pt-[10px] cursor-pointer  text-center">
                    <i className="bi bi-bell text-xl text-white"></i>
                  </div>
                  {toggle ? (
                    <div className={classNames(`w-12 h-12 ml-2 pl-2 cursor-pointer`, toggle ? `bg-white` : "")} onClick={() => setToggle(false)}>
                      <i className="bi bi-x text-[30px] text-primary"></i>
                    </div>
                  ) : (
                    <div className={classNames(`w-12 h-12 ml-1 cursor-pointer pt-[2px]`, toggle ? `bg-white` : "")} onClick={() => setToggle(true)}>
                      <i className="bi bi-list text-[30px] text-white"></i>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div ref={wrapperRef} className={classNames(`w-[240px] h-[100vh] bg-white fixed top-12  transition-all z-10 p-2`, toggle ? `right-0` : `right-[-240px]`)}>
            <div className="w-full h-14 border border-primary rounded-sm px-1 relative">
              <p>slottey1138</p>
              <p>
                <span className="text-primary">$</span> 24.31
              </p>
            </div>
            <div className="mt-2">
              <ul className="text-sm">
                <li className="border-b py-2 cursor-pointer hover:text-primary transition-all">รายงานเครดิต</li>
                <li className="border-b py-2 cursor-pointer hover:text-primary transition-all">ระบบแนะนำ</li>
                <li className="border-b py-2 cursor-pointer hover:text-primary transition-all">สมาชิกระดับ VIP</li>
                <li className="border-b py-2 cursor-pointer hover:text-primary transition-all">สร้างเลขชุด</li>
                <li className="border-b py-2 cursor-pointer hover:text-primary transition-all">บัญชีธนาคาร</li>
                <li className="border-b py-2 cursor-pointer hover:text-primary transition-all">เปลี่ยนรหัสผ่าน</li>
                <li className="border-b py-2 cursor-pointer hover:text-primary transition-all">กล่องจดหมาย</li>
              </ul>
            </div>
            <div className="mt-4">
              <Button className="w-full bg-secondary" onClick={logout}>
                ออกจากระบบ
              </Button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default TopNav;
