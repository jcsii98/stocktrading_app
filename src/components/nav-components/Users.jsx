import UserComponent from "../UserComponent";
import React, { useState, useEffect } from "react";
import DashboardLoading from "./DashboardLoading";
import MonitoringUser from "../MonitoringUser";
import Down from "../../assets/down.png";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [monitoringUser, setMonitoringUser] = useState(null);
  const [showPending, setShowPending] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setDropdown(false);
      setShowPending(false);
      const accessToken = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");

      const response = await fetch("http://localhost:3000/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access-token": accessToken,
          client: client,
          uid: uid,
        },
      });
      if (response.ok) {
        const usersData = await response.json();
        console.log(usersData);
        setUsers(usersData);
        setIsLoading(false);
      } else {
        console.error("Error fetching users");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fetchPendingUsers = async () => {
    try {
      setDropdown(false);
      setShowPending(true);
      const accessToken = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");

      const response = await fetch(
        "http://localhost:3000/admin/pending_users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "access-token": accessToken,
            client: client,
            uid: uid,
          },
        }
      );
      if (response.ok) {
        const usersData = await response.json();
        console.log(usersData);
        setUsers(usersData);
        setIsLoading(false);
      } else {
        console.error("Error fetching pending users");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleUserClicked = async (userId) => {
    try {
      setDropdown(false);
      const accessToken = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");

      const response = await fetch(
        `http://localhost:3000/admin/users/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "access-token": accessToken,
            client: client,
            uid: uid,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setMonitoringUser(userData);
      } else {
        console.error("Error fetching user details");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <>
      <div className="relative">
        <h1 className="pb-4 text-3xl font-bold text-white flex items-center">
          {monitoringUser ? (
            `${monitoringUser.full_name}'s Profile`
          ) : showPending ? (
            <>Pending Users</>
          ) : (
            <>All Users</>
          )}
          {!monitoringUser && (
            <>
              <img
                className="invert ml-2 cursor-pointer w-4 h-4"
                src={Down}
                alt="users dropdown"
                onClick={toggleDropdown}
              />
            </>
          )}
        </h1>
        {dropdown && (
          <div className="absolute top-8 left-0 mt-2 w-40 bg-white rounded-md shadow-md">
            <ul className="py-2 px-3">
              <li
                onClick={fetchUsers}
                className="cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-md"
              >
                All Users
              </li>
              <li
                onClick={fetchPendingUsers}
                className="cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-md"
              >
                Pending Users
              </li>
            </ul>
          </div>
        )}
      </div>

      {isLoading ? (
        <DashboardLoading />
      ) : (
        <>
          <div className="h-[500px] scroll-smooth overflow-y-auto bg-white px-6 py-8 rounded shadow">
            {monitoringUser ? (
              <>
                <MonitoringUser
                  fetchUsers={fetchUsers}
                  setMonitoringUser={setMonitoringUser}
                  monitoringUser={monitoringUser}
                />
              </>
            ) : (
              <div className="grid grid-cols-4 gap-y-2">
                {users.map((user) => (
                  <UserComponent
                    onClick={() => handleUserClicked(user.id)}
                    key={user.id}
                    user={user}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
