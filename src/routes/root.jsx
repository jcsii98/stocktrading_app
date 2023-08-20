import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AuthPage from "../pages/AuthPage";
import LoadingPage from "../pages/LoadingPage";
import Dashboard from "../pages/Dashboard";

export default function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  return (
    <>
      {isLoading ? (
        <>
          <LoadingPage />
        </>
      ) : (
        <>
          <Navbar isLoggedIn={isLoggedIn} />
          {isLoggedIn ? (
            <>
              <Dashboard userRole="user" />
            </>
          ) : (
            <>
              <AuthPage showSignin={showSignin} setShowSignin={setShowSignin} />
            </>
          )}
        </>
      )}
    </>
  );
}
