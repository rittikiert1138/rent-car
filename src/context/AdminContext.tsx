import React, { createContext, useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";

type User = {
  admin: string;
};

const AdminContext = createContext<User>({} as User);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState("");

  return <AdminContext.Provider value={{ admin }}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => useContext(AdminContext);
