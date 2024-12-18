"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";

export default function Home() {
  // const router = useRouter();

  const test = async () => {
    try {
      const res = await api.get("/api/hello");

      console.log("res", res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    test();
  }, []);

  // useEffect(() => {
  //   router.push("/login");
  // }, []);

  return <div className="flex"></div>;
}
