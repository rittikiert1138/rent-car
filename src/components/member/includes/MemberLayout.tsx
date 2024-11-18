import React from "react";
import ButtonNavbar from "./ButtomNavbar";
import TopNav from "./TopNav";

const MemberLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="pt-14 pb-14">
      <TopNav />
      {children}
      <ButtonNavbar />
    </div>
  );
};

export default MemberLayout;
