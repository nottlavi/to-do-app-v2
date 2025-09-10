import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "../pages/Spinner";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const VerifyEmail = () => {
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //importing email here from redux
  const email = useSelector((state) => state.auth.email);

  const verificationHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/user/verify-email", {
        email,
        OTP,
      });
      if (res) {
        console.log(res.data);
        navigate("/login");
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        console.log("something went wrong");
      }
    }
  };

  const resendHandler = async (e) => {
    e.preventDefault();
    try {
      <ToastContainer />;
      const res = await axios.post(BASE_URL + "/user/resend-otp", { email });
      if (res) {
        toast.success("otp resent");
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        console.log("something went wrong");
      }
    }
  };

  return (
    <div className="flex mt-40 flex-col items-center ">
      <ToastContainer />
      <form onSubmit={verificationHandler}>
        <div className="text-gray-400 text-2xl flex flex-col gap-4 ">
          <div>
            <label htmlFor="OTP">OTP: </label>
            <input
              id="OTP"
              name="OTP"
              value={OTP}
              onChange={(e) => {
                setOTP(e.target.value);
              }}
              className="bg-slate-500 rounded-lg  px-2   focus:outline-none focus:ring-0"
            />
          </div>
          <div className="flex gap-4 items-center justify-center">
            {loading ? (
              <Spinner />
            ) : (
              <button
                type="submit"
                className="bg-slate-500 px-2 py-1 rounded-2xl "
              >
                verify email
              </button>
            )}
            {loading ? (
              <Spinner />
            ) : (
              <button
                onClick={resendHandler}
                className="bg-slate-500 px-2 py-1 rounded-2xl"
              >
                resend otp
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
