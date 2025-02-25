import axios from "axios";
// import jwt from "jsonwebtoken";

// const token = jwtDecode.sign({ id: 1 }, process.env.JWT_SECRET as string);

// const SECRET_KEY: string = process.env.JWT_SECRET as string;

// const token = jwt.sign({ user_id: 1 }, "M1R3eff74wX9ghj3qCvLXVh1RfVWG7Lk");
// var token = jwt.sign({ foo: "bar" }, "M1R3eff74wX9ghj3qCvLXVh1RfVWG7Lk" as string);

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000, // Optional: Set a timeout in milliseconds
  headers: {
    // Optional: Add default headers
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
  },
});
