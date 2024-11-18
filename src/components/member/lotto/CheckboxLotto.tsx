import React from "react";
import classNames from "classnames";

interface LottoProps {
  id: string;
  label: string;
  unit: string;
  onClick?: () => void;
  className?: string;
  active: boolean;
}

const CheckboxButton = (props: LottoProps) => {
  return (
    <div className={classNames(props.className, "w-full border rounded-sm text-center py-1 cursor-pointer", props.active ? "bg-primary text-white" : "")} onClick={props.onClick}>
      <div className={classNames("text-xs leading-3 ")}>{props.label}</div>
      <div className={classNames("text-xs leading-3  text-white rounded-md px-2 py-[2px] inline-block", props.active ? "bg-secondary" : "bg-[#dcdcdc]")}>{props.unit}</div>
    </div>
  );
};

export default CheckboxButton;
