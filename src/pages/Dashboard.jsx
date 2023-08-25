import Home from "../components/nav-components/Home";
import MyAccount from "../components/nav-components/MyAccount";
import Users from "../components/nav-components/Users";
import Portfolios from "../components/nav-components/Portfolios";
import MyPortfolios from "../components/nav-components/MyPortfolios";
import Stocks from "../components/nav-components/Stocks";
export default function Dashboard(props) {
  const { userData, userPending, currentPage, userRole } = props;

  return (
    <>
      <div className="w-full h-auto">
        <div className="max-w-[1240px] mx-auto">
          {/* global nav items */}
          {currentPage === "Home" && (
            <Home userRole={userRole} userData={userData} />
          )}
          {currentPage === "Stocks" && <Stocks />}
          {currentPage === "Portfolios" && (
            <Portfolios userRole={userRole} userData={userData} />
          )}
          {currentPage === "My Account" && (
            <MyAccount userRole={userRole} userData={userData} />
          )}
          {userRole == "admin" && (
            <>
              {/* admin only nav items */}
              {currentPage === "Users" && <Users />}
            </>
          )}

          {userRole == "user" && (
            <>
              {/* user only nav items */}
              {currentPage === "My Portfolios" && <MyPortfolios />}
            </>
          )}
        </div>
      </div>
    </>
  );
}
