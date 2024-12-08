import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { alertError } from "@/utils/alert";
import toast, { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

type User = {
  member: any;
  logout: () => void;
  login: (params: FormValues) => void;
  setMember: any;
  balance: number;
  refresh: () => void;
};

type FormValues = {
  username: string;
  password: string;
};

const MemberContext = createContext<User>({} as User);

export const MemberProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [member, setMember] = useState<any>();
  const [balance, setBalance] = useState<number>(0);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
    window.location.reload();
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

  const refresh = async () => {
    try {
      const payloadData = {
        member_id: member?.member_id,
      };
      const response = await api.post("/api/member/auth/refresh", payloadData);
      const { balance } = response.data;
      setBalance(balance);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (member) {
      refresh();
    }
  }, [member, pathname]);

  return <MemberContext.Provider value={{ member, logout, login, setMember, balance, refresh }}>{children}</MemberContext.Provider>;
};

export const useMember = () => useContext(MemberContext);
