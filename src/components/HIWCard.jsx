const HIWCard = ({ _id, point, icon, description }) => {
  return (
    <div key={_id} className="relative flex items-center gap-5">
      <div className="relative flex flex-col items-center">
        {/* Dashed Line */}
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-px z-0 border-l-2 border-dashed border-gray-500"></div>

        <div className="relative z-10 mt-4 bg-white">
          <img
            src={icon}
            alt="icon"
            className="p-3 rounded-full h-20 w-20 object-cover"
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
