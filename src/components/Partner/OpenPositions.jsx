const OpenPositions = () => {
  return (
    <div className="flex flex-col items-center justify-center px-20 py-20">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-4xl capitalize font-bold">Open Positions</h1>
        <span className="text-2xl text-gray-500 text-center w-[50%]">
          We are always keen to meet talented folks and inquisitive minds. If
          you would like to catch-up or explore career opportunities with
          Rehaabit; please apply to one of the job opportunities below or send a
          quick email at career@rehaabit.com.
        </span>

        <a
          href="https://www.linkedin.com/company/rehaabit/jobs/"
          target="_blank"
          className="text-purple-500 text-lg"
        >
          View all openings on LinkedIn
        </a>
      </div>
    </div>
  );
};

export default OpenPositions;
