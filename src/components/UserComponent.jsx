import UserPng from "../assets/user.png";
export default function UserComponent(props) {
  const { user, onClick } = props;
  return (
    <>
      {" "}
      <div
        className="cursor-pointer place-self-center flex w-72 bg-slate-300 p-6 rounded shadow"
        onClick={onClick}
      >
        <img
          className="place-self-center w-14 h-14 rounded-full mr-4"
          src={UserPng}
          alt="Profile"
        />
        <div className="flex flex-col justify-start text-left">
          <div className="text-black text-md">{user.user_name}</div>
          <div className="text-slate-600 text-sm">User ID: {user.id}</div>
          <div className="text-slate-600 text-sm">Email: {user.email}</div>
          <div className="text-slate-600 text-sm">
            Account Status: {user.account_pending ? "Pending" : "Approved"}
          </div>
          <div className="text-slate-600 text-sm">
            Member since:{" "}
            {new Date(user.created_at).toLocaleDateString("en-US")}
          </div>
        </div>
      </div>
    </>
  );
}
