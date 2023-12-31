import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AuthPage from "../pages/AuthPage";
import LoadingPage from "../pages/LoadingPage";
import Dashboard from "../pages/Dashboard";

export default function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSignin, setShowSignin] = useState(false);
  const [currentPage, setCurrentPage] = useState("Home");
  const [userData, setUserData] = useState(null);

  const rememberMe = async () => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    if (uid && client && accessToken) {
      try {
        const response = await fetch(
          "https://stocktrading-api.onrender.com/users_only",
          {
            method: "GET",
            headers: {
              uid: uid,
              client: client,
              "access-token": accessToken,
            },
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);

          setUserData(responseData.data);
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
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      rememberMe();
    }, 1500);

    return () => clearTimeout(timer);
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
              userRole="user"
              userData={userData}
              isLoggedIn={isLoggedIn}
              setCurrentPage={setCurrentPage}
              setIsLoggedIn={setIsLoggedIn}
            />
            {isLoggedIn ? (
              <>
                <Dashboard
                  setUserData={setUserData}
                  currentPage={currentPage}
                  userRole="user"
                  userData={userData}
                />
              </>
            ) : (
              <>
                <AuthPage
                  setUserData={setUserData}
                  setIsLoggedIn={setIsLoggedIn}
                  showSignin={showSignin}
                  setShowSignin={setShowSignin}
                />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
