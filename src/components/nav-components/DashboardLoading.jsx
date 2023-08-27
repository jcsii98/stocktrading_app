import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscLoading } from "react-icons/vsc";
export default function DashboardLoading(props) {
  const { page } = props;
  return (
    <>
      <div className="bg-white p-6 rounded shadow select-none">
        {" "}
        <div className="py-6">
          <div className="text-center text-5xl font-bold">Loading {page}</div>
          <div className="flex flex-col justify-center items-center">
            <VscLoading size={50} className="my-7 loading-icon" />
          </div>
          <div className="text-center text-xl font-bold">
            Please wait a moment.
          </div>
        </div>
      </div>
    </>
  );
}
