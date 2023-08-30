import React, { useState, useEffect } from "react";
import DashboardLoading from "./DashboardLoading";

export default function Stocks() {
  const [stocksData, setStocksData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function fetchStocks() {
    try {
      console.log("Fetching Stocks");
      const accessToken = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");

      const response = await fetch(
        "https://stocktrading-api.onrender.com/stocks/",
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
      setStocksData(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      setIsLoading(false);
      return { error: "An error occurred while fetching portfolios" };
    }
  }
  useEffect(() => {
    const delayedFetch = setTimeout(() => {
      fetchStocks();
    }, 1500);

    return () => {
      clearTimeout(delayedFetch);
    };
  }, []);

  return (
    <>
      <div className="pb-4 relative">
        <div className="flex justify-between">
          <div className="self-center">
            <h1 className="text-3xl font-bold text-white flex items-center">
              Supported Stocks
            </h1>
          </div>
          <div className="self-center"></div>
        </div>
      </div>

      {isLoading ? (
        <>
          <DashboardLoading page="Stocks" />
        </>
      ) : (
        <>
          <div className="h-[450px] p-6 bg-white rounded">
            <div className="h-[400px] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-slate-200 text-slate-500 font-medium">
                  <tr className="my-4 text-xl table-fixed w-full table">
                    <th className="pl-4 text-start">Name</th>
                    <th className="pl-2 text-start">Symbol</th>
                    <th className="pr-4 text-end">PHP</th>
                  </tr>
                </thead>
                <tbody className="block h-[330px] overflow-auto">
                  {stocksData.map((stock) => (
                    <tr
                      className="table-fixed w-full table border-y text-slate-500 hover:text-white hover:bg-slate-500 bg-slate-100 font-normal"
                      key={stock.id}
                    >
                      <td className="pl-4 text-start">{stock.name}</td>
                      <td className="pl-4 border-x text-start">
                        {stock.symbol}
                      </td>
                      <td className="pr-2 text-end">{stock.usd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
