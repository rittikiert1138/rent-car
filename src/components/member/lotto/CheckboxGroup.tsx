import React from "react";
import classNames from "classnames";

interface CheckboxGroupProps {
  onClick?: () => void;
  label: string;
  active: boolean;
}

const CheckboxGroup = ({ onClick, label, active }: CheckboxGroupProps) => {
  return (
    <div className={classNames("w-full border text-center py-1 rounded-sm cursor-pointer", active && "bg-warning")} onClick={onClick}>
      <p className={classNames("text-xs ", active ? "bg-warning text-white" : "text-primary")}>{label}</p>
    </div>
  );
};

export default CheckboxGroup;
