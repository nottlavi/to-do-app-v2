import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserHome } from "./components/homepage/UserHome";
import { GuestHome } from "./components/homepage/GuestHome";

export const Home = () => {
  const [user, setUser] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

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
        if (err.response) {
          console.log(err.response);
        } else {
          console.log("something went wrong");
        }
      }
    };
    fetchUser();
  }, [BASE_URL]);

  return (
    <div className="flex mt-10  justify-center" >
      {user ? (
        <UserHome />
      ) : (
        <div>
          <GuestHome />
        </div>
      )}
    </div>
  );
};
