import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const email = useSelector((state) => state.auth.email);

  const [reload, setReload] = useState("");

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/logout`, {
        withCredentials: true,
      });
      setReload((prev) => !prev);
    } catch (err) {
      if (err.response) {
        console.log(err.response);
      }
      console.log("something went wrong");
    }
  };

  const signUpHandler = () => {
    navigate("/signup");
  };

  const loginHandler = async () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-between bg-slate-500 text-white px-10">
      <Link to={"/"}>Glory</Link>
      <div className="gap-4 flex">
        <button onClick={email ? logOutHandler : loginHandler}>
          {email ? "logout" : "login"}
        </button>
        <button onClick={signUpHandler}>{email ? "" : "signup"}</button>
      </div>
    </div>
  );
};
