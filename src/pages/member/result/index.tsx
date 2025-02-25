import React, { useState } from "react";
import MemberLayout from "@/components/member/includes/MemberLayout";
import withProtectedMember from "@/hoc/withProtectedMember";
import DatePicker from "react-datepicker";
import LottoResult from "@/components/member/lotto/result/LottoResult";
import dayjs from "dayjs";

import "react-datepicker/dist/react-datepicker.css";

const ResultLotto = () => {
  const [date, setDate] = useState<Date | any>(new Date());

  const minDate = new Date(date);
  minDate.setDate(date.getDate() - 7);

  const handlePrev = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    setDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    setDate(newDate);
  };

  return (
    <MemberLayout title="ผลรางวัล">
      <div className="sm:container px-2 pb-20 mt-2">
        <div className="mb-2 flex">
          <button className="w-[46px] h-10 bg-primary rounded-tl rounded-bl text-center text-white cursor-pointer" onClick={handlePrev}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <DatePicker selected={date} minDate={minDate} maxDate={new Date()} onChange={(date: any) => setDate(new Date(date))} timeInputLabel="Time:" dateFormat="MM-dd-yyyy" className="cursor-pointer text-center w-full h-10 border px-2 focus:outline-none focus:border-primary" />
          <button className="w-[46px] h-10 bg-primary rounded-br rounded-tr text-center text-white cursor-pointer" onClick={handleNext}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>

        <LottoResult />
      </div>
    </MemberLayout>
  );
};

export default withProtectedMember(ResultLotto);
