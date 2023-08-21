import Down from "../../assets/down.png";
import React, { useState, useEffect } from "react";
export default function Portfolios() {
  const [dropdown, setDropdown] = useState(false);
  const [sortClicked, setSortClicked] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const toggleDropdownClicked = (sortType) => {
    setSortBy(sortType);
    setDropdown(false);
    setSortClicked(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const makeApiCall = async () => {
    const accessToken = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    const headers = {
      "access-token": accessToken,
      client,
      uid,
    };

    const requestOptions = {
      headers: headers,
    };

    try {
      if (sortBy === "By Stock") {
        const response = await fetch(
          `http://localhost:3000/portfolios/index_by_stock_id?stock_id=${inputValue}`,
          requestOptions
        );
        const data = await response.json();
        console.log("Response from 'By Stock' API:", data);
      } else if (sortBy === "By User") {
        const response = await fetch(
          `http://localhost:3000/portfolios/index_by_user?user_id=${inputValue}`,
          requestOptions
        );
        const data = await response.json();
        console.log("Response from 'By User' API:", data);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const handleSubmit = () => {
    makeApiCall();
  };

  return (
    <>
      <div className="relative">
        <div className="flex">
          <div className="self-center">
            <h1 className="text-3xl font-bold text-white flex items-center">
              Portfolios
              <img
                className="invert ml-2 cursor-pointer w-4 h-4"
                src={Down}
                alt="portfolios dropdown"
                onClick={toggleDropdown}
              />
            </h1>
          </div>
          <div className="ml-8 self-center">
            {sortClicked && (
              <div className="flex">
                <label className="relative block">
                  <span className="sr-only">Search</span>
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg
                      className="h-5 w-5 fill-slate-300"
                      viewBox="0 0 20 20"
                    ></svg>
                  </span>
                  <input
                    className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    placeholder={sortBy}
                    type="text"
                    name="search"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                </label>{" "}
                <div className="ml-6">
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-2 text-white w-auto rounded-full bg-gray-400 hover:bg-[#316c8c]"
                  >
                    Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {dropdown && (
          <div className="mt-4 absolute top-8 left-0 w-40 bg-white rounded-md shadow-md">
            <ul className="py-2 px-3">
              <li
                onClick={() => toggleDropdownClicked("By Stock")}
                className="cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-md"
              >
                By Stock
              </li>
              <li
                onClick={() => toggleDropdownClicked("By User")}
                className="cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-md"
              >
                By User
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
