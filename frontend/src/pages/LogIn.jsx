import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/user/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (res) {
        console.log(res);
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response);
      } else {
        console.log("something went wrong");
      }
    }
  };

  return (
    <div className="flex mt-24 justify-center">
      <form onSubmit={handleLogIn}>
        <div className="flex flex-col gap-3 text-gray-400 text-2xl items-left">
          <div>
            <label htmlFor="email">Email: </label>
            <input
              name="email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-slate-500 rounded-lg  px-2   focus:outline-none focus:ring-0"
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              name="password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="bg-slate-500 rounded-lg  px-2   focus:outline-none focus:ring-0"
            />
          </div>
          <button type="submit" className="bg-slate-500 px-6 py-2 rounded-2xl">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};
