import React, { useState } from "react";

export default function SigninForm(props) {
  const {
    setSuccessfulSignup,
    setUserPending,
    setShowSignin,
    setIsLoggedIn,
    setUserData,
  } = props;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Logging in");
    setError();
    const requestData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch("http://localhost:3000/auth/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const responseData = await response.json();

      if (response.ok) {
        // store headers in localstorage
        localStorage.setItem("uid", response.headers.get("uid"));
        localStorage.setItem("client", response.headers.get("client"));
        localStorage.setItem(
          "access-token",
          response.headers.get("access-token")
        );
        setUserData(responseData.data);
        setUserPending(responseData.data.account_pending);
        setMessage();
        setIsLoggedIn(true);
        console.log("Sign in successful");
      } else {
        setMessage();
        setError(responseData.errors);

        console.error("Sign in failed", responseData);
      }
    } catch (error) {
      setMessage();
      console.error("An error occured:", error);
    }
  };

  const handleHideSignin = () => {
    setShowSignin(false);
    setSuccessfulSignup(false);
  };

  return (
    <>
      <div className="mx-auto w-[400px] mt-4 p-6 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded mt-1 focus:outline-none"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded mt-1 focus:outline-none"
              required
            />
          </div>
          {message && <div className="text-slate-500">{message}</div>}
          {error && (
            <div className="text-red-500">
              <ul>
                {error.map((errorMessage, index) => (
                  <li key={index}>{errorMessage}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            type="submit"
            className="mb-2 bg-[#7f908f] text-white px-4 py-2 rounded hover:bg-[#003049] focus:outline-none focus:ring focus:border-[#003049]"
          >
            Sign in
          </button>
          <p className="">
            Don't have an account yet?{" "}
            <button
              type="button"
              className="underline"
              onClick={handleHideSignin}
            >
              Sign up here.
            </button>
          </p>
        </form>
      </div>
    </>
  );
}
