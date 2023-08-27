import React, { useState, useEffect } from "react";

export default function PortfolioComponent(props) {
  const {
    portfolios,
    sortBy,
    onClick,
    userData,
    portfolioDetails,
    userRole,
    handleFetchTransactions,
  } = props;

  return (
    <>
      {" "}
      <tr
        key={portfolios.id}
        className="table-fixed h-[2rem] w-full table border-y hover:bg-slate-500 bg-slate-100 hover:text-white font-normal"
      >
        <td className="pl-2 font-thin text-start">{portfolios.id}</td>
        <td className="font-thin text-start">{portfolios.user_id}</td>

        <td className="font-thin text-end">{portfolios.stock_symbol}</td>
        <td className="font-thin text-end">{portfolios.price}</td>
        <td className="font-thin text-end">{portfolios.quantity}</td>
        <td className="font-thin text-end">{portfolios.total_amount}</td>
        <td className="font-thin text-center">
          {userRole === "admin" && (
            <>
              <button
                onClick={() => handleFetchTransactions(portfolios.id)}
                type="button"
                className="border-[1px] rounded-md mx-2 px-2 text-sm cursor-pointer font-medium w-auto hover:border-white border-[#00000000]"
              >
                View Transactions
              </button>
            </>
          )}
          {userRole === "user" && (
            <>
              {userData.id == portfolios.user_id ? (
                <></>
              ) : (
                <>
                  <button
                    onClick={onClick}
                    type="button"
                    className="border-[1px] rounded-md mx-2 px-2 text-sm cursor-pointer font-medium w-auto hover:border-white border-[#00000000]"
                  >
                    Create Transaction
                  </button>
                </>
              )}
            </>
          )}
        </td>
      </tr>
      {/* <div
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
                className="border-[1px] rounded-md mx-2 px-2 text-sm cursor-pointer font-medium w-auto hover:border-[#316c8c]"
              >
                Create Transaction
              </button>
            </>
          )}
        </div>
      </div> */}
    </>
  );
}
