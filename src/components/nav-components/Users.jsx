import UserComponent from "../UserComponent";
import React, { useState, useEffect } from "react";
import DashboardLoading from "./DashboardLoading";
import MonitoringUser from "../MonitoringUser";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [monitoringUser, setMonitoringUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
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

  const handleUserClicked = async (userId) => {
    try {
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

  return (
    <>
      <h1 className="pb-4 text-3xl font-bold text-white">
        {monitoringUser ? `${monitoringUser.full_name}'s Profile` : "Users"}
      </h1>
      {isLoading ? (
        <DashboardLoading />
      ) : (
        <>
          <div className="h-[500px] scroll-smooth overflow-y-scroll bg-white px-6 py-10 rounded shadow">
            {monitoringUser ? (
              <>
                <MonitoringUser
                  fetchUsers={fetchUsers}
                  setMonitoringUser={setMonitoringUser}
                  monitoringUser={monitoringUser}
                />
              </>
            ) : (
              <div className="grid grid-cols-3 gap-y-8">
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
