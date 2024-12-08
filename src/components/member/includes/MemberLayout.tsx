import React, { useEffect, useState } from "react";
import Link from "next/link";
import ButtonNavbar from "./ButtomNavbar";
import TopNav from "./TopNav";
import { useMember } from "@/context/MemberContext";
import Marquee from "react-fast-marquee";
import { api } from "@/utils/api";
import classNames from "classnames";

const MemberLayout = ({ children, title = "แทงหวย", display = true }: Readonly<{ children: React.ReactNode; title?: string; display?: boolean }>) => {
  const { member } = useMember();

  const [flashNews, setFlashNews] = useState(null);

  const getFlashNews = async () => {
    try {
      const response = await api.get(`/api/member/flash-news`);

      if (response.data.status) {
        setFlashNews(response.data.flash_news?.flash_news_content);
      }
    } catch (error) {
      console.log("error ==>", error);
    }
  };

  useEffect(() => {
    getFlashNews();
  }, []);

  return (
    <div className="pt-14 pb-14">
      {member ? <TopNav /> : <></>}
      {flashNews ? (
        <div className={classNames("container px-2 mb-2", !member ? "-mt-12" : "")}>
          <div className="w-[100%] h-7 bg-white text-center rounded-lg relative pl-8">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-primary">
              <i className="bi bi-megaphone"></i>
            </span>
            <Marquee>
              <span className="text-primary text-sm">{flashNews}</span>
            </Marquee>
          </div>
        </div>
      ) : (
        <></>
      )}
      {display ? (
        <>
          <div className="container flex px-2">
            <Link href="/member">
              <div className="w-[40px] h-7 bg-white mr-[4px] text-center rounded-lg pt-[1px]">
                <i className="bi bi-house text-primary"></i>
              </div>
            </Link>
            <div className="w-[calc(100%-40px)] h-7 bg-white text-center rounded-lg">
              <span className="text-primary text-sm">{title}</span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="relative z-10">{children}</div>
      {member ? <ButtonNavbar /> : <></>}
    </div>
  );
};

export default MemberLayout;
