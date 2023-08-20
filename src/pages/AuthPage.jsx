import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";
import React, { useState } from "react";

export default function AuthPage(props) {
  const { showSignin, setShowSignin } = props;
  return (
    <>
      <div className="flex max-w-[1240px] mx-auto mt-4">
        {" "}
        <article className="text-slate-400 prose lg:prose-xl">
          <h1 className="text-white">New to Crypto Trading?</h1>
          <p>
            Dive into the world of P2P crypto trading and start exchanging
            digital assets directly. Our platform ensures secure and hassle-free
            transactions, putting you in control of your trades.
          </p>
          <p>
            Stay up-to-date with the latest trends and insights in the crypto
            market, so you can make informed decisions and take advantage of
            opportunities.
          </p>
        </article>
        {showSignin ? (
          <SigninForm setShowSignin={setShowSignin} />
        ) : (
          <SignupForm setShowSignin={setShowSignin} />
        )}
      </div>{" "}
    </>
  );
}
