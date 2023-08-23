import Down from "../../assets/down.png";
import Minimize from "../../assets/minimize.png";
import React, { useState, useEffect } from "react";
import DashboardLoading from "./DashboardLoading";

export default function MyPortfolios() {
  const [isLoading, setIsLoading] = useState(true);
  const [myPortfolios, setMyPortfolios] = useState([]);
  const [viewClicked, setViewClicked] = useState(false);
  const [buyerTransactions, setBuyerTransactions] = useState([]);
  const [sellerTransactions, setSellerTransactions] = useState([]);
  const [currentPortfolio, setCurrentPortfolio] = useState("");

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
      setMyPortfolios(data.data);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      // Handle error appropriately (show an error message, etc.)
      return { error: "An error occurred while fetching portfolios" };
    }
  }

  useEffect(() => {
    fetchPortfolios();
  }, []);

  async function fetchTransactions(portfolioId) {
    setCurrentPortfolio(portfolioId);

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
      setViewClicked(true);
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

      console.log(data);
      return data;
    } catch (error) {
      console.error("Error approving transaction:", error);
      // Handle error appropriately (show an error message, etc.)
      return { error: "An error occurred while approving transaction" };
    }
  }

  const handleMinimizeClicked = () => {
    setViewClicked(false);
  };

  return (
    <>
      <div className="pb-4 relative">
        <div className="flex">
          <div className="self-center">
            <h1 className="text-3xl font-bold text-white flex items-center">
              My Portfolios
            </h1>
          </div>
        </div>
      </div>
      {isLoading ? (
        <DashboardLoading />
      ) : (
        <>
          <div className="bg-white p-6 rounded shadow">
            {viewClicked ? (
              <>
                <div className="grid">
                  <img
                    onClick={handleMinimizeClicked}
                    className="justify-self-end cursor-pointer w-4 h-4"
                    src={Minimize}
                    alt="Profile"
                  />
                </div>
              </>
            ) : (
              <div className="text-center items-center py-4 border-b grid grid-cols-6 text-slate-500">
                <div>Portfolio ID</div>
                <div>Coin ID</div>
                <div>Portfolio Quantity</div>
                <div>Coin Price</div>
                <div>Total Value</div>
                <div>Actions</div>
              </div>
            )}

            {viewClicked ? (
              <>
                <>
                  <div className="grid grid-cols-2">
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
                      <ul className="max-h-[170px] overflow-y-auto">
                        {sellerTransactions.length > 0 ? (
                          <></>
                        ) : (
                          <div className="py-2 text-slate-600">
                            No seller transactions listed for this portfolio.
                          </div>
                        )}

                        {sellerTransactions.map((transaction) => (
                          <li
                            className="items-center py-2 border-b flex"
                            key={transaction.id}
                          >
                            <div className="text-center self-center pr-4">
                              ID: {transaction.id}
                            </div>
                            <div className="text-center self-center pr-4">
                              Quantity: {transaction.quantity}
                            </div>
                            <div className="text-center self-center pr-4">
                              Amount: {transaction.amount}
                            </div>
                            <div className="text-center self-center pr-4">
                              Status: {transaction.status}
                            </div>
                            {transaction.status == "pending" && (
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
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pl-4">
                      <ul className="max-h-[170px] overflow-y-auto">
                        {buyerTransactions.length > 0 ? (
                          <></>
                        ) : (
                          <div className="py-2 text-slate-600">
                            No buyer transactions listed for this portfolio.
                          </div>
                        )}
                        {buyerTransactions.map((transaction) => (
                          <li
                            className="py-2 border-b flex"
                            key={transaction.id}
                          >
                            <div className="pr-4">
                              Transaction ID: {transaction.id}
                            </div>
                            <div className="pr-4">
                              Quantity: {transaction.quantity}
                            </div>
                            <div className="pr-4">
                              Amount: {transaction.amount}
                            </div>
                            <div className="pr-4">
                              Status: {transaction.status}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              </>
            ) : (
              <>
                {myPortfolios.map((portfolio) => (
                  <div
                    key={portfolio.id}
                    className="text-center items-center py-4 border-b grid grid-cols-6"
                  >
                    <div>{portfolio.id}</div>
                    <div>{portfolio.stock_id}</div>
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
            )}
          </div>
        </>
      )}
    </>
  );
}
