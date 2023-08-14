import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
export default function Navbar(props) {
  const { setIsLoggedIn, isLoggedIn, userData } = props;
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
      <div className="bg-[#003049] border-b">
        <div className="max-w-[1240px] bg-[#003049] flex justify-between items-center h-24 mx-auto px-4  text-white">
          <h1 className={"w-full text-3xl font-bold"}>
            {isLoggedIn ? <>Hi, {userData.full_name}</> : <>P2P Crypto</>}
          </h1>
          <ul className="hidden md:flex space-x-8">
            <li className="">
              <a
                className="hover:text-[#316c8c] cursor-pointer	"
                style={{ whiteSpace: "nowrap" }}
              >
                Home
              </a>
            </li>
            {isLoggedIn ? (
              <>
                <li className="">
                  <a
                    className="hover:text-[#316c8c] cursor-pointer	"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Portfolios
                  </a>
                </li>
                <li onClick={handleSignout} className="">
                  <a
                    className="hover:text-[#316c8c] cursor-pointer	"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Sign Out
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="">
                  <a
                    className="hover:text-[#316c8c] cursor-pointer	"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Coins
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
              <li className="p-4 border-b border-gray-400">Home</li>
              <li className="p-4 border-b border-gray-400">Company</li>
              <li className="p-4 border-b border-gray-400">Resources</li>
              <li className="p-4 border-b border-gray-400">About</li>
              <li className="p-4 border-b border-gray-400">Contact</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
