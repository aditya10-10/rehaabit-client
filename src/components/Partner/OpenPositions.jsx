const OpenPositions = () => {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-10 sm:px-10 sm:py-16 md:px-16 md:py-20 lg:px-20">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl capitalize font-bold text-center">
          Open Positions
        </h1>
        <span className="text-base sm:text-lg md:text-xl text-gray-500 text-center w-[90%] sm:w-[75%] md:w-[60%] lg:w-[50%]">
          We are always keen to meet talented folks and inquisitive minds. If you would like to catch-up or explore career opportunities with Rehaabit, please apply to one of the job opportunities below or send a quick email at career@rehaabit.com.
        </span>

        <a
          href="https://www.linkedin.com/company/rehaabit/jobs/"
          target="_blank"
          rel="noreferrer"
          className="text-purple-500 text-sm sm:text-lg"
        >
          View all openings on LinkedIn
        </a>
      </div>
    </div>
  );
};

export default OpenPositions;
