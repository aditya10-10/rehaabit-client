import { MdArrowOutward } from "react-icons/md";
import png1 from "../../assets/partner/eOym8ocxAKRkqB2LZGE4Inari8.webp";

const OurPartnerBenefits = ({ OurBenefitsText }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 sm:px-10 md:px-20 py-10 h-auto mt-10">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl capitalize font-bold">
            {OurBenefitsText.text1}
          </h1>
          <span className="text-lg sm:text-xl md:text-2xl text-gray-500 w-full sm:w-[90%]">
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
              <span className="text-2xl capitalize">
                {OurBenefitsText.text2}
              </span>
            </div>

            <div className="relative border gap-8 border-purple-100 rounded-3xl p-10">
              <span className="absolute top-4 right-4 border border-purple-500  rounded-full p-1 text-purple-500">
                <MdArrowOutward size={20} />
              </span>
              <span className="text-2xl capitalize ">
                {OurBenefitsText.text3}
              </span>
            </div>

            <div className="relative border border-purple-100 rounded-3xl p-6">
              <span className="absolute top-4 right-4 border border-purple-500 rounded-full p-1 text-purple-500">
                <MdArrowOutward size={20} />
              </span>
              <span className="text-2xl capitalize">
                {OurBenefitsText.text4}
              </span>
            </div>

            <div className="relative border border-purple-100 rounded-3xl p-6">
              <span className="absolute top-4 right-4 border border-purple-500 rounded-full p-1 text-purple-500">
                <MdArrowOutward size={20} />
              </span>
              <span className="text-2xl capitalize">
                {OurBenefitsText.text5}
              </span>
            </div>
          </div>

          {/* Image and Partner Stats */}
          <div className="relative flex justify-center items-center">
            <img
              src={png1}
              alt="png1"
              className="w-full max-w-[464px] h-auto"
            />
            <div className="absolute bottom-0 right-0 border border-purple-100 rounded-3xl p-6 h-44 w-56">
              <h1 className="font-bold text-3xl">1219+</h1>
              <span className="capitalize text-2xl text-gray-500">
                Partner joined
              </span>
            </div>

            <span className="absolute bottom-4 right-4 bg-purple-500 rounded-full p-1 text-white">
              <MdArrowOutward size={20} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurPartnerBenefits;
