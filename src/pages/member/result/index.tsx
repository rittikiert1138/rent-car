import React from "react";
import MemberLayout from "@/components/member/includes/MemberLayout";
import withProtectedMember from "@/hoc/withProtectedMember";

import LottoResult from "@/components/member/lotto/result/LottoResult";

const ResultLotto = () => {
  return (
    <MemberLayout title="ผลรางวัล">
      <div className="sm:container px-2 pb-20 mt-2">
        <LottoResult />
      </div>
    </MemberLayout>
  );
};

export default withProtectedMember(ResultLotto);
