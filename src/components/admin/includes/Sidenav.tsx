import React, { useState } from "react";
import classNames from "classnames";
import Link from "next/link";

const Sidenav = () => {
  const [active, setActive] = useState(0);

  const menus = [
    {
      id: 1,
      name: "Home",
      icon: <i className="bi bi-house mr-2 text-aprimary text-xl"></i>,
      list: [
        {
          id: 1,
          name: "Banner",
          path: "/backend/console/user",
        },
        {
          id: 2,
          name: "Themes",
          path: "/backend/console/user",
        },
      ],
    },
    {
      id: 2,
      name: "User",
      icon: <i className="bi bi-people mr-2 text-aprimary text-xl"></i>,
      list: [
        {
          id: 1,
          name: "List",
          path: "/backend/console/user",
        },
        {
          id: 2,
          name: "Member",
          path: "/backend/console/member",
        },
        {
          id: 2,
          name: "Delete",
          path: "/backend/console/user",
        },
      ],
    },
    {
      id: 3,
      name: "Lotto",
      icon: <i className="bi bi-copy mr-2 text-aprimary text-xl"></i>,
      list: [
        {
          id: 1,
          name: "Lotto",
          path: "/backend/console/lotto",
        },
        {
          id: 2,
          name: "Lotto Type",
          path: "/backend/console/lotto-type",
        },
      ],
    },
    {
      id: 4,
      name: "ธุรกรรม",
      icon: <i className="bi bi-bank mr-2 text-aprimary text-xl"></i>,
      list: [
        {
          id: 1,
          name: "ฝาก",
          path: "/backend/console/transaction/deposit",
        },
        {
          id: 2,
          name: "ถอน",
          path: "/backend/console/transaction/withdraw",
        },
        {
          id: 3,
          name: "ธนาคาร",
          path: "/backend/console/bank",
        },
      ],
    },
  ];

  return (
    <div className="w-[300px] h-[100vh] bg-white  fixed top-0 left-0 z-20 shadow-sm">
      <div className="w-full h-[70px]  pt-3">
        <img src="/images/Head-logo.png" className="h-10 block mx-auto " />
      </div>
      <div className="px-3">
        <ul>
          {menus.map((menu, indexMenu) => (
            <li key={`main_${indexMenu}`} className={classNames("cursor-pointer w-full min-h-10  ease-in-out duration-500 px-2 mb-2 ", active === menu.id ? "h-auto overflow-auto" : "h-10 overflow-hidden")} onClick={() => (active === menu.id ? setActive(0) : setActive(menu.id))}>
              <div className="w-full h-10 pt-1 relative flex hover:pl-1 transition-all duration-300">
                {menu.icon}
                <span className="font-semibold text-gray-600 mt-[2px]">{menu.name}</span>
                <div className={classNames("absolute right-0 top-2 transition-all duration-300", active === menu.id && "rotate-90")}>
                  <i className="bi bi-chevron-right text-aprimary"></i>
                </div>
              </div>
              {menu.list.length > 0 ? (
                <ul key={`sub_${menu.id}`} className={classNames("overflow-hidden pt-2 pb-1 pl-4", active === menu.id ? "h-auto" : "h-0")}>
                  {menu.list.map((list, indexList) => (
                    <Link href={list.path} key={`sub_${indexList}`}>
                      <li key={`sub_${indexList}`} className="h-9 pl-3 hover:pl-4 transition-all duration-300 pt-[5px] flex hover:bg-aprimary/20 rounded-lg">
                        <i className="bi bi-circle-fill text-[6px] text-aprimary mt-[8px]"></i>
                        <span className="ml-2 text-gray-600">{list.name}</span>
                      </li>
                    </Link>
                  ))}
                </ul>
              ) : (
                <></>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidenav;
