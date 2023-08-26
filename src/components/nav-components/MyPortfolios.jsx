import Down from "../../assets/down.png";
import Minimize from "../../assets/minimize.png";
import React, { useState, useEffect } from "react";
import DashboardLoading from "./DashboardLoading";

export default function MyPortfolios(props) {
  const { userRole, userData } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [myPortfolios, setMyPortfolios] = useState([]);
  const [viewClicked, setViewClicked] = useState(false);
  const [buyerTransactions, setBuyerTransactions] = useState([]);
  const [sellerTransactions, setSellerTransactions] = useState([]);
  const [currentPortfolio, setCurrentPortfolio] = useState("");
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [currentTab, setCurrentTab] = useState("Base");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function fetchPortfolios() {
    try {
      const accessToken = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");

      const response = await fetch("http://localhost:3000/portfolios/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access-token": accessToken,
          client: client,
          uid: uid,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      if (data.data) {
        setMyPortfolios(data.data);
      }
      if (data.message) {
        setMyPortfolios();
        setMessage(data.message);
      }
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      setIsLoading(false);
      // Handle error appropriately (show an error message, etc.)
      return { error: "An error occurred while fetching portfolios" };
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPortfolios();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  async function fetchTransactions(portfolioId) {
    setCurrentPortfolio(portfolioId);
    setViewClicked(true);
    try {
      const accessToken = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");

      const response = await fetch(
        `http://localhost:3000/portfolios/${portfolioId}/transactions`,
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

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log(data);
      setBuyerTransactions(data.buyer_transactions);
      setSellerTransactions(data.seller_transactions);

      return data;
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      // Handle error appropriately (show an error message, etc.)
      return { error: "An error occurred while fetching portfolios" };
    }
  }

  async function approveTransaction(portfolioId, transactionId) {
    try {
      const accessToken = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");

      const response = await fetch(
        `http://localhost:3000/portfolios/${portfolioId}/transactions/${transactionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "access-token": accessToken,
            client: client,
            uid: uid,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessage(data.message);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error approving transaction:", error);
      // Handle error appropriately (show an error message, etc.)
      return { error: "An error occurred while approving transaction" };
    }
  }

  const handleMinimizeClicked = () => {
    setCurrentTab("Base");
    setViewClicked(false);
  };

  const handleAddPortfolioClicked = () => {
    setCurrentTab("Create");
  };

  const handleViewClicked = () => {
    setViewClicked(true);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const accessToken = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");

      const response = await fetch("http://localhost:3000/portfolios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": accessToken,
          client: client,
          uid: uid,
        },
        body: JSON.stringify({
          portfolio: {
            stock_symbol: symbol,
            quantity: quantity,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (response.ok) {
        // Handle success scenario
        console.log("Portfolio item added successfully!");
        // Clear the form after submission
        setCurrentTab("Base");
        setSymbol("");
        setQuantity("");

        fetchPortfolios();
      }
    } catch (error) {
      console.error("Error creating portfolio item:", error);
      // Handle error appropriately
    }
  }

  return (
    <>
      <div className="pb-4 relative">
        <div className="flex justify-between">
          <div className="self-center">
            <h1 className="text-3xl font-bold text-white flex items-center">
              My Portfolios
            </h1>
          </div>
          <div className="self-center">
            {userData.account_pending ? (
              <>
                <h1
                  type="button"
                  className="text-xl font-medium text-white w-auto"
                >
                  Account is pending approval
                </h1>
              </>
            ) : (
              <>
                <h1
                  onClick={handleAddPortfolioClicked}
                  type="button"
                  className="text-xl cursor-pointer font-medium text-white w-auto hover:text-[#316c8c]"
                >
                  Add Portfolio
                </h1>
              </>
            )}
          </div>
        </div>
      </div>
      {isLoading ? (
        <DashboardLoading />
      ) : (
        <>
          <div className="bg-white p-6 rounded shadow">
            {currentTab == "Base" &&
              (viewClicked ? (
                <>
                  <div className="grid">
                    <img
                      onClick={handleMinimizeClicked}
                      className="justify-self-end cursor-pointer w-4 h-4"
                      src={Minimize}
                      alt="Profile"
                    />
                  </div>
                  <div className="grid grid-cols-2 pb-4">
                    <div className="">
                      <h1 className="pr-4 border-b border-r pb-4 text-xl text-slate-500">
                        Seller Transactions
                      </h1>
                    </div>
                    <div>
                      <h1 className="border-b pl-4 pb-4 text-xl text-slate-500">
                        Buyer Transactions
                      </h1>
                    </div>
                    <div className="pr-4 border-r">
                      <div className="text-slate-600 grid grid-cols-6 text-center border-b py-4">
                        <div>ID</div>
                        <div>Quantity</div>
                        <div>Price ($)</div>
                        <div>Amount ($)</div>
                        <div>Status</div>
                        <div>Actions</div>
                      </div>
                      <ul className="max-h-[120px] overflow-y-auto">
                        {sellerTransactions.length > 0 ? (
                          <></>
                        ) : (
                          <div className="py-2 text-slate-600">
                            No seller transactions listed for this portfolio.
                          </div>
                        )}

                        {sellerTransactions.map((transaction) => (
                          <li
                            className="h-[40px] grid grid-cols-6 items-center border-b"
                            key={transaction.id}
                          >
                            <div className="text-center self-center">
                              {transaction.id}
                            </div>
                            <div className="text-center self-center">
                              {transaction.quantity}
                            </div>
                            <div className="text-center self-center">
                              {transaction.price}
                            </div>
                            <div className="text-center self-center">
                              {transaction.amount}
                            </div>
                            <div className="text-center self-center">
                              {transaction.status}
                            </div>
                            {transaction.status == "pending" && (
                              <>
                                {" "}
                                {message ? (
                                  <div className="text-slate-400 text-sm text-center">
                                    Approved Successfully
                                  </div>
                                ) : (
                                  <>
                                    {" "}
                                    <button
                                      onClick={() =>
                                        approveTransaction(
                                          currentPortfolio,
                                          transaction.id
                                        )
                                      }
                                      className="px-8 py-2 text-white w-auto rounded-full bg-gray-400 hover:bg-[#316c8c]"
                                    >
                                      Approve
                                    </button>
                                  </>
                                )}
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pl-4">
                      <div className="text-slate-600 grid grid-cols-6 text-center border-b py-4">
                        <div>ID</div>
                        <div>Quantity</div>
                        <div>Price ($)</div>
                        <div>Amount ($)</div>
                        <div>Status</div>
                        <div>Actions</div>
                      </div>
                      <ul className="max-h-[200px] overflow-y-auto">
                        {buyerTransactions.length > 0 ? (
                          <></>
                        ) : (
                          <div className="py-2 text-slate-600">
                            No buyer transactions listed for this portfolio.
                          </div>
                        )}
                        {buyerTransactions.map((transaction) => (
                          <li
                            className="grid grid-cols-6 py-2 border-b"
                            key={transaction.id}
                          >
                            <div className="text-center">{transaction.id}</div>
                            <div className="text-center">
                              {transaction.quantity}
                            </div>
                            <div className="text-center">
                              {transaction.price}
                            </div>
                            <div className="text-center">
                              {transaction.amount}
                            </div>
                            <div className="text-center">
                              {transaction.status}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {myPortfolios ? (
                    <>
                      <div className="text-center items-center py-4 border-b grid grid-cols-6 text-slate-500">
                        <div>Portfolio ID</div>
                        <div>Coin Symbol</div>
                        <div>Portfolio Quantity</div>
                        <div>Coin Price</div>
                        <div>Total Value</div>
                        <div>Actions</div>
                      </div>
                      {myPortfolios.map((portfolio) => (
                        <div
                          key={portfolio.id}
                          className="text-center items-center py-4 border-b grid grid-cols-6"
                        >
                          <div>{portfolio.id}</div>
                          <div>{portfolio.stock_symbol}</div>
                          <div>{portfolio.quantity}</div>

                          <div>{portfolio.price}</div>
                          <div>{portfolio.total_amount}</div>
                          <div>
                            <button
                              onClick={() => fetchTransactions(portfolio.id)}
                              type="button"
                              className="px-4 py-1 text-white w-auto rounded-full bg-gray-400 hover:bg-[#316c8c]"
                            >
                              View Transactions
                            </button>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div>{message}</div>
                  )}
                </>
              ))}

            {currentTab == "Create" && (
              <>
                <div className="">
                  <div className="justify-between flex border-b pb-4">
                    <h1 className="text-xl text-slate-500 font-medium">
                      Adding a Portfolio
                    </h1>

                    <img
                      onClick={handleMinimizeClicked}
                      className="justify-self-end cursor-pointer w-4 h-4"
                      src={Minimize}
                      alt="Profile"
                    />
                  </div>
                  <div className="pt-4">
                    {" "}
                    <form
                      className="max-w-[500px] grid grid-cols-2 gap-4"
                      onSubmit={handleSubmit}
                    >
                      <input
                        className="border-none bg-slate-100"
                        type="text"
                        placeholder="Enter Coin Symbol here..."
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                      ></input>
                      <input
                        className="border-none bg-slate-100"
                        type="text"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      ></input>
                      <div>
                        <button
                          className="px-4 py-1 text-white w-auto rounded-full bg-gray-400 hover:bg-[#316c8c]"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
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
