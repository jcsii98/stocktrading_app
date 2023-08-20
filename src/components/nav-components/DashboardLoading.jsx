import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function DashboardLoading() {
  return (
    <>
      <div className="bg-white p-6 rounded shadow">
        {" "}
        <div className="flex flex-col justify-center items-center">
          <AiOutlineLoading3Quarters size={50} className="my-7 loading-icon" />
        </div>
      </div>
    </>
  );
}
