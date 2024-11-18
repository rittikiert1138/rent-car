"use client";
import React, { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const fetchData = async () => {
    try {
      const response = await axios.post("/api/hello");

      console.log("response", response.data);
    } catch (error) {
      console.log("Error ==>");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>Hello</div>;
}
