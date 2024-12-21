import React from "react";

const CreateModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-[100vh] bg-black/20 fixed top-0 left-0 z-[900]">
      <div className="w-full h-full  relative">
        <div className="absolute -translate-y-1/2 -translate-x-1/2  top-1/2 md:left-[58%] left-[50%] bg-white md:w-[60%] w-[calc(100%-16px)] rounded-lg md:p-8 p-4">{children}</div>
      </div>
    </div>
  );
};

export default CreateModal;
