const HIWCard = ({ _id, point, icon, description }) => {
  return (
    <div key={_id} className="relative flex items-center gap-5">
      <div className="relative flex flex-col items-center">
        {/* Dashed Line */}
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-px z-0 custom-dashed-line"></div>

        <div className="relative z-10 bg-white mt-4">
          <img
            src={icon}
            alt="icon"
            className="bg-gray-200 p-3 rounded-full h-16 w-16"
          />
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <span>{point}</span>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default HIWCard;
