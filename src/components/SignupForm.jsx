import React, { useState } from "react";

export default function SignupForm(props) {
  const { showSignin, setShowSignin } = props;

  const [formData, setFormData] = useState({
    user_name: "",
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      if (response.ok) {
        // Handle successful response
        console.log("Sign up successful");
      } else {
        // Handle error response
        setError(responseData.errors);
        console.error("Sign up failed", responseData);
      }
    } catch (error) {
      // Handle fetch error
      console.error("An error occurred:", error);
    }
  };

  const handleShowSignin = () => {
    setShowSignin(true);
  };

  return (
    <div className="mx-auto w-[400px] mt-4 p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
        {error && (
          <div className="text-red-500">
            <ul>
              {error.full_messages.map((errorMessage, index) => (
                <li key={index}>{errorMessage}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="bg-[#7f908f] text-white px-4 py-2 rounded hover:bg-[#003049] focus:outline-none focus:ring focus:border-[#003049]"
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
