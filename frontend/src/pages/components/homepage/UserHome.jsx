import axios from "axios";
import React, { useEffect, useState } from "react";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const UserHome = () => {
  const [user, setUser] = useState(null);
  const [taskName, setTaskName] = useState("");

  const addTaskHandler = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/task/create-task`,
        { taskName },
        {
          withCredentials: true,
        }
      );
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/profile`, {
          withCredentials: true,
        });
        if (res.data.data) {
          setUser(res.data.data);
        }
      } catch (err) {
        console.log(err.response || "Something went wrong");
      }
    };
    fetchUser();
  }, []); // run once on mount

  return (
    <div>
      {user ? (
        <div>
          Hello {user.firstName}
          <div>
            get back to it!!!
            <div>
              {user.tasks?.map((task, idx) => (
                <div key={idx}>{task.taskName || JSON.stringify(task)}</div>
              ))}
            </div>
            <label htmlFor=""></label>
            <input
              name="newTask"
              id="newTask"
              type="text"
              value={taskName}
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
            />
            <button onClick={addTaskHandler}>add new task!</button>
          </div>
        </div>
      ) : (
        <div>Something went wrong</div>
      )}
    </div>
  );
};
