import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AdminAuthPage from "../pages/AdminAuthPage";
import Dashboard from "../pages/Dashboard";
import LoadingPage from "../pages/LoadingPage";

export default function AdminRoot() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState("Home");
  const rememberMe = async () => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    if (uid && client && accessToken) {
      try {
        const response = await fetch("http://localhost:3000/admins_only", {
          method: "GET",
          headers: {
            uid: uid,
            client: client,
            "access-token": accessToken,
          },
        });
        if (response.ok) {
          const responseData = await response.json();
          setUserData(responseData.data.user);
          setIsLoggedIn(true);
          setIsLoading(false);
        } else {
          setIsLoggedIn(false);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setIsLoading(false);
        console.error("An error occured:", error);
      }
    }
  };

  useEffect(() => {
    rememberMe();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <LoadingPage />
        </>
      ) : (
        <>
          <div className="bg-gradient-to-b from-[#1b263b] to-[#023047] w-screen h-full overflow-hidden">
            <Navbar
              userData={userData}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              userRole="admin"
              setCurrentPage={setCurrentPage}
            />
            {isLoggedIn ? (
              <>
                <Dashboard
                  userData={userData}
                  userRole="admin"
                  currentPage={currentPage}
                />
              </>
            ) : (
              <>
                <AdminAuthPage
                  setUserData={setUserData}
                  setIsLoggedIn={setIsLoggedIn}
                />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
