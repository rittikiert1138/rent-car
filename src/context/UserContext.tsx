import React, { createContext, useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";

type User = {
  admin: string;
};

const UserContext = createContext<User>({} as User);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState("");

  return <UserContext.Provider value={{ admin }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
