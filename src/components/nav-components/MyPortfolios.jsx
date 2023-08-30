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
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  async function fetchPortfolios() {
    try {
      const accessToken = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");

      const response = await fetch(
        "https://stocktrading-api.onrender.com/portfolios/",
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
        `https://stocktrading-api.onrender.com/portfolios/${portfolioId}/transactions`,
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

  const handleEditClicked = (portfolioId) => {
    setError();
    setMessage();
    setCurrentTab("Edit");
    setCurrentPortfolio(portfolioId);
  };

  async function updatePortfolioQuantity(portfolioId, newQuantity) {
    setError();
    setNewQuantity("");
    setMessage(`Updating quantity for portfolio: ${portfolioId}`);
    try {
      const accessToken = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");

      const response = await fetch(
        `https://stocktrading-api.onrender.com/portfolios/${portfolioId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "access-token": accessToken,
            client: client,
            uid: uid,
          },
          body: JSON.stringify({ quantity: newQuantity }), // Sending the updated quantity
        }
      );
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setMessage();
        setError(data.errors);
      }

      if (data.status == "success") {
        setMessage(
          `Successfully updated portfolio quantity. New quantity: ${data.data.quantity}`
        );
        fetchPortfolios();
        setError();
      }
    } catch (error) {
      console.error("Error updating portfolio:", error);
      setError(data.errors);
    }
  }

  async function approveTransaction(portfolioId, transactionId) {
    setError();
    setMessage(`Approving Transaction: ${transactionId}`);
    try {
      const accessToken = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");

      const response = await fetch(
        `https://stocktrading-api.onrender.com/portfolios/${portfolioId}/transactions/${transactionId}`,
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
    setError();
    setMessage();
    setCurrentTab("Base");
    setViewClicked(false);
    setEditing(false);
  };

  const handleAddPortfolioClicked = () => {
    setError();
    setMessage();
    setCurrentTab("Create");
    setEditing(false);
  };

  const handleCancelClicked = () => {
    setMessage();
    setError();
    setEditing(false);
    setCurrentTab("Base");
  };

  const handleViewClicked = () => {
    setError();
    setMessage();
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

      const response = await fetch(
        "https://stocktrading-api.onrender.com/portfolios",
        {
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
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        setError(responseData.errors);
        setMessage();
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
      <div className="select-none pb-4 flex justify-between">
        <h2 className="text-3xl font-bold text-white">My Portfolios</h2>
        {!userData.account_pending && (
          <>
            <button
              onClick={
                currentTab === "Create"
                  ? handleCancelClicked
                  : handleAddPortfolioClicked
              }
              type="button"
              className="border-[1.5px] border-[#00000200] rounded-md px-4 text-xl cursor-pointer font-medium text-white w-auto hover:border-white"
            >
              {currentTab === "Create" ? "Cancel" : "Add Portfolio"}
            </button>
          </>
        )}
      </div>
      {isLoading ? (
        <DashboardLoading page="Your Portfolios" />
      ) : (
        <>
          <div className="bg-white p-6 rounded shadow">
            {currentTab == "Edit" && (
              <>
                <div className="justify-between flex">
                  <h1 className="text-slate-700 text-2xl font-bold">
                    Editing portfolio: {currentPortfolio}
                  </h1>
                </div>
                <div className="pt-4 max-h-[350px] overflow-y-auto">
                  <table className="w-full">
                    <thead className="select-none text-slate-500 font-medium bg-slate-200 h-[2rem]">
                      <tr className="text-xl table-fixed w-full table">
                        <th className="pl-2 text-start">ID#</th>
                        <th className="text-start">Symbol</th>
                        <th className="text-end">Quantity</th>
                        <th className="text-end">Stock Price (PHP)</th>
                        <th className="text-end pr-2">Total Value (PHP)</th>
                      </tr>
                    </thead>
                    <tbody className="block max-h-[300px] overflow-auto">
                      {myPortfolios.map((portfolio) => {
                        if (portfolio.id === currentPortfolio) {
                          return (
                            <tr
                              key={portfolio.id}
                              className="table-fixed table w-full h-[2rem] border-y hover:text-white text-slate-500 hover:bg-slate-500 bg-slate-100"
                            >
                              <td className="pl-2 font-thin text-start">
                                {portfolio.id}
                              </td>
                              <td className="font-thin text-start">
                                {portfolio.stock_symbol}
                              </td>
                              <td className="font-thin text-end">
                                <div>{portfolio.quantity}</div>
                              </td>
                              <td className="font-thin text-end">
                                <div>{portfolio.price}</div>
                              </td>
                              <td className="font-thin text-end pr-2">
                                <div>{portfolio.total_amount}</div>
                              </td>
                            </tr>
                          );
                        } else {
                          return null; // Skip rendering if not the current portfolio
                        }
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="pt-4">
                  {" "}
                  <form
                    className="max-w-[500px] flex flex-col"
                    onSubmit={(e) => {
                      e.preventDefault();
                      updatePortfolioQuantity(currentPortfolio, newQuantity);
                    }}
                  >
                    <input
                      className="rounded-md border-none bg-slate-100"
                      type="text"
                      placeholder="New Quantity"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                    ></input>
                    <div>
                      <div className="py-2">
                        {" "}
                        {message && (
                          <div className="text-slate-500">{message}</div>
                        )}
                        {error && <div className="text-red-500">{error}</div>}
                      </div>
                      <button
                        className="mr-4 border-2 rounded-md px-4 py-1 hover:border-black font-medium text-xl text-black border-[#316c8c00]"
                        type="submit"
                      >
                        Submit
                      </button>
                      <button
                        onClick={handleCancelClicked}
                        className="border-2 rounded-md px-4 py-1 hover:border-black font-medium text-xl text-black border-[#316c8c00]"
                        type="button"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
            {currentTab == "Base" &&
              (viewClicked ? (
                <>
                  <div className="flex flex-col">
                    <div className="border-b-[1.5px]">
                      <div className="select-none flex justify-between">
                        <h1 className="text-slate-700 text-3xl font-bold">
                          Seller Transactions
                        </h1>
                        <h1
                          onClick={handleMinimizeClicked}
                          className="text-slate-700 text-xl font-bold cursor-pointer"
                        >
                          Go back
                        </h1>
                      </div>
                      {sellerTransactions.length > 0 ? (
                        <>
                          <div className="py-4 max-h-[200px] overflow-y-auto">
                            <table className="w-full">
                              <thead className="select-none text-slate-500 font-medium bg-slate-200 h-[2rem]">
                                <tr className="text-xl table-fixed w-full table">
                                  <th className="pl-2 text-start">
                                    Transaction ID
                                  </th>
                                  <th className="text-start">Quantity</th>
                                  <th className="text-end">
                                    Stock Price (PHP)
                                  </th>
                                  <th className="text-end">
                                    Total Value (PHP)
                                  </th>
                                  <th className="text-end">Status</th>
                                  <th className="text-center">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="block max-h-[120px] overflow-auto">
                                {sellerTransactions.map((transaction) => (
                                  <tr
                                    className="table-fixed h-[2rem] w-full table border-y hover:bg-slate-500 bg-slate-100 hover:text-white font-normal"
                                    key={transaction.id}
                                  >
                                    <td className="pl-2 text-start">
                                      {transaction.id}
                                    </td>
                                    <td className="text-start">
                                      {transaction.quantity}
                                    </td>
                                    <td className="text-end">
                                      {transaction.price}
                                    </td>
                                    <td className="text-end">
                                      {transaction.amount}
                                    </td>
                                    <td className="text-end">
                                      {transaction.status}
                                    </td>
                                    <td className="text-center">
                                      {transaction.status == "pending" && (
                                        <>
                                          <button
                                            onClick={() =>
                                              approveTransaction(
                                                currentPortfolio,
                                                transaction.id
                                              )
                                            }
                                            className="select-none border-[1px] rounded-md mx-2 px-2 text-sm cursor-pointer font-medium w-auto hover:border-white border-[#00000000]"
                                          >
                                            Approve
                                          </button>
                                        </>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="select-none py-4 font-medium text-slate-500">
                            No seller transactions found.
                          </div>
                        </>
                      )}
                    </div>
                    <div className="pt-4">
                      <h1 className="select-none text-slate-700 text-3xl font-bold">
                        Buyer Transactions
                      </h1>
                      {buyerTransactions.length > 0 ? (
                        <>
                          <div className="py-4 max-h-[200px] overflow-y-auto">
                            <table className="w-full">
                              <thead className="select-none text-slate-500 font-medium bg-slate-200 h-[2rem]">
                                <tr className="text-xl table-fixed w-full table">
                                  <th className="pl-2 text-start">
                                    Transaction ID
                                  </th>
                                  <th className="text-start">Quantity</th>
                                  <th className="text-end">
                                    Stock Price (PHP)
                                  </th>
                                  <th className="text-end">
                                    Total Value (PHP)
                                  </th>
                                  <th className="text-center">Status</th>
                                </tr>
                              </thead>
                              <tbody className="block max-h-[150px] overflow-auto">
                                {buyerTransactions.map((transaction) => (
                                  <tr
                                    className="table-fixed h-[2rem] w-full table border-y hover:bg-slate-500 bg-slate-100 hover:text-white font-normal"
                                    key={transaction.id}
                                  >
                                    <td className="pl-2 text-start">
                                      {transaction.id}
                                    </td>
                                    <td className="text-start">
                                      {transaction.quantity}
                                    </td>
                                    <td className="text-end">
                                      {transaction.price}
                                    </td>
                                    <td className="text-end">
                                      {transaction.amount}
                                    </td>
                                    <td className="text-center">
                                      {transaction.status}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="select-none pt-4 font-medium text-slate-500">
                            No buyer transactions found.
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {myPortfolios ? (
                    <>
                      <div className="mb-4">
                        <div className="border-b-[1.5px] justify-between flex pb-4 mb-8">
                          <h1 className="select-none text-slate-700 text-3xl font-bold">
                            {userData.full_name}'s portfolios
                          </h1>
                        </div>
                        <div className="max-h-[350px] overflow-y-auto">
                          <table className="w-full">
                            <thead className="select-none text-slate-500 font-medium bg-slate-200 h-[2rem]">
                              <tr className="text-xl table-fixed w-full table">
                                <th className="pl-2 text-start">ID#</th>
                                <th className="text-start">Stock Symbol</th>
                                <th className="text-end">Quantity</th>
                                <th className="text-end">Stock Price (PHP)</th>
                                <th className="text-end">Total Value (PHP)</th>
                                <th className="text-center">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="block max-h-[300px] overflow-auto">
                              {myPortfolios.map((portfolio) => (
                                <tr
                                  key={portfolio.id}
                                  className="table-fixed table w-full h-[2rem] border-y hover:text-white text-slate-500 hover:bg-slate-500 bg-slate-100"
                                >
                                  <td className="pl-2 font-thin text-start">
                                    {portfolio.id}
                                  </td>
                                  <td className="font-thin text-start">
                                    {portfolio.stock_symbol}
                                  </td>
                                  <td className="font-thin text-end">
                                    <div>{portfolio.quantity}</div>
                                  </td>
                                  <td className="font-thin text-end">
                                    <div>{portfolio.price}</div>
                                  </td>
                                  <td className="font-thin text-end">
                                    <div>{portfolio.total_amount}</div>
                                  </td>

                                  <td className="select-none ">
                                    <div className="flex items-center justify-center">
                                      <button
                                        onClick={() =>
                                          fetchTransactions(portfolio.id)
                                        }
                                        type="button"
                                        className="border-[1.5px] border-[#316c8c00] rounded-md mx-2 px-2 cursor-pointer font-normal w-auto hover:border-white"
                                      >
                                        View
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleEditClicked(portfolio.id)
                                        }
                                        type="button"
                                        className="border-[1.5px] border-[#316c8c00] rounded-md mx-2 px-2 cursor-pointer font-normal w-auto hover:border-white"
                                      >
                                        Edit
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
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
                            className="mt-4 border-[#00000200] rounded-md px-4 py-1 text-xl cursor-pointer font-medium text-[#316c8c] w-auto hover:border-white"
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
                        placeholder="Stock Symbol"
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
                          {message && (
                            <div className="text-slate-500">{message}</div>
                          )}
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
        </>
      )}
    </>
  );
}
