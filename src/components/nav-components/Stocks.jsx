import React, { useState, useEffect } from "react";

export default function Stocks() {
  const [stocksData, setStocksData] = useState([]);
  async function fetchStocks() {
    try {
      console.log("Fetching Stocks");
      const accessToken = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");

      const response = await fetch("http://localhost:3000/stocks/", {
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
      setStocksData(data.data);
    } catch (error) {
      console.error("Error fetching portfolios:", error);

      return { error: "An error occurred while fetching portfolios" };
    }
  }
  useEffect(() => {
    fetchStocks();
    const fetchInterval = setInterval(fetchStocks, 5 * 60 * 1000);

    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  return (
    <>
      <div>
        {stocksData.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {stocksData.map((stock) => (
              <li key={stock.id}>
                <h2>{stock.name}</h2>
                <p>Symbol: {stock.symbol}</p>
                <p>USD: {stock.usd}</p>
                {/* Render other stock information here */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
