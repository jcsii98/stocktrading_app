import React, { useState, useEffect } from "react";

export default function PortfolioComponent(props) {
  const { portfolios, sortBy, onClick } = props;

  return (
    <>
      {" "}
      <div
        className="text-center py-4 border-b grid grid-cols-7 items-center"
        key={portfolios.id}
      >
        <div>{portfolios.id}</div>
        {sortBy == "By Coin" ? (
          <>
            <div>{portfolios.stock_id}</div>
            <div>{portfolios.user_id}</div>
          </>
        ) : (
          <>
            <div>{portfolios.user_id}</div>
            <div>{portfolios.stock_id}</div>
          </>
        )}

        <div>{portfolios.quantity}</div>
        <div>{portfolios.price}</div>
        <div>{portfolios.total_amount}</div>
        <div>
          <button
            onClick={onClick}
            type="button"
            className="px-4 py-1 text-white w-auto rounded-full bg-gray-400 hover:bg-[#316c8c]"
          >
            View
          </button>
        </div>
      </div>
    </>
  );
}
