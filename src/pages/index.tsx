"use client";
import React, { useEffect, useState } from "react";
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

  const [numberCaptcha, setNumberCaptcha] = useState("");

  const handleRandom = () => {
    let rendomNumber = Math.floor(1000 + Math.random() * 9000);
    setNumberCaptcha(rendomNumber.toString());
  };

  return (
    <div className="flex">
      <h3>{numberCaptcha}</h3>
      <br />
      {numberCaptcha.split("").map((item: any) => (
        <img src={`/number/${item}.png`} />
      ))}
      <button onClick={handleRandom}>Click</button>
    </div>
  );
}
