import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmail as setAuthEmail } from "../slices/authSlice";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/user/signup", {
        firstName,
        lastName,
        password,
        email,
        confirmPassword,
      });
      if (res) {
        console.log(res.data);
        dispatch(setAuthEmail(email));
        navigate("/verify-email");
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
      <form onSubmit={signUpHandler}>
        <div className="flex flex-col gap-3 text-gray-400 text-2xl items-left ">
          {/* for first name */}
          <div>
            <label htmlFor="firstName">First Name: </label>
            <input
              name="firstName"
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="bg-slate-500 rounded-lg px-2  focus:outline-none focus:ring-0"
            />
          </div>
          {/* for last name */}
          <div>
            <label htmlFor="lastName">Last Name: </label>
            <input
              name="lastName"
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="bg-slate-500 rounded-lg  px-2  focus:outline-none focus:ring-0"
            />
          </div>
          {/* for password */}
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
              className="bg-slate-500 rounded-lg  px-2  focus:outline-none focus:ring-0"
            />
          </div>
          {/* for email*/}
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
              className="bg-slate-500 rounded-lg  px-2  focus:outline-none focus:ring-0"
            />
          </div>
          {/* for confirm password*/}
          <div>
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="bg-slate-500 rounded-lg  px-2  focus:outline-none focus:ring-0"
            />
          </div>
          {/* sign up button */}
          <button type="submit" className="bg-slate-500 px-6 py-2 rounded-2xl">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
