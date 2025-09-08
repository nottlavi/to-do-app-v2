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
      const res = await axios.post(BASE_URL + "/user/login", {
        email,
        password,
      }, {withCredentials: true});
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
    <div>
      <form onSubmit={handleLogIn}>
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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};
