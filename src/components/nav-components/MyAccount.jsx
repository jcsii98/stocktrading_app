import UserPng from "../../assets/user.png";

export default function MyAccount(props) {
  const { userData, userRole } = props;
  return (
    <>
      <div className="">
        <h2 className="pb-4 text-3xl font-bold text-white">
          {userRole === "admin" ? "Admin" : "Profile"} Information
        </h2>
        <div className="bg-white p-6 rounded shadow">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0">
              {" "}
              <img
                className="place-self-center w-20 h-20 rounded-full mr-4"
                src={UserPng}
                alt="Profile"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{userData.full_name}</h3>
              <p className="text-gray-600">{userData.email}</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Personal Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Username:</p>
                <p>{userData.user_name}</p>
              </div>

              {userRole === "user" && (
                <div>
                  <p className="text-gray-600">Balance:</p>
                  <p>{userData.wallet_balance}</p>
                  <p>{userData.pending_amount}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
