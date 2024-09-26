import { useNavigate } from "react-router-dom";

const NothingToShow = ({ text, btnText }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-full shadow-custom-shadow rounded-lg h-[70vh]">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-6xl max-sm:text-4xl max-sm:text-center">Your {text} is Empty!</h1>
        {btnText !== "" && (
          <button
            className="uppercase bg-orange-500 hover:bg-orange-600 py-2 px-6 rounded-md text-white mt-6"
            onClick={() => navigate("/")}
          >
            Continue {btnText}
          </button>
        )}
      </div>
    </div>
  );
};

export default NothingToShow;
