import React from "react";
import AdminSigninForm from "../components/AdminSigninForm";

export default function AdminAuthPage(props) {
  const { setIsLoggedIn, setUserData } = props;
  return (
    <>
      <div className="flex max-w-[1240px] mx-auto">
        {" "}
        <article className="text-slate-400 prose lg:prose-xl">
          <h1 className="text-white">Welcome, Admin!</h1>
          <p>
            Explore the realm of P2P crypto trading and initiate direct
            exchanges of digital assets. Our advanced platform ensures
            transactions that are both secure and streamlined, offering you
            comprehensive control over your trading activities.
          </p>
          <p>
            Keep yourself updated with the most recent trends and insightful
            analyses within the crypto market. This knowledge empowers you to
            make well-informed choices and capitalize on advantageous prospects.
          </p>
        </article>
        <AdminSigninForm
          setUserData={setUserData}
          setIsLoggedIn={setIsLoggedIn}
        />
      </div>{" "}
    </>
  );
}
