import React, { useState, useEffect } from "react";
import Link from "next/link";
import MemberLayout from "@/components/member/includes/MemberLayout";
import withProtectedMember from "@/hoc/withProtectedMember";
import { api } from "@/utils/api";
import { useMember } from "@/context/MemberContext";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import classNames from "classnames";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import { LOTTO_TYPE } from "@/constants/lotto_type";

dayjs.extend(buddhistEra);
dayjs.locale("th");

const StakePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { member } = useMember();

  const searchParams = useSearchParams();

  const listPerPage = 10;
  const [stakeList, setStakeList] = useState([]);
  const [page, setPage] = useState(0);
  const [countLottos, setCountLottos] = useState(0);

  const _type = searchParams.get("type");

  const fetchStakeList = async (skip: number, limit: number) => {
    try {
      const payload = {
        member_id: member?.member_id,
        skip: skip,
        limit: limit,
        type: _type,
      };
      const response = await api.post("/api/member/lotto/stake/list", payload);
      console.log("ss", response.data);
      setStakeList(response.data.lottos);
      setCountLottos(response.data.countLottos);
    } catch (error: any) {
      console.log("Error ==>", error?.message);
    }
  };

  useEffect(() => {
    if (member) {
      fetchStakeList(0, listPerPage);
    }
  }, [member]);

  const generateTotal = (_member_lotto_list: any) => {
    let total = 0;
    _member_lotto_list.forEach((item: any) => {
      total += item.bet_amount;
    });
    return total;
  };

  const generateResult = (_member_lotto_list: any) => {
    let total = 0;
    _member_lotto_list.forEach((item: any) => {
      total += item.bet_pay_result;
    });
    return total;
  };

  const handlePagination = (page: number) => {
    fetchStakeList(page * listPerPage, listPerPage);
    setPage(page);
  };

  const changeType = () => {
    const params = new URLSearchParams();
    params.set("type", "archive");
    router.push(`${pathname}?${params.toString()}`);
    fetchStakeList(0, listPerPage);
  };

  console.log("stakeList", stakeList);

  return (
    <MemberLayout title="โพยหวย">
      <div className="container px-2">
        <div className="grid grid-cols-12 gap-2 mt-2">
          <div className="col-span-6">
            <Link href="/member/stake">
              <div className={classNames("w-full px-2 rounded-bl-sm rounded-br-sm pb-2 rounded-sm pt-1", _type === "archive" ? "bg-white text-primary" : "bg-primary text-white")}>
                <span className=" text-sm">
                  <i className="bi bi-calendar3 mr-2"></i>โพยหวย
                </span>
              </div>
            </Link>
          </div>
          <div className="col-span-6">
            <div className={classNames("w-full px-2 rounded-bl-sm rounded-br-sm pb-2 rounded-sm pt-1", _type === "archive" ? "bg-primary text-white" : "bg-white text-primary")} onClick={changeType}>
              <span className=" text-sm">
                <i className="bi bi-clock mr-2"></i>โพยหวยย้อนหลัง
              </span>
            </div>
          </div>
        </div>
        {stakeList.length > 0 ? (
          stakeList.map((stake: any, index) => (
            <Link href={`/member/stake/${stake.member_lotto_id}`} key={index}>
              <div className="w-full">
                <div className={classNames("w-full h-9 mt-2 rounded-tl-sm rounded-tr-sm px-2 pt-1", stake.status === 1 ? "bg-red-100" : "bg-white")}>
                  <div className="grid grid-cols-12 gap-0">
                    <div className="col-span-6">
                      <span className="text-gray-500 text-xs -mt-[10px] mr-1"># เลขที่รายการ</span>
                      <span className={classNames("text-xs text-red-500")}>{stake.member_lotto_id}</span>
                    </div>
                    <div className="col-span-6">
                      <div className="text-right">{stake.status === 1 ? <span className="border border-ainfo text-xs px-2 rounded-lg font-bold text-ainfo">รับแทง</span> : generateResult(stake.member_lotto_list) <= 0 ? <span className="border border-red-500 text-xs px-1 rounded-lg font-bold text-red-500">ไม่ถูกรางวัล</span> : <span className="border border-green-500 text-xs px-1 rounded-lg font-bold text-green-500">ถูกรางวัล</span>}</div>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-white px-2 rounded-bl-sm rounded-br-sm pb-2">
                  <div className="grid grid-cols-12 gap-0 py-2">
                    <div className="col-span-6">
                      <div className="w-full h-10 border-r">
                        <h4 className="text-primary">{LOTTO_TYPE.find((e) => e.lotto_type_id === stake.lotto.lotto_type_id)?.lotto_type_name}</h4>
                        <p className="text-xs text-gray-500">{dayjs(stake.lotto.period).format("DD MMMM BBBB")}</p>
                      </div>
                    </div>
                    <div className="col-span-6 px-2">
                      <div className="grid grid-cols-12 gap-0">
                        <div className="col-span-6">
                          <p className="text-sm text-gray-500 mt-1">เดิมพัน</p>
                        </div>
                        <div className="col-span-6 text-right">
                          <p className="text-primary">{generateTotal(stake.member_lotto_list)}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-0">
                        <div className="col-span-6">
                          <p className="text-sm text-gray-500 mt-1">ผลได้เสีย</p>
                        </div>
                        <div className="col-span-6 text-right">
                          <p className="text-primary">{generateResult(stake.member_lotto_list)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center mt-2 w-full h-[200px] bg-white rounded-sm pt-12">
            <i className="bi bi-clipboard2-check text-primary text-[50px]"></i>
            <p className="text-primary">ยังไม่มีรายการ</p>
          </div>
        )}
        {countLottos > listPerPage && (
          <Pagination className="mt-2">
            <PaginationContent>
              <PaginationItem>
                <Button onClick={() => handlePagination(page - 1)} disabled={page === 0}>
                  <i className="bi bi-chevron-left"></i>
                </Button>
              </PaginationItem>
              {Array.from({ length: Math.ceil(countLottos / listPerPage) }, (_, index) => (
                <PaginationItem key={index}>
                  <Button className="w-10" onClick={() => handlePagination(index)} variant={page === index ? "default" : "outline"}>
                    {index + 1}
                  </Button>
                </PaginationItem>
              ))}
              <PaginationItem>
                <Button onClick={() => handlePagination(page + 1)} disabled={page === Math.ceil(countLottos / listPerPage) - 1}>
                  <i className="bi bi-chevron-right"></i>
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </MemberLayout>
  );
};

export default withProtectedMember(StakePage);
