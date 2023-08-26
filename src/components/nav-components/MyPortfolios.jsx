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
      fetchTransactions(portfolioId);
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
  const handleCancelClicked = () => {
    setCurrentTab("Base");
  };

  const handleViewClicked = () => {
    setViewClicked(true);
  };

  async function handleSubmit(event) {
    setMessage("Creating portfolio");
    setError();
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

      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        setError(responseData.errors);
      }

      if (response.ok) {
        // Handle success scenario

        console.log("Portfolio item added successfully!");
        // Clear the form after submission
        fetchPortfolios();
        setCurrentTab("Base");
        setSymbol("");
        setQuantity("");
        setMessage();
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
          <div className="self-center"></div>
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
                  <div className="grid grid-rows-[1fr,1fr] gap-4 h-[400px]">
                    <div className="">
                      <div className="flex justify-between">
                        <h1 className="pb-4 text-slate-700 text-3xl font-bold">
                          Seller Transactions
                        </h1>
                        <h1
                          onClick={handleMinimizeClicked}
                          className="text-slate-700 text-xl font-bold cursor-pointer"
                        >
                          Go back
                        </h1>
                      </div>

                      <div className="overflow-auto h-[130px]">
                        <table className="w-full table-auto">
                          <thead className="text-slate-500 font-medium">
                            <tr className="">
                              <th className="text-start">ID#</th>
                              <th className="text-start">Quantity</th>
                              <th className="text-end">Coin Price</th>
                              <th className="text-end">Total Value</th>
                              <th className="text-end">Status</th>
                              <th className="">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="">
                            {sellerTransactions.map((transaction) => (
                              <tr
                                key={transaction.id}
                                className="hover:bg-slate-100"
                              >
                                <td className="text-start">{transaction.id}</td>
                                <td className="text-start">
                                  {transaction.quantity}
                                </td>
                                <td className="text-end">
                                  {transaction.quantity}
                                </td>
                                <td className="text-end">
                                  {transaction.price}
                                </td>
                                <td className="text-end">
                                  {transaction.status}
                                </td>
                                <td className="">
                                  {transaction.status == "pending" && (
                                    <>
                                      <h1
                                        onClick={() =>
                                          approveTransaction(
                                            currentPortfolio,
                                            transaction.id
                                          )
                                        }
                                        className="cursor-pointer text-center"
                                      >
                                        Approve
                                      </h1>
                                    </>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="">
                      <h1 className="pb-4 text-slate-700 text-3xl font-bold">
                        Buyer Transactions
                      </h1>
                      <div className="overflow-auto h-[130px]">
                        <table className="w-full table-auto h-[100px]">
                          <thead className="text-slate-500 font-medium">
                            <tr className="">
                              <th className="text-start">ID#</th>
                              <th className="text-start">Quantity</th>
                              <th className="text-end">Coin Price</th>
                              <th className="text-end">Total Value</th>
                              <th className="text-end">Status</th>
                              <th className="">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="overflow-y-auto max-h-[120px]">
                            {buyerTransactions.map((transaction) => (
                              <tr
                                key={transaction.id}
                                className="hover:bg-slate-100"
                              >
                                <td className="text-start">{transaction.id}</td>
                                <td className="text-start">
                                  {transaction.quantity}
                                </td>
                                <td className="text-end">
                                  {transaction.quantity}
                                </td>
                                <td className="text-end">
                                  {transaction.price}
                                </td>
                                <td className="text-end">
                                  {transaction.status}
                                </td>
                                <td className="">
                                  {transaction.status == "pending" && (
                                    <>
                                      <h1
                                        onClick={() =>
                                          approveTransaction(
                                            currentPortfolio,
                                            transaction.id
                                          )
                                        }
                                        className="cursor-pointer text-center"
                                      >
                                        Approve
                                      </h1>
                                    </>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {myPortfolios ? (
                    <>
                      <div className="py-4">
                        <table className="mx-auto table-auto">
                          <thead className="text-slate-500 font-medium">
                            <tr className="border-b">
                              <th className="pr-4">ID#</th>
                              <th className="pr-12">Coin Symbol</th>
                              <th className="pl-4">Quantity</th>
                              <th className="pl-4">Coin Price</th>
                              <th className="pl-4">Total Value</th>
                              <th className="px-20">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="overflow-y-auto max-h-[350px]">
                            {myPortfolios.map((portfolio) => (
                              <tr
                                key={portfolio.id}
                                className="hover:bg-slate-100"
                              >
                                <td className="text-start">{portfolio.id}</td>
                                <td className="text-start">
                                  {portfolio.stock_symbol}
                                </td>
                                <td className="text-end">
                                  <div>{portfolio.quantity}</div>
                                </td>
                                <td className="text-end">
                                  <div>{portfolio.price}</div>
                                </td>
                                <td className="text-end">
                                  <div>{portfolio.total_amount}</div>
                                </td>

                                <td className="px-20">
                                  <button
                                    onClick={() =>
                                      fetchTransactions(portfolio.id)
                                    }
                                    type="button"
                                    className="border-[1.5px] rounded-md mx-2 px-2 text-sm cursor-pointer font-medium w-auto hover:border-[#316c8c]"
                                  >
                                    View
                                  </button>
                                  <button
                                    type="button"
                                    className="border-[1.5px] rounded-md mx-2 px-2 text-sm cursor-pointer font-medium w-auto hover:border-[#316c8c]"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    className="border-[1.5px] rounded-md mx-2 px-2 text-sm cursor-pointer font-medium w-auto hover:border-[#316c8c]"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <>
                      {userData.account_pending ? (
                        <div className="">
                          <h1 className="pb-4 text-slate-700 text-5xl font-bold">
                            Oops!
                          </h1>
                          <h1 className="pb-2 text-slate-500 text-3xl font-medium">
                            Your account is currently pending approval.
                          </h1>
                          <p className="text-slate-500 text-md">
                            You are temporarily unable to create a portfolio
                            until your account receives authorization. We
                            appreciate your understanding and patience during
                            this process. If you have any questions or require
                            further assistance, please don't hesitate to reach
                            out to our support team. Thank you for choosing our
                            platform.
                          </p>
                        </div>
                      ) : (
                        <div>
                          <h1 className="border-b pb-4 text-slate-700 text-3xl font-bold">
                            No portfolios
                          </h1>
                          <button
                            onClick={handleAddPortfolioClicked}
                            type="button"
                            className="mt-4 border-2 rounded-md px-4 py-1 text-xl cursor-pointer font-medium text-[#316c8c] w-auto hover:border-[#316c8c]"
                          >
                            Add Portfolio
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </>
              ))}

            {currentTab == "Create" && (
              <>
                <div className="">
                  <div className="justify-between flex border-b pb-4">
                    <h1 className="text-slate-700 text-3xl font-bold">
                      Create Portfolio
                    </h1>
                  </div>
                  <div className="pt-4">
                    {" "}
                    <form
                      className="max-w-[500px] grid grid-cols-2 gap-4"
                      onSubmit={handleSubmit}
                    >
                      <input
                        className="rounded-md border-none bg-slate-100"
                        type="text"
                        placeholder="Coin Symbol"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                      ></input>
                      <input
                        className="rounded-md border-none bg-slate-100"
                        type="text"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      ></input>
                      <div>
                        <div className="pb-2">
                          {" "}
                          {error && <div className="text-red-500">{error}</div>}
                        </div>
                        <button
                          className="border-2 rounded-md px-4 py-1 hover:border-[#316c8c] font-medium text-xl text-[#316c8c]"
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
          <div className="pt-4 border-t">
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
                <button
                  onClick={
                    currentTab === "Create"
                      ? handleCancelClicked
                      : handleAddPortfolioClicked
                  }
                  type="button"
                  className="border-2 rounded-md px-4 py-1 hover:border-white border-[#316c8c] font-medium text-xl text-white"
                >
                  {currentTab === "Create" ? "Cancel" : "Add Portfolio"}
                </button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
