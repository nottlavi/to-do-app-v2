import React, { useState } from "react";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/user/login", {
        email,
        password,
      });
      if (res) {
        console.log(res);
      }
    } catch (err) {
      console.log("error says hi from frontend");
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
