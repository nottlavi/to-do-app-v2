import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearEmail } from "../slices/authSlice";

export const NavBar = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector((state) => state.auth.email);

  const [reload, setReload] = useState("");

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/logout`, {
        withCredentials: true,
      });
      dispatch(clearEmail());
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

  useEffect(() => {});

  return (
    <div className="flex justify-between bg-slate-500 text-white px-10 h-14 items-center bg-opacity-50">
      <Link to={"/"} className="text-4xl tracking-wider">
        glory
      </Link>
      <div className="gap-4 flex">
        {email ? (
          <div>
            <button onClick={logOutHandler}>logout</button>
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
