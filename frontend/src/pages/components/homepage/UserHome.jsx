import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const UserHome = () => {
  const [user, setUser] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [refresh, setRefresh] = useState();
  const [dueAt, setDueAt] = useState("");

  const checkHandler = async (taskId) => {
    try {
      const res = await axios.delete(`${BASE_URL}/task/delete-task`, {
        withCredentials: true,
        data: { taskId },
      });
      setRefresh((prev) => !prev);
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

  const addTaskHandler = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/task/create-task`,
        { taskName, dueAt },
        {
          withCredentials: true,
        }
      );
      setRefresh((prev) => !prev);
      setTaskName("");
      setDueAt("");
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

  const deleteTaskHandler = async (taskId) => {
    try {
      const res = await axios.delete(`${BASE_URL}/task/delete-task`, {
        withCredentials: true,
        data: { taskId },
      });
      setRefresh((prev) => !prev);
      setTaskName("");
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
  }, [refresh]);

  return (
    <div>
      {user ? (
        <div>
          Hello {user.firstName}
          <div>
            get back to it!!!
            {/* div to list all the tasks */}
            <div>
              {user.tasks?.map((task, idx) => (
                // individual div for a single task
                <div className="flex gap-4 " key={idx}>
                  <input
                    type="radio"
                    onChange={(e) => {
                      checkHandler(task._id);
                    }}
                  />
                  <div className={Date.now() > new Date( task.dueAt).getTime() ? "text-red-700" : "text-black"}>{task.taskName || JSON.stringify(task)}</div>
                  <div>
                    {task.dueAt ? (
                      <div
                        className={Date.now() > new Date(task.dueAt).getTime() ? "text-red-700" : "text-black"}
                      >
                        {new Date(task.dueAt).toLocaleString()}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      deleteTaskHandler(task._id);
                    }}
                  >
                    <RxCross2 />
                  </button>
                </div>
              ))}
            </div>
            {/* div to add new task */}
            <div className="flex gap-6 items-center">
              <input
                name="newTask"
                id="newTask"
                type="text"
                value={taskName}
                placeholder="enter new task"
                onChange={(e) => {
                  setTaskName(e.target.value);
                }}
              />
              <div>set due date</div>
              <input
                type="datetime-local"
                value={dueAt}
                onChange={(e) => {
                  setDueAt(e.target.value);
                }}
              />
            </div>
            {/* button to add new task */}
            <button onClick={addTaskHandler}>add new task!</button>
          </div>
        </div>
      ) : (
        <div>Something went wrong</div>
      )}
    </div>
  );
};
