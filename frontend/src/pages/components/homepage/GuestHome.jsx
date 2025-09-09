import React from "react";
import { useNavigate } from "react-router-dom";

export const GuestHome = () => {
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/signup");
  };

  return (
    <div>
      Hello Guest... Start Adding Tasks
      <input placeholder="add task" onClick={loginHandler} />
    </div>
  );
};
