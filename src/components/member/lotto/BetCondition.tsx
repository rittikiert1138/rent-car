import React from "react";

interface BetConditionProps {
  label: string;
  unit: string;
  min: number;
  max: number;
  maxPerUnit: number;
}

const BetCondition = (props: BetConditionProps) => {
  const { label, unit, min, max, maxPerUnit } = props;

  return (
    <div className="mb-2">
      <div className="flex">
        <div className="w-[calc(100%-100px)] h-7 bg-primary text-white px-2 rounded-tl-sm rounded-bl-sm">{label}</div>
        <div className="w-[100px] h-7 bg-secondary text-center text-white rounded-tr-sm rounded-br-sm">{unit}</div>
      </div>
      <div className="grid grid-cols-12 gap-1 mt-2">
        <div className="col-span-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">ขั้นต่ำต่อครั้ง</p>
            <p className="text-primary">{min}</p>
          </div>
        </div>
        <div className="col-span-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">สูงสุดต่อครั้ง</p>
            <p className="text-primary">{max}</p>
          </div>
        </div>
        <div className="col-span-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">สูงสุดต่อเลข</p>
            <p className="text-primary">{maxPerUnit}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetCondition;
