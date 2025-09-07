import axios from "axios";
import React, { useState } from "react";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const VerifyEmail = () => {
  const [OTP, setOTP] = useState("");

  const verificationHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/user/verify-email", { OTP });
      if (res) {
        console.log(res.data);
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response);
      } else {
        console.log("something went wrong");
      }
    }
  };

  const resendHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/user/resend-otp", { email });
      if (res) {
        console.log(res);
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
    <div>
      <form onSubmit={verificationHandler}>
        <div>
          <label htmlFor="OTP">OTP:</label>
          <input
            id="OTP"
            name="OTP"
            value={OTP}
            onChange={(e) => {
              setOTP(e.target.value);
            }}
          />
        </div>
        <button type="submit">Verify Email</button>
      </form>
      <button onClick={resendHandler}>resend otp</button>
    </div>
  );
};
