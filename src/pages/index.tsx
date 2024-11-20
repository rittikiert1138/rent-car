"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.post("/api/hello");

  //     console.log("response", response.data);
  //   } catch (error) {
  //     console.log("Error ==>");
  //   }
  // };

  useEffect(() => {
    router.push("/login");
  }, []);

  // const [numberCaptcha, setNumberCaptcha] = useState("");

  // const handleRandom = () => {
  //   let rendomNumber = Math.floor(1000 + Math.random() * 9000);
  //   setNumberCaptcha(rendomNumber.toString());
  // };

  return <div className="flex"></div>;
}
