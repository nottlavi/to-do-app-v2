import React from "react";
import { useNavigate } from "react-router-dom";

export const GuestHome = () => {
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col gap-10 text-gray-400 text-2xl">
      Hello Guest...
      <br />
      Start Adding Tasks
      <input
        placeholder="add task"
        className="bg-slate-500  border-[0.5px] rounded-lg p-3 text-white "
        onClick={loginHandler}
      />
    </div>
  );
};
