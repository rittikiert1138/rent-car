import React, { createContext, useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";

type User = {
  user: string;
};

const UserContext = createContext<User>({} as User);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setAdmin] = useState("");

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
