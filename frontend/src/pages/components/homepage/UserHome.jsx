import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const UserHome = () => {
  const [user, setUser] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [refresh, setRefresh] = useState();
  const [dueAt, setDueAt] = useState("");
  const [showDateTime, setShowDateTime] = useState(false);

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
    <div className="text-3xl text-gray-400 flex flex-col gap-4">
      {user ? (
        <div className="flex flex-col gap-1">
          Hello {user.firstName}
          <div>
            <p className="mb-10"> get back to it!!!</p>
            {/* div to list all the tasks */}
            <div className="flex flex-col gap-3 mb-5">
              {user.tasks?.map((task, idx) => (
                // individual div for a single task
                <div className="flex gap-4  items-center" key={idx}>
                  <RiCheckboxBlankCircleLine
                    type="radio"
                    className="cursor-pointer"
                    onClick={(e) => {
                      checkHandler(task._id);
                    }}
                  />
                  <div
                    className={
                      Date.now() > new Date(task.dueAt).getTime()
                        ? "text-red-700"
                        : "text-gray-400"
                    }
                  >
                    {task.taskName || JSON.stringify(task)}
                  </div>
                  <div>
                    {task.dueAt ? (
                      <div
                        className={
                          Date.now() > new Date(task.dueAt).getTime()
                            ? "text-red-700"
                            : "text-gray-500"
                        }
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
                    <MdOutlineDelete />
                  </button>
                </div>
              ))}
            </div>
            {/* div to add new task */}
            <div className="flex gap-6 items-center relative ">
              <div className="relative">
                <input
                  name="newTask"
                  id="newTask"
                  type="text"
                  value={taskName}
                  placeholder="enter new task"
                  onChange={(e) => {
                    setTaskName(e.target.value);
                  }}
                  className="bg-slate-500 focus:outline-none rounded-lg px-2 p-2 w-[120%]"
                />
                <div className="relative right-[-10px] top-[12px]">
                  <FaRegClock
                    className="right-0 absolute top-[-52px] cursor-pointer"
                    onClick={() => setShowDateTime((prev) => !prev)}
                  />
                  {showDateTime && (
                    <div>
                      <input
                        type="datetime-local"
                        value={dueAt}
                        onChange={(e) => {
                          setDueAt(e.target.value);
                        }}
                        className="bg-slate-500 text-white rounded-lg px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  )}
                </div>
                {/* to add task */}
                <FaCheck
                  onClick={addTaskHandler}
                  className="cursor-pointer absolute top-[12px] right-[-50px]"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Something went wrong</div>
      )}
    </div>
  );
};
