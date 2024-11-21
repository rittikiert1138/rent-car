import React from "react";
import withProtectedAdmin from "@/hoc/withProtectedAdmin";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h1>Navbar</h1>
      {children}
    </>
  );
};

export default withProtectedAdmin(AdminLayout);
