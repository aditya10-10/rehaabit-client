const ProgressBar = ({ progress }) => {
  return (
    <div className="relative">
      <div className="overflow-hidden h-6 mb-6 text-xs flex rounded bg-[#E9F5FE]">
        <div
          style={{ width: `${progress}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#0C7FDA]"
        >
          <span className="text-xs font-semibold inline-block px-2 uppercase rounded-full text-gray-700">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
