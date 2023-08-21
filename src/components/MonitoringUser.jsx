import Minimize from "../assets/minimize.png";
import React, { useState } from "react";
export default function MonitoringUser(props) {
  const { setMonitoringUser, monitoringUser, fetchUsers } = props;
  const [message, setMessage] = useState();
  const [accountPending, setAccountPending] = useState(
    monitoringUser.account_pending
  );
  const handleMinimizeClicked = () => {
    setMonitoringUser(null);
  };

  const handleApproveClick = async () => {
    setMessage("approve called");
    const accessToken = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    try {
      const response = await fetch(
        `http://localhost:3000/admin/pending_users/${monitoringUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "access-token": accessToken,
            client: client,
            uid: uid,
          },
        }
      );
      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData);
        console.log("Approved", monitoringUser.user_name);
        setMessage(responseData.message);
        setAccountPending(false);
        fetchUsers();
      } else {
        console.error("Approval failed", responseData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="pb-4 border-b grid grid-cols-2">
        <div className="flex flex-row space-x-4">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div className="self-center">
            <h3 className="text-lg font-semibold">
              {monitoringUser.full_name}
            </h3>
            <p className="text-gray-600">{monitoringUser.email}</p>
          </div>
        </div>

        <div className="justify-self-end">
          <img
            onClick={handleMinimizeClicked}
            className="cursor-pointer w-4 h-4"
            src={Minimize}
            alt="Profile"
          />
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Account Details</h4>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <p className="text-gray-600">Username</p>
            <p>{monitoringUser.user_name}</p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p>{monitoringUser.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Account Status</p>
            <p>{monitoringUser.account_pending ? "Pending" : "Approved"}</p>
          </div>
          <div>
            <p className="text-gray-600">User Wallet</p>
            <p>Current Balance: {monitoringUser.wallet_balance}</p>
            <p>Current Pending Amount: {monitoringUser.pending_amount}</p>
          </div>
          {message && <div className="text-slate-500">{message}</div>}

          {accountPending && (
            <>
              <div className="mt-2">
                <button
                  onClick={handleApproveClick}
                  className="px-8 py-2 text-white w-auto rounded-full bg-gray-400 hover:bg-[#316c8c]"
                >
                  Approve
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
