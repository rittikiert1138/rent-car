import React from "react";
import { useAdmin } from "@/context/AdminContext";

const AdminpageLogin = () => {
  const { admin } = useAdmin();

  console.log("adminContext", admin);

  return <>AdminpageLogin {admin}</>;
};

export default AdminpageLogin;
