import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import LoadingPage from "./pages/LoadingPage";
import Dashboard from "./pages/Dashboard";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userPending, setUserPending] = useState(null);

  const rememberMe = async () => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    if (uid && client && accessToken) {
      try {
        // Make a request to the '/users_only' endpoint
        const response = await fetch("http://localhost:3000/users_only", {
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
          setUserPending(responseData.data.user.account_pending);
          setIsLoggedIn(true);
          setIsLoading(false);
        } else {
          // Tokens are expired or invalid, redirect to sign-in
          setIsLoggedIn(false);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        // Handle error if needed
      }
    } else {
      // Tokens are not present, redirect to sign-in
      setIsLoggedIn(false);
      setIsLoading(false);
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
          <Navbar
            userData={userData}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
          />
          {isLoggedIn ? (
            <Dashboard userPending={userPending} />
          ) : (
            <>
              <div className="flex max-w-[1240px] mx-auto mt-4">
                <div className="m-4">
                  <article className="prose lg:prose-xl">
                    <h1>New to Crypto Trading?</h1>
                    <p>
                      Dive into the world of P2P crypto trading and start
                      exchanging digital assets directly. Our platform ensures
                      secure and hassle-free transactions, putting you in
                      control of your trades.
                    </p>
                    <p>
                      Stay up-to-date with the latest trends and insights in the
                      crypto market, so you can make informed decisions and take
                      advantage of opportunities.
                    </p>
                  </article>
                </div>

                <AuthPage
                  setUserPending={setUserPending}
                  setUserData={setUserData}
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;
