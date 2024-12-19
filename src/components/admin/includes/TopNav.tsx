import React, { useState, useEffect, useRef } from "react";
import { useAdmin } from "@/context/AdminContext";

interface PropMain {
  toggle: boolean;
  setToggle: any;
}

const TopNav = (props: PropMain) => {
  const { admin, logout } = useAdmin();
  const [active, setActive] = useState(false);
  const wrapperRef = useRef(null);

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActive(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideAlerter(wrapperRef);

  return (
    <div className="w-full h-[70px] bg-white fixed top-0 right-0 z-10 md:pl-[300px] pl-[16px] shadow-sm">
      <div className="relative w-full h-full ">
        <div className="md:hidden block pt-3">
          <button onClick={() => props.setToggle(true)}>
            <i className="bi bi-list text-[32px] text-gray-400"></i>
          </button>
        </div>
        <div className="w-10 h-10  absolute right-4 top-4 rounded-full cursor-pointer text-center border border-aprimary" onClick={() => setActive(true)}>
          <i className="bi bi-person text-[24px] text-aprimary"></i>
        </div>
        {active && (
          <div className="w-[260px] bg-white absolute right-4 top-[60px] shadow-lg rounded-lg border" ref={wrapperRef}>
            <div className="w-full  rounded-tl rounded-tr px-4 pb-2 pt-3 border-b">
              <p className="text-semibold  text-sm font-light">{admin.username}</p>
              <h4 className="text-aprimary text-lg">{admin.role}</h4>
            </div>
            <div className="px-2 py-2">
              <div className="h-10 pt-1 cursor-pointer hover:bg-aprimary/20 rounded-lg px-2 transition-all duration-300">
                <i className="bi bi-person text-[20px] mt-1 mr-3 text-aprimary"></i>
                <span className="mt-[8px] text-gray-600">Profile</span>
              </div>
              <div className="h-10 pt-1 cursor-pointer hover:bg-aprimary/20 rounded-lg px-2 transition-all duration-300">
                <i className="bi bi-arrow-repeat text-[20px] mt-1 mr-3 text-aprimary"></i>
                <span className="mt-[8px] text-gray-600">Change Password</span>
              </div>
            </div>
            <div className="px-2 py-2 border-t">
              <div className="w-full h-10  flex text-adanger  cursor-pointer px-2 hover:bg-adanger/20 rounded-lg transition-all duration-300" onClick={logout}>
                <i className="bi bi-box-arrow-right text-[20px] mt-1 mr-3"></i>
                <span className="mt-[6px]">Logout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
