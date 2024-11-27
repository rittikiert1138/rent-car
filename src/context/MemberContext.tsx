import React, { createContext, useState, useContext } from "react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { alertError } from "@/utils/alert";
import toast, { Toaster } from "react-hot-toast";

type User = {
  member: any;
  logout: () => void;
  login: (params: FormValues) => void;
  setMember: any;
};

type FormValues = {
  username: string;
  password: string;
};

const MemberContext = createContext<User>({} as User);

export const MemberProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [member, setMember] = useState();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const login = async (params: FormValues) => {
    try {
      const response = await api.post("/api/member/auth/login", params);
      if (response.data.status === false) {
        toast.error(response.data.message);
      } else {
        localStorage.setItem("token", response.data.token);
        router.push("/member");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return <MemberContext.Provider value={{ member, logout, login, setMember }}>{children}</MemberContext.Provider>;
};

export const useMember = () => useContext(MemberContext);
