import UserPng from "../../assets/user.png";
import React, { useState, useEffect } from "react";
import DashboardLoading from "./DashboardLoading";

export default function MyAccount(props) {
  const { setUserData, userData, userRole } = props;
  const [userBalance, setUserBalance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchUserDetails() {
    try {
      const accessToken = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");

      const response = await fetch("http://localhost:3000/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access-token": accessToken,
          client: client,
          uid: uid,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setUserData(data);
      setIsLoading(false);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching user balance:", error);
      // Handle error appropriately (show an error message, etc.)
      return { error: "An error occurred while fetching user balance" };
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUserDetails();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {" "}
      <div className="">
        <h2 className="pb-4 text-3xl font-bold text-white">
          {userRole === "admin" ? "Admin" : "Profile"} Information
        </h2>
        {isLoading ? (
          <DashboardLoading />
        ) : (
          <>
            <div className="bg-white p-6 rounded shadow">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0">
                  {" "}
                  <img
                    className="place-self-center w-20 h-20 rounded-full mr-4"
                    src={UserPng}
                    alt="Profile"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {userData.full_name}
                  </h3>
                  <p className="text-gray-600">{userData.email}</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Personal Details</h4>
                <div className="">
                  <div className="pb-4">
                    <p className="text-gray-600">Username:</p>
                    <p>{userData.user_name}</p>
                    {userRole === "user" && (
                      <>
                        <p className="text-gray-600">User ID:</p>
                        <p>{userData.id}</p>
                      </>
                    )}
                  </div>

                  {userRole === "user" && (
                    <>
                      <div className="border-t pt-4">
                        <p className="text-gray-600">Balance:</p>
                        <p>Wallet Balance: {userData.wallet_balance}</p>
                        <p>Wallet Pending Amount: {userData.pending_amount}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
