import React from "react";
import classNames from "classnames";

interface CheckboxListProps {
  unit: string;
  handleBet: (_betType: number, _unit: string, _prioce: number) => void;
  betType: number;
  betList: Array<number | string | any>;
  price: number;
}

const CheckboxList = ({ unit, handleBet, betType, betList, price }: CheckboxListProps) => {
  const checkACtive = (_betType: number, _unit: string) => {
    const getListByType = betList.filter((e) => e.unit === _unit);
    return getListByType.length > 0;
  };

  return (
    <div className={classNames("w-full border border-secondary text-center py-1 rounded-sm cursor-pointer", checkACtive(betType, unit) ? "bg-primary text-white" : "text-primary bg-white")} onClick={() => handleBet(betType, unit, price)}>
      <p className="text-xs ">{unit}</p>
    </div>
  );
};

export default CheckboxList;
