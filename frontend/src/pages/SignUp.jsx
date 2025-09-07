import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    <div>
      <form onSubmit={signUpHandler}>
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
          />
        </div>
        {/* for confirm password*/}
        <div>
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            name="confirmPassword"
            id="confirmPassword"
            type="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        {/* sign up button */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
