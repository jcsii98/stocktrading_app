import React, { useState } from "react";

export default function SignupForm(props) {
  const { showSignin, setShowSignin, setSuccessfulSignup } = props;

  const [formData, setFormData] = useState({
    user_name: "",
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
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
    setFormData((prevData) => ({
      ...prevData,
      password: "",
      confirm_password: "",
    }));

    setMessage("Signing up");
    setError();

    // Prepare the request data
    const requestData = {
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirm_password,
      full_name: formData.full_name,
      user_name: formData.user_name,
    };

    try {
      const response = await fetch("http://localhost:3000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        // Handle successful response
        if (responseData.status == "success") {
          console.log("Success!");
          setMessage("Please check your email for confirmation instructions");
        } else {
          setMessage();
          setError(responseData.errors.full_messages);
          console.error("Sign up failed 1", responseData);
        }
      } else {
        // Handle error response
        setMessage();
        setError(responseData.errors.full_messages);
        console.error("Sign up failed 2", responseData);
      }
    } catch (error) {
      // Handle fetch error
      setMessage();
      setError(responseData.errors.full_messages);
      console.error("Sign up failed 3:", error);
    }
  };

  const handleShowSignin = () => {
    setShowSignin(true);
    setSuccessfulSignup(false);
  };

  return (
    <div className="mx-auto w-[400px] mt-2 p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
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
        <div className="grid grid-cols-2">
          <div className="mb-2">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded mt-1 focus:outline-none"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded mt-1 focus:outline-none"
              required
            />
          </div>
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
        <div className="mb-2">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded mt-1 focus:outline-none"
            required
          />
        </div>
        <div className="pb-2">
          {" "}
          {message && <div className="text-slate-500">{message}</div>}
          {error && <div className="text-red-500">{error}</div>}
        </div>

        <button
          type="submit"
          className="mb-2 bg-[#7f908f] text-white px-4 py-2 rounded hover:bg-[#003049] focus:outline-none focus:ring focus:border-[#003049]"
        >
          Sign Up
        </button>
        <p className="">
          Already have an account?{" "}
          <button
            type="button"
            className="underline"
            onClick={handleShowSignin}
          >
            Sign in here.
          </button>
        </p>
      </form>
    </div>
  );
}
