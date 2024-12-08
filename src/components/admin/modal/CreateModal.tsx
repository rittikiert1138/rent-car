import React from "react";

const CreateModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-[100vh] bg-black/20 fixed top-0 left-0 z-[900]">
      <div className="w-full h-full  relative">
        <div className="absolute -translate-y-1/2 -translate-x-1/2  top-1/2 left-[58%] bg-white w-[60%] rounded-lg p-8">{children}</div>
      </div>
    </div>
  );
};

export default CreateModal;
