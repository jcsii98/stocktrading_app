import UserPng from "../../assets/user.png";
import React, { useState, useEffect } from "react";
import DashboardLoading from "./DashboardLoading";

export default function MyAccount(props) {
  const { setUserData, userData, userRole } = props;
  const [userBalance, setUserBalance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cashIn, setCashIn] = useState(false);
  const [cashInAmt, setCashInAmt] = useState("");
  const [message, setMessage] = useState();

  const handleCashInAmtChange = (event) => {
    setCashInAmt(event.target.value);
  };
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

  const toggleCashIn = () => {
    setCashIn((prev) => !prev);
  };

  const handleSubmitCashIn = async (event) => {
    event.preventDefault();
    setMessage(`Topping up ${cashInAmt} for ${userData.full_name}`);
    console.log("Submitting Cash In for:", userData.full_name);
    const accessToken = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "access-token": accessToken,
          client: client,
          uid: uid,
        },
        body: JSON.stringify({
          amount: parseFloat(cashInAmt),
        }),
      });
      const data = await response.json();

      console.log(data);
      setMessage(data.message);
      fetchUserDetails();
      setCashInAmt("");
    } catch (error) {
      console.error("An error has occured", error);
    }
  };

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
                  <div className="flex">
                    <h3 className="text-lg font-semibold">
                      {userData.full_name}
                    </h3>
                    <h3 className="pl-4 text-lg font-semibold text-slate-500">
                      #100{userData.id}
                    </h3>
                  </div>

                  <p className="text-slate-500">{userData.email}</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-semibold pb-2">Personal Details</h4>
                <div className="">
                  <div className="pb-4">
                    <p className="text-slate-500">Username:</p>
                    <p>{userData.user_name}</p>
                  </div>

                  {userRole === "user" && (
                    <>
                      <div className="border-t pt-4">
                        <h4 className="text-lg font-semibold pb-2">
                          Your Wallet
                        </h4>

                        <p>Balance: {userData.wallet_balance}</p>
                        <p>Pending Amount: {userData.pending_amount}</p>
                      </div>
                      <div className="pt-2">
                        {cashIn && (
                          <>
                            <div className="pb-2">
                              <form onSubmit={handleSubmitCashIn}>
                                <span className="pt-1 pl-2 h-[38px] w-auto text-xl fixed">
                                  $
                                </span>
                                <input
                                  value={cashInAmt}
                                  onChange={handleCashInAmtChange}
                                  placeholder=""
                                  className="pl-6 border-none bg-slate-100 rounded-md"
                                  type="text"
                                ></input>
                              </form>
                            </div>
                          </>
                        )}
                        {message && (
                          <div className="pt-2 text-slate-500">{message}</div>
                        )}

                        <button
                          onClick={toggleCashIn}
                          className="border-2 rounded-md px-4 py-1 text-xlcursor-pointer font-medium w-auto hover:border-[#316c8c]"
                          type="button"
                        >
                          {cashIn ? "Cancel" : "Cash In"}
                        </button>
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
