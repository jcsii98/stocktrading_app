export default function Home(props) {
  const { userRole, userData } = props;
  return (
    <>
      {userRole === "admin" ? (
        <>
          <div className="flex justify-between text-white">
            <div className="w-[40%]">
              <h1 className="pb-4 text-3xl font-bold">
                Welcome to the Admin Dashboard
              </h1>
              <h2 className="pb-4 text-xl text-slate-400">
                You have entered the administrative realm, where you hold the
                power to manage and oversee various aspects of the platform.
                From user accounts to content moderation, your role ensures the
                smooth operation and growth of our community.
              </h2>
              <h2 className="pb-4 text-xl text-slate-400">
                Navigate through the intuitive interface to access crucial tools
                and insights that empower you to make informed decisions and
                maintain a secure environment. Your contributions are pivotal in
                shaping the platform's success.
              </h2>
              <h2 className="pb-4 text-xl text-slate-400">
                Should you have any questions or require assistance, don't
                hesitate to explore the resources at your disposal or reach out
                to our support team. Thank you for your dedication and
                commitment to our mission.
              </h2>
              <h2 className="pb-4 text-xl text-slate-400">Happy adminning!</h2>
            </div>
            <div className="rounded p-6 overflow-y-scroll max-h-[550px]">
              <div>
                <h1 className="pb-4 text-xl font-bold">Changelogs</h1>
                <div className="mb-2 text-md text-slate-400">
                  Improved user profile page layout for better navigation and
                  visibility.
                </div>
                <div className="mb-2 text-md text-slate-400">
                  Enhanced order confirmation process with real-time updates.
                </div>
                <div className="mb-2 text-md text-slate-400">
                  Added new cryptocurrencies for trading: Litecoin (LTC) and
                  Cardano (ADA).
                </div>
                <div className="mb-2 text-md text-slate-400">
                  Optimized search functionality to provide quicker results.
                </div>
                <div className="mb-2 text-md text-slate-400">
                  Fixed minor bugs and improved overall platform stability.
                </div>
              </div>
              <div>
                <h1 className="pb-4 text-xl font-bold">Changelogs</h1>
                <div className="mb-2 text-md text-slate-400">
                  Improved user profile page layout for better navigation and
                  visibility.
                </div>
                <div className="mb-2 text-md text-slate-400">
                  Enhanced order confirmation process with real-time updates.
                </div>
                <div className="mb-2 text-md text-slate-400">
                  Added new cryptocurrencies for trading: Litecoin (LTC) and
                  Cardano (ADA).
                </div>
                <div className="mb-2 text-md text-slate-400">
                  Optimized search functionality to provide quicker results.
                </div>
                <div className="mb-2 text-md text-slate-400">
                  Fixed minor bugs and improved overall platform stability.
                </div>
              </div>
              <div>
                <h1 className="pb-4 text-xl font-bold">Changelogs</h1>
                <div className="mb-2 text-md text-slate-400">
                  Improved user profile page layout for better navigation and
                  visibility.
                </div>
                <div className="mb-2 text-md text-slate-400">
                  Enhanced order confirmation process with real-time updates.
                </div>
                <div className="mb-2 text-md text-slate-400">
                  Added new cryptocurrencies for trading: Litecoin (LTC) and
                  Cardano (ADA).
                </div>
                <div className="mb-2 text-md text-slate-400">
                  Optimized search functionality to provide quicker results.
                </div>
                <div className="mb-2 text-md text-slate-400">
                  Fixed minor bugs and improved overall platform stability.
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="pb-4">
            <h1 className="pt-4 text-3xl font-bold text-white">
              Welcome to your personal Crypto trading platform.
            </h1>
          </div>
          {userData.account_pending ? (
            <h2 className="pb-4 text-xl text-slate-400">
              Your account is currently pending approval. You will receive an
              email once it is approved.
            </h2>
          ) : (
            <h2 className="pb-4 text-xl text-slate-400">
              Your account has been approved. You can now add portfolios to
              start trading.
            </h2>
          )}
        </>
      )}
    </>
  );
}
