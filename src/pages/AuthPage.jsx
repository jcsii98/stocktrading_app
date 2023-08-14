import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";
import React, { useState } from "react";

export default function AuthPage(props) {
  const {
    showSignin,
    setShowSignin,
    successfulSignup,
    setUserPending,
    isLoggedIn,
    setIsLoggedIn,
    setUserData,
    setSuccessfulSignup,
  } = props;
  return (
    <>
      {" "}
      {successfulSignup ? (
        <></>
      ) : (
        <>
          {showSignin ? (
            <>
              <SigninForm
                key="signin"
                setSuccessfulSignup={setSuccessfulSignup}
                setUserPending={setUserPending}
                setUserData={setUserData}
                setIsLoggedIn={setIsLoggedIn}
                showSignin={showSignin}
                setShowSignin={setShowSignin}
              />
            </>
          ) : (
            <>
              <SignupForm
                key="signup"
                setSuccessfulSignup={setSuccessfulSignup}
                showSignin={showSignin}
                setShowSignin={setShowSignin}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
