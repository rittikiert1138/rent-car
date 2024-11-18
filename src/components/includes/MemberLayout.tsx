import React from "react";
import ButtonNavbar from "./ButtomNavbar";
import TopNav from "./TopNav";

const MemberLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <TopNav />
      {children}
      <ButtonNavbar />
    </>
  );
};

export default MemberLayout;
