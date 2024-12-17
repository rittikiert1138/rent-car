import React, { useEffect, useState } from "react";
import MemberLayout from "@/components/member/includes/MemberLayout";
import withProtectedMember from "@/hoc/withProtectedMember";
import Link from "next/link";
import { api } from "@/utils/api";
import { useMember } from "@/context/MemberContext";

const RequestPage = () => {
  const { member } = useMember();

  const [requestList, setRequestList] = useState([]);

  const fetchRequestList = async () => {
    const response = await api.post("/api/member/request/list", {
      member_id: member?.member_id,
    });
    setRequestList(response.data.requests);
  };

  useEffect(() => {
    if (member) {
      fetchRequestList();
    }
  }, [member]);
  console.log("requestList ==>", requestList);

  return (
    <MemberLayout title="คำขอรับเงิน">
      <div className="container px-2">
        <div className="grid grid-cols-12 gap-2 mt-2">
          <div className="col-span-6">
            <Link href="/member/deposit">
              <div className="w-full bg-primary px-2 rounded-bl-sm rounded-br-sm pb-2 h-12 rounded-sm pt-2 text-center">
                <span className="text-white text-sm">ฝาก</span>
              </div>
            </Link>
          </div>
          <div className="col-span-6">
            <Link href="/member/witdraw">
              <div className="w-full bg-primary px-2 rounded-bl-sm rounded-br-sm pb-2 h-12 rounded-sm pt-2 text-center">
                <span className="text-white text-sm">ถอน</span>
              </div>
            </Link>
          </div>
        </div>
        {requestList.length > 0 ? (
          <div className="w-full pt-2 bg-white mt-2 rounded-sm text-center">
            {requestList.map((item: any) => (
              <div key={item.transaction_id}>{item.transaction_id}</div>
            ))}
          </div>
        ) : (
          <div className="w-full py-12 bg-white mt-2 rounded-sm text-center">
            <div className="-mt-[20px]">
              <i className="bi bi-piggy-bank text-primary text-[80px]"></i>
            </div>
            <div className="-mt-[20px]">
              <span className="text-primary ">ยังไม่มีรายการ</span>
            </div>
          </div>
        )}
      </div>
    </MemberLayout>
  );
};

export default withProtectedMember(RequestPage);
