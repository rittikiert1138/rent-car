import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU } from "@/constants/menu";

const Sidenav = () => {
  const [active, setActive] = useState(0);
  const [toggle, setToggle] = useState(0);

  const currentPath = usePathname();

  useEffect(() => {
    for (let u = 0; u < MENU.length; u++) {
      const element = MENU[u];
      for (let m = 0; m < element.list.length; m++) {
        const menu = element.list[m];
        const _path = `${menu.path}`;
        const checkToggle = currentPath.startsWith(_path);
        const checkActive = currentPath.startsWith(_path);
        if (checkToggle) {
          setToggle(element.id);
          setActive(menu.id);
          return;
        }
      }
    }
  }, [currentPath]);

  return (
    <div className="w-[300px] h-[100vh] bg-white  fixed top-0 left-0 z-20 shadow-sm">
      <div className="w-full h-[70px]  pt-3">
        <img src="/images/Head-logo.png" className="h-10 block mx-auto " />
      </div>
      <div className="px-3">
        <ul>
          {MENU.map((menu, indexMenu) => (
            <li key={`main_${indexMenu}`} className={classNames("cursor-pointer w-full min-h-10  ease-in-out duration-500 px-2 mb-2 ", toggle === menu.id ? "h-auto overflow-auto" : "h-10 overflow-hidden")} onClick={() => (toggle === menu.id ? setToggle(0) : setToggle(menu.id))}>
              <div className="w-full h-10 pt-1 relative flex hover:pl-1 transition-all duration-300">
                {menu.icon}
                <span className="font-semibold text-gray-600 mt-[2px]">{menu.name}</span>
                <div className={classNames("absolute right-0 top-2 transition-all duration-300", toggle === menu.id && "rotate-90")}>
                  <i className="bi bi-chevron-right text-aprimary"></i>
                </div>
              </div>
              {menu.list.length > 0 ? (
                <ul key={`sub_${menu.id}`} className={classNames("overflow-hidden pt-2 pb-1 pl-4", toggle === menu.id ? "h-auto" : "h-0")}>
                  {menu.list.map((list, indexList) => (
                    <Link href={list.path} key={`sub_${indexList}`}>
                      <li key={`sub_${indexList}`} className={classNames("h-9 pl-3 hover:pl-4 mb-1 transition-all duration-300 pt-[5px] flex hover:bg-aprimary/20 rounded-lg", active === list.id && "bg-aprimary/20")}>
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
