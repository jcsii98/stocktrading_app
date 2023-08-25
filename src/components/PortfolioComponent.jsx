import React, { useState, useEffect } from "react";

export default function PortfolioComponent(props) {
  const { portfolios, sortBy, onClick, userData, portfolioDetails } = props;

  return (
    <>
      {" "}
      <div
        className="text-center py-2 border-b grid grid-cols-7 items-center"
        key={portfolios.id}
      >
        {" "}
        <div>{portfolios.user_id}</div>
        <div>{portfolios.id}</div>
        <div>{portfolios.stock_symbol}</div>
        <div>{portfolios.price}</div>
        <div>{portfolios.quantity}</div>
        <div>{portfolios.total_amount}</div>
        <div>
          {userData.id == portfolios.user_id ? (
            <div className="text-sm text-slate-500">
              See My Portfolios for more info on this portfolio.
            </div>
          ) : (
            <>
              <button
                onClick={onClick}
                type="button"
                className="px-4 py-1 text-white w-auto rounded-full bg-gray-400 hover:bg-[#316c8c]"
              >
                View
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
