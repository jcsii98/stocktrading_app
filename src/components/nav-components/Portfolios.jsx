import Down from "../../assets/down.png";

export default function Portfolios() {
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
  return (
    <>
      <div className="relative">
        <h1 className="pb-4 text-3xl font-bold text-white flex items-center">
          Portfolios
          <img
            className="invert ml-2 cursor-pointer w-4 h-4"
            src={Down}
            alt="portfolios dropdown"
            onClick={toggleDropdown}
          />
        </h1>
      </div>
    </>
  );
}
