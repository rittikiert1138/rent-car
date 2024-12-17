"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";

export default function Home() {
  const router = useRouter();

  const fetchUserMaster = async () => {
    try {
      const response = await api.get("/api/member/master");
      const { master, status } = response.data;
      if (status) {
        router.push(`${master?.user_path}/login`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserMaster();
    // router.push("/login");
  }, []);

  return <div className="flex"></div>;
}
