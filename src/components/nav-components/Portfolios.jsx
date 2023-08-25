import Down from "../../assets/down.png";
import Minimize from "../../assets/minimize.png";
import React, { useState, useEffect } from "react";
import PortfolioComponent from "../PortfolioComponent";
import DashboardLoading from "./DashboardLoading";
export default function Portfolios(props) {
  const { userRole, userData } = props;
  const [dropdown, setDropdown] = useState(false);
  const [sortClicked, setSortClicked] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [portfoliosData, setPortfoliosData] = useState([]);
  const [portfolioDetails, setPortfolioDetails] = useState(null);
  const [transactionsFetched, setTransactionsFetched] = useState(false);
  const [buyerTransactions, setBuyerTransactions] = useState([]);
  const [sellerTransactions, setSellerTransactions] = useState([]);
  const [createTransactionClicked, setCreateTransactionClicked] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("");

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const toggleDropdownClicked = (sortType) => {
    setDropdown(false);
    setSortClicked(true);
    setCurrentTab("Base");
    setSortBy(sortType);
    setSearchClicked(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const makeApiCall = async () => {
    setIsLoading(true);
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
      if (sortBy === "By Coin") {
        const response = await fetch(
          `http://localhost:3000/portfolios/index_by_stock_symbol?stock_symbol=${inputValue}`,
          requestOptions
        );
        const data = await response.json();
        setPortfoliosData(data.data);
        setIsLoading(false);
        console.log("Response from 'By Coin' API:", data);
      } else if (sortBy === "By User") {
        const response = await fetch(
          `http://localhost:3000/portfolios/index_by_user?user_id=${inputValue}`,
          requestOptions
        );
        const data = await response.json();
        setPortfoliosData(data.data);
        setIsLoading(false);
        console.log("Response from 'By User' API:", data);
      }
    } catch (error) {
      setPortfoliosData();
      setIsLoading(false);
      console.error("API error:", error);
    }
  };

  const handleSubmit = () => {
    makeApiCall();
    setSearchClicked(true);
  };

  const fetchPortfolioDetails = async (portfoliosId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/portfolios/${portfoliosId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setPortfolioDetails(data.data);
      setCurrentTab("View");
    } catch (error) {
      console.error("Error fetching portfolio details:", error);
    }
  };

  const handleMinimizeClicked = () => {
    setCurrentTab("Base");
  };

  const handleFetchTransactions = async () => {
    try {
      const accessToken = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");

      const response = await fetch(
        `http://localhost:3000/portfolios/${portfolioDetails.id}/transactions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "access-token": accessToken,
            client: client,
            uid: uid,
          },
        }
      );

      const data = await response.json();
      console.log("Fetched transactions:", data);
      setBuyerTransactions(data.buyer_transactions);
      setSellerTransactions(data.seller_transactions);

      // Update state or perform other actions with the fetched transactions
      setTransactionsFetched(true);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const toggleCreateTransactions = () => {
    setCreateTransactionClicked(true);
  };

  return (
    <>
      <div className="pb-4 relative">
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
          <div className="max-h-[36px] ml-8 self-center">
            {sortClicked && (
              <div className="flex">
                <label className="self-center relative block">
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
                onClick={() => toggleDropdownClicked("By Coin")}
                className="cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-md"
              >
                By Coin
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

      {currentTab == "Base" && inputValue == "" && (
        <h1 className="pt-4 text-xl text-slate-500">
          {sortBy == "By Coin"
            ? "Please enter a valid coin id."
            : "Please enter a valid user id."}
        </h1>
      )}

      {currentTab == "Base" && inputValue !== "" && (
        <>
          {isLoading ? (
            <DashboardLoading />
          ) : (
            <>
              <div className="bg-white p-6 rounded shadow">
                {searchClicked && portfoliosData.length > 0 ? (
                  <>
                    <h1 className="pb-4 text-2xl font-bold">
                      {" "}
                      {sortBy === "By Coin" ? <>By Coin</> : <>By User</>}
                    </h1>
                    <div className="text-center py-4 border-b grid grid-cols-7 text-slate-500">
                      <div>User ID</div>
                      <div>Portfolio ID</div>
                      <div className="">Coin ID</div>

                      <div>Coin Price ($)</div>
                      <div>Portfolio Quantity</div>

                      <div>Total Value ($)</div>
                      <div>Actions</div>
                    </div>
                    <div className="overflow-y-auto max-h-[300px]">
                      {portfoliosData.map((portfolios) => (
                        <PortfolioComponent
                          onClick={() => fetchPortfolioDetails(portfolios.id)}
                          key={portfolios.id}
                          sortBy={sortBy}
                          portfolios={portfolios}
                          userData={userData}
                          portfolioDetails={portfolioDetails}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <>No portfolios for the given Coin Symbol</>
                )}
              </div>
            </>
          )}
        </>
      )}

      {currentTab == "View" && (
        <>
          <div className="bg-white p-6 rounded shadow">
            {createTransactionClicked ? (
              <>
                <div className="pt-4">
                  <div className="flex justify-between pb-4 border-b-[1.5px]">
                    <div>
                      <h1 className="text-2xl font-medium">
                        Create a transaction
                      </h1>
                    </div>
                    <div className="justify-self-end">
                      <img
                        onClick={() => setCreateTransactionClicked(false)}
                        className="cursor-pointer w-4 h-4"
                        src={Minimize}
                        alt="Profile"
                      />
                    </div>
                  </div>
                  <form>
                    <div className="pt-4">
                      <label className="text-xl text-slate-500">Price</label>
                      <br />
                      <div className="py-[8px] px-[12px] h-[40px] w-[205px] border-none bg-slate-100 rounded-md">
                        {portfolioDetails.price}
                      </div>
                      <label className="text-xl text-slate-500">Quantity</label>
                      <br />
                      <input
                        placeholder="Enter desired quantity"
                        className="h-[40px] w-[205px] border-none bg-slate-100 rounded-md"
                        type="text"
                      ></input>
                      <button type="submit"></button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between pb-4 border-b-[1.5px]">
                  <div>
                    <h1 className="text-2xl font-medium">
                      Portfolio #{portfolioDetails.id}
                    </h1>
                  </div>
                  <div className="justify-self-end">
                    <img
                      onClick={handleMinimizeClicked}
                      className="cursor-pointer w-4 h-4"
                      src={Minimize}
                      alt="Profile"
                    />
                  </div>
                </div>
                <div className="text-center py-2 border-b grid grid-cols-7">
                  <div>User ID</div>
                  <div>Portfolio ID</div>
                  <div className="">Coin Symbol</div>

                  <div>Coin Price ($)</div>
                  <div>Portfolio Quantity</div>

                  <div>Total Value ($)</div>
                  <div>Actions</div>
                </div>
                <div className="text-center py-2 border-b grid grid-cols-7">
                  <div className="self-center">{portfolioDetails.user_id}</div>
                  <div className="self-center">{portfolioDetails.id}</div>
                  <div className="self-center">
                    {portfolioDetails.stock_symbol}
                  </div>
                  <div className="self-center">{portfolioDetails.price}</div>
                  <div className="self-center">{portfolioDetails.quantity}</div>
                  <div className="self-center">
                    {portfolioDetails.total_amount}
                  </div>{" "}
                  <div className="">
                    {/* fetch transactions for admin*/}

                    {userRole == "admin" && (
                      <button
                        onClick={handleFetchTransactions}
                        type="button"
                        className="px-4 py-1 text-white w-auto rounded-full bg-gray-400 hover:bg-[#316c8c]"
                      >
                        Fetch Transactions
                      </button>
                    )}
                    {userRole == "user" &&
                    userData.id == portfolioDetails.user_id ? (
                      <div className="text-sm text-slate-500">
                        See My Portfolios for more info on this portfolio.
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={toggleCreateTransactions}
                          type="button"
                          className="px-4 py-1 text-white w-auto rounded-full bg-gray-400 hover:bg-[#316c8c]"
                        >
                          Create Transaction
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

// {
//   searchClicked && (
//     <div className="bg-white p-6 rounded shadow">
//       <div className="text-center py-4 border-b grid grid-cols-7 text-slate-500">
//         <div>User ID</div>
//         <div>Portfolio ID</div>
//         <div className="">Coin ID</div>

//         <div>Coin Price ($)</div>
//         <div>Portfolio Quantity</div>

//         <div>Total Value ($)</div>
//         <div>Actions</div>
//       </div>
//       {portfolioDetails ? (
//         <>
//           <div className="text-center py-2 border-b grid grid-cols-7">
//             <div className="self-center">{portfolioDetails.user_id}</div>
//             <div className="self-center">{portfolioDetails.id}</div>
//             <div className="self-center">{portfolioDetails.stock_symbol}</div>
//             <div className="self-center">{portfolioDetails.price}</div>
//             <div className="self-center">{portfolioDetails.quantity}</div>
//             <div className="self-center">
//               {portfolioDetails.total_amount}
//             </div>{" "}
//             <div className="">
//               {/* fetch transactions for admin*/}

//               {userRole == "admin" && (
//                 <button
//                   onClick={handleFetchTransactions}
//                   type="button"
//                   className="px-4 py-1 text-white w-auto rounded-full bg-gray-400 hover:bg-[#316c8c]"
//                 >
//                   Fetch Transactions
//                 </button>
//               )}
//               {userRole == "user" && userData.id == portfolioDetails.user_id ? (
//                 <button
//                   onClick={handleFetchTransactions}
//                   type="button"
//                   className="px-4 py-1 text-white w-auto rounded-full bg-gray-400 hover:bg-[#316c8c]"
//                 >
//                   View Transactions
//                 </button>
//               ) : (
//                 <>
//                   <button
//                     onClick={toggleCreateTransactions}
//                     type="button"
//                     className="px-4 py-1 text-white w-auto rounded-full bg-gray-400 hover:bg-[#316c8c]"
//                   >
//                     Create Transaction
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//           {createTransactionClicked && (
// <div className="pt-4">
//   <h1 className="pb-4 border-b-[1.5px] text-2xl font-bold">
//     Create a transaction
//   </h1>
//   <form>
//     <div className="pt-4">
//       <label className="text-xl text-slate-500">Price</label>
//       <br />
//       <div className="py-[8px] px-[12px] h-[40px] w-[205px] border-none bg-slate-100 rounded-md">
//         {portfolioDetails.price}
//       </div>
//       <label className="text-xl text-slate-500">Quantity</label>
//       <br />
//       <input
//         placeholder="Enter desired quantity"
//         className="h-[40px] w-[205px] border-none bg-slate-100 rounded-md"
//         type="text"
//       ></input>
//       <button type="submit"></button>
//     </div>
//   </form>
// </div>
//           )}
//           {transactionsFetched && (
//             <>
//               <div className="grid grid-cols-2 py-4">
//                 <div className="border-b-[1.5px] border-r-[1.5px]">
//                   <h1 className="pt-2 pr-4 pb-4 text-xl text-slate-500">
//                     Seller Transactions
//                   </h1>
//                 </div>
//                 <div className="border-b-[1.5px]">
//                   <h1 className="pt-2 pl-4 pb-4 text-xl text-slate-500">
//                     Buyer Transactions
//                   </h1>
//                 </div>
//                 <div className="pr-4 border-r-[1.5px]">
//                   {sellerTransactions.length > 0 ? (
//                     <>
//                       {" "}
//                       <div className="text-slate-600 grid grid-cols-6 text-center border-b py-4">
//                         <div>ID</div>
//                         <div>Quantity</div>
//                         <div>Price</div>
//                         <div>Amount</div>
//                         <div>Status</div>
//                         <div>Actions</div>
//                       </div>
//                     </>
//                   ) : (
//                     <> </>
//                   )}

//                   <ul className="max-h-[120px] overflow-y-auto">
//                     {sellerTransactions.length > 0 ? (
//                       <></>
//                     ) : (
//                       <div className="py-2 text-slate-600 text-center">
//                         No seller transactions listed for this portfolio.
//                       </div>
//                     )}

//                     {sellerTransactions.map((transaction) => (
//                       <li
//                         className="h-[40px] grid grid-cols-6 items-center border-b"
//                         key={transaction.id}
//                       >
//                         <div className="text-center self-center">
//                           {transaction.id}
//                         </div>
//                         <div className="text-center self-center">
//                           {transaction.quantity}
//                         </div>
//                         <div className="text-center self-center">
//                           {transaction.price}
//                         </div>
//                         <div className="text-center self-center">
//                           {transaction.amount}
//                         </div>
//                         <div className="text-center self-center">
//                           {transaction.status}
//                         </div>
//                         {transaction.status == "pending" && (
//                           <>
//                             {" "}
//                             {message ? (
//                               <div className="text-slate-400 text-sm text-center">
//                                 Approved Successfully
//                               </div>
//                             ) : (
//                               <>
//                                 {" "}
//                                 <button
//                                   onClick={() =>
//                                     approveTransaction(
//                                       currentPortfolio,
//                                       transaction.id
//                                     )
//                                   }
//                                   className="px-8 py-2 text-white w-auto rounded-full bg-gray-400 hover:bg-[#316c8c]"
//                                 >
//                                   Approve
//                                 </button>
//                               </>
//                             )}
//                           </>
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="pl-4">
//                   {buyerTransactions.length > 0 ? (
//                     <div className="text-slate-600 grid grid-cols-6 text-center border-b py-4">
//                       <div>ID</div>
//                       <div>Quantity</div>
//                       <div>Price</div>
//                       <div>Amount</div>
//                       <div>Status</div>
//                       <div>Actions</div>
//                     </div>
//                   ) : (
//                     <></>
//                   )}

//                   <ul className="max-h-[200px] overflow-y-auto">
//                     {buyerTransactions.length > 0 ? (
//                       <></>
//                     ) : (
//                       <div className="py-2 text-slate-600">
//                         No buyer transactions listed for this portfolio.
//                       </div>
//                     )}
//                     {buyerTransactions.map((transaction) => (
//                       <li
//                         className="h-[40px] grid grid-cols-6 items-center border-b"
//                         key={transaction.id}
//                       >
//                         <div className="pr-4">{transaction.id}</div>
//                         <div className="pr-4">{transaction.quantity}</div>
//                         <div className="pr-4">{transaction.price}</div>
//                         <div className="pr-4">{transaction.amount}</div>
//                         <div className="pr-4">{transaction.status}</div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </>
//           )}
//         </>
//       ) : (
//         <>
//           <div className="overflow-y-auto max-h-[300px]">
//             {portfoliosData.map((portfolios) => (
//               <PortfolioComponent
//                 onClick={() => fetchPortfolioDetails(portfolios.id)}
//                 key={portfolios.id}
//                 sortBy={sortBy}
//                 portfolios={portfolios}
//               />
//             ))}
//           </div>

//           {inputValue == "" && (
//             <h1 className="pt-4 text-xl text-slate-500">
//               {sortBy == "By Coin"
//                 ? "Please enter a valid coin id."
//                 : "Please enter a valid user id."}
//             </h1>
//           )}
//         </>
//       )}
//     </div>
//   );
// }
