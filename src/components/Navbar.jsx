import React, { useState } from "react";
import { Link } from "react-router-dom";

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
export default function Navbar(props) {
  const { setCurrentPage, userRole, setIsLoggedIn, isLoggedIn, userData } =
    props;
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleSignout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="border-b mb-4">
        <div className="max-w-[1240px] flex justify-between items-center h-24 mx-auto text-white">
          <h1 className={"w-full text-3xl font-bold"}>
            {isLoggedIn ? <>Hi, {userData.full_name}</> : <>P2P Crypto</>}
          </h1>
          <ul className="hidden md:flex space-x-8">
            {isLoggedIn && (
              <>
                <li className="">
                  <a
                    className="hover:text-white cursor-pointer	border-[1.5px] border-[#316c8c00] hover:border-white rounded-md mx-2 px-2 py-1"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => setCurrentPage("Home")}
                  >
                    Home
                  </a>
                </li>{" "}
                <li className="">
                  <a
                    className="hover:text-white cursor-pointer	border-[1.5px] border-[#316c8c00] hover:border-white rounded-md mx-2 px-2 py-1"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => setCurrentPage("Stocks")}
                  >
                    Coins
                  </a>
                </li>
                <li className="">
                  <a
                    className="hover:text-white cursor-pointer	border-[1.5px] border-[#316c8c00] hover:border-white rounded-md mx-2 px-2 py-1"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => setCurrentPage("Portfolios")}
                  >
                    Portfolios
                  </a>
                </li>
                {userRole === "admin" ? (
                  <>
                    <li className="">
                      <a
                        className="hover:text-white cursor-pointer	border-[1.5px] border-[#316c8c00] hover:border-white rounded-md mx-2 px-2 py-1"
                        style={{ whiteSpace: "nowrap" }}
                        onClick={() => setCurrentPage("Users")}
                      >
                        Users
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="">
                      <a
                        className="hover:text-white cursor-pointer	border-[1.5px] border-[#316c8c00] hover:border-white rounded-md mx-2 px-2 py-1"
                        style={{ whiteSpace: "nowrap" }}
                        onClick={() => setCurrentPage("My Portfolios")}
                      >
                        My Portfolios
                      </a>
                    </li>
                  </>
                )}{" "}
                <li className="">
                  <a
                    className="hover:text-white cursor-pointer	border-[1.5px] border-[#316c8c00] hover:border-white rounded-md mx-2 px-2 py-1"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => setCurrentPage("My Account")}
                  >
                    My Account
                  </a>
                </li>
                <li onClick={handleSignout} className="">
                  <a
                    className="hover:text-white cursor-pointer	border-[1.5px] border-[#316c8c00] hover:border-white rounded-md mx-2 px-2 py-1"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Sign Out
                  </a>
                </li>
              </>
            )}
          </ul>
          <div onClick={handleNav} className="block md:hidden">
            {!nav ? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} />}
          </div>
          <div
            className={
              !nav
                ? "fixed left-[-100%]"
                : "text-[#003049] md:hidden fixed left-0 top-0 h-full min-w-[450px] w-[60%] border-r border-r-gray-900 bg-white ease-in-out duration-500"
            }
          >
            <h1 className="w-full text-3xl font-bold h-24 p-4 border-b">
              Sample P2P CryptoMarket
            </h1>
            <ul className="uppercase">
              <li className="p-4 border-b border-gray-400">My Account</li>
              {userRole === "admin" ? (
                <>
                  <li className="p-4 border-b border-gray-400">Users</li>
                  <li className="p-4 border-b border-gray-400">Portfolios</li>
                </>
              ) : (
                <li className="p-4 border-b border-gray-400">My Portfolios</li>
              )}
              <li className="p-4 border-b border-gray-400">Sign out</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
