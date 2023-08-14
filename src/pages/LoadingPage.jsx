import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingPage() {
  return (
    <>
      <div className="bg-[#003049] w-full h-full flex flex-col items-center justify-center text-center text-white">
        <h1 className={"w-full text-3xl font-bold"}>
          Sample P2P Crypto Trading Platform
        </h1>
        <AiOutlineLoading3Quarters size={50} className="my-7 loading-icon" />
        <p className="text-gray-400">Loading...</p>
      </div>
    </>
  );
}
