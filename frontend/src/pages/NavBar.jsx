import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearEmail, clearToken } from "../slices/authSlice";

export const NavBar = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/logout`, {
        withCredentials: true,
      });
      dispatch(clearToken());
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
    console.log("printing token here:");
    navigate("/login");
  };

  return (
    <div className="flex justify-between bg-slate-500 text-white px-10 h-14 items-center bg-opacity-50">
      <Link to={"/"} className="text-4xl tracking-wider font-cursive">
        glory
      </Link>
      <div className="gap-4 flex">
        {token ? (
          <div>
            <button
              className="bg-slate-500 px-6 py-2 rounded-2xl"
              onClick={logOutHandler}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              className="bg-slate-500 px-6 py-2 rounded-2xl"
              onClick={loginHandler}
            >
              login
            </button>
            <button
              className="bg-slate-500 px-6 py-2 rounded-2xl"
              onClick={signUpHandler}
            >
              sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
