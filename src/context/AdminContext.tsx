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
      const response = await api.post("/users/login", params);
      console.log("Login response:", response.data.tokens);
      if (response.status === 200) {
        localStorage.setItem("backend_token", response.data.tokens);
        router.push("/backend/console/dashboard");
      } else {
        alertError(response.data.error);
      }
    } catch (error) {
      alertError(error.response?.data?.error);
      console.error("Login error:", error);
    }
  };

  return <AdminContext.Provider value={{ admin, logout, login, setAdmin }}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => useContext(AdminContext);
