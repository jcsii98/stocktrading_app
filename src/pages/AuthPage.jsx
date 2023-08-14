import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";
import React, { useState } from "react";

export default function AuthPage(props) {
  const { setUserPending, isLoggedIn, setIsLoggedIn, setUserData } = props;
  const [showSignin, setShowSignin] = useState(false);
  return (
    <>
      {" "}
      {showSignin ? (
        <>
          <SigninForm
            key="signin"
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
            showSignin={showSignin}
            setShowSignin={setShowSignin}
          />
        </>
      )}
    </>
  );
}
