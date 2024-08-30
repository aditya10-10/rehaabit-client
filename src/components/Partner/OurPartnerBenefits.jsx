import { MdArrowOutward } from "react-icons/md";
import png1 from "../../assets//partner/eOym8ocxAKRkqB2LZGE4Inari8.png.svg";

const OurPartnerBenefits = ({OurBenefitsText}) => {
  return (
    <div className="flex flex-col items-center justify-center px-20 py-20 h-[1023px]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl capitalize font-bold">{OurBenefitsText.text1}</h1>
        <span className="text-2xl text-gray-500 text-center w-[90%]">
          Join the service revolution, your skills, your success!
        </span>
      </div>

      <div className="grid grid-cols-2 gap-5 mt-10">
        <div className="grid grid-cols-2 gap-5">
          <div className="relative border border-purple-500 rounded-3xl p-6">
            <span className="absolute top-4 right-4 bg-purple-500 rounded-full p-1 text-white">
              <MdArrowOutward size={20} />
            </span>
            <span className="absolute bottom-4 left-6 text-3xl capitalize">
            {OurBenefitsText.text2}
            </span>
          </div>

          <div className="relative border border-purple-100 rounded-3xl p-6">
            <span className="absolute top-4 right-4 border border-purple-500 rounded-full p-1 text-purple-500">
              <MdArrowOutward size={20} />
            </span>
            <span className="absolute bottom-4 left-6 text-3xl capitalize">
            {OurBenefitsText.text3}
            </span>
          </div>

          <div className="relative border border-purple-100 rounded-3xl p-6">
            <span className="absolute top-4 right-4 border border-purple-500 rounded-full p-1 text-purple-500">
              <MdArrowOutward size={20} />
            </span>
            <span className="absolute bottom-4 left-6 text-3xl capitalize">
            {OurBenefitsText.text4}
            </span>
          </div>

          <div className="relative border border-purple-100 rounded-3xl p-6">
            <span className="absolute top-4 right-4 border border-purple-500 rounded-full p-1 text-purple-500">
              <MdArrowOutward size={20} />
            </span>
            <span className="absolute bottom-4 left-6 text-3xl capitalize">
            {OurBenefitsText.text5}
            </span>
          </div>
        </div>

        <div className="relative">
          <img src={png1} alt="png1" className="w-[464px] h-[452px]" />
          <div className="absolute bottom-0 right-0 border border-purple-100 rounded-3xl p-6 h-44 w-56">
            <h1 className="font-bold text-4xl">1219+</h1>
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
  );
};

export default OurPartnerBenefits;
