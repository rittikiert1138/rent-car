import React, { createContext, useState, useContext } from "react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { alertError } from "@/utils/alert";

type User = {
  admin: any;
  logout: () => void;
  login: (params: FormValues) => void;
  setAdmin: any;
};

type FormValues = {
  username: string;
  password: string;
};

const AdminContext = createContext<User>({} as User);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [admin, setAdmin] = useState();

  const logout = () => {
    localStorage.removeItem("backend_token");
    router.push("/backend/console/login");
  };

  const login = async (params: FormValues) => {
    try {
      const response = await api.post("/api/backend/auth/login", params);
      if (response.data.status === false) {
        alertError(response.data.message);
      } else {
        localStorage.setItem("backend_token", response.data.token);
        router.push("/backend/console/dashboard");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return <AdminContext.Provider value={{ admin, logout, login, setAdmin }}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => useContext(AdminContext);
