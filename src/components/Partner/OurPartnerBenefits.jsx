import { MdArrowOutward } from "react-icons/md";
const OurPartnerBenefits = ({ OurBenefitsText }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 sm:px-10 md:px-20 py-10 h-auto mt-10">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl capitalize font-bold">
            {OurBenefitsText.text1}
          </h2>
          <span className="text-lg sm:text-lg md:text-2lg text-gray-500 w-full sm:w-[90%]">
            Join the service revolution, your skills, your success!
          </span>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative border border-purple-500 rounded-3xl p-6">
              <span className="absolute top-4 right-4 bg-purple-500 rounded-full p-1 text-white">
                <MdArrowOutward size={20} />
              </span>
              <h3 className="text-2xl capitalize">{OurBenefitsText.text2}</h3>
            </div>

            <div className="relative border gap-8 border-purple-100 rounded-3xl p-10">
              <span className="absolute top-4 right-4 border border-purple-500  rounded-full p-1 text-purple-500">
                <MdArrowOutward size={20} />
              </span>
              <h3 className="text-2xl capitalize ">{OurBenefitsText.text3}</h3>
            </div>

            <div className="relative border border-purple-100 rounded-3xl p-6">
              <span className="absolute top-4 right-4 border border-purple-500 rounded-full p-1 text-purple-500">
                <MdArrowOutward size={20} />
              </span>
              <h3 className="text-2xl capitalize">{OurBenefitsText.text4}</h3>
            </div>

            <div className="relative border border-purple-100 rounded-3xl p-6">
              <span className="absolute top-4 right-4 border border-purple-500 rounded-full p-1 text-purple-500">
                <MdArrowOutward size={20} />
              </span>
              <h3 className="text-2xl capitalize">{OurBenefitsText.text5}</h3>
            </div>
          </div>

          {/* Image and Partner Stats */}
          <div className="relative flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/duizbchmz/image/upload/v1732437117/Screenshot_2024-10-24_202625_hd4kz4.png"
              alt="Diverse group of people joining hands in a circle, symbolizing unity and teamwork"
              className="w-full max-w-[464px] h-auto object-contain"
            />

            {/* Ensure the parent container is relative and inner div is absolute */}
            {/* <div className="absolute bottom-4 right-0 lg:right-[19%]  sm:right-[5%] md:right-[11%] max-sm:right-[4%] max-sm:h-[160px]    border border-purple-100 rounded-3xl p-6 h-auto w-[220px] md:w-[220px] lg:w-[220px] lg:h-[160px]">
              <h1 className="font-bold text-3xl">1219+</h1>
              <span className="capitalize text-2xl text-gray-500">
                Partner joined
              </span>
              <span className="absolute bottom-4 right-4 bg-purple-500 rounded-full p-1 text-white">
                <MdArrowOutward size={20} />
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default OurPartnerBenefits;
