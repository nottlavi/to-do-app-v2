import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "../pages/Spinner";

export const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        BASE_URL + "/user/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      toast.success("user logged in");

      if (res) {
        console.log(res);
        dispatch(setToken(res.data.token));
        navigate("/");
      }
      setLoading(false);
    } catch (err) {
      if (err.response) {
        setLoading(false);
        console.log(err.response);
        toast.error(err.response.data.message);
      } else {
        console.log("something went wrong");
      }
    }
  };

  return (
    <div className="flex mt-24 justify-center">
      <ToastContainer />

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
          <div className="flex justify-center mt-6">
            {loading ? (
              <Spinner className="flex justify-center w-full" />
            ) : (
              <button
                type="submit"
                className="bg-slate-500 px-6 py-2 rounded-2xl w-full"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
