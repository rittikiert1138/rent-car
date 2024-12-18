"use client";
import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";

export default function Home() {
  // const router = useRouter();

  const test = async () => {
    try {
      const res = await fetch("/api/hello", {
        method: "POST",
      });
      const response = await res.json();
      console.log("response==>", response);
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
