import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Quote from "../../assets/partner/quote.svg";
import png1 from "../../assets/partner/X94yM6Vbr2CAwfsQFuA0SX7awg.png.svg";

const OurExperiences = () => {
  return (
    <div className="flex flex-col py-40 px-60 gap-20 h-[901px]">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold w-[20%] capitalize">
          Our Experiences customers satisfaction
        </h1>

        <div className="flex gap-4 items-center">
          <button className="border rounded-full p-2 text-gray-500">
            <GoArrowLeft size={20} />
          </button>

          <button className="border border-orange-500 text-white bg-orange-500 rounded-full p-2">
            <GoArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="p-6 border border-purple-500 rounded-3xl shadow-custom-shadow">
          <p>
            "Rehaabit has revolutionized my plumbing business. The steady stream
            of clients and easy-to-use scheduling tools have boosted my income
            and reduced my stress. It's a game-changer for any home service
            professional."
          </p>

          <div className="flex w-full items-center justify-between my-4">
            <div className="flex items-center w-full gap-4">
              <img src={png1} alt="" />
              <div className="flex flex-col">
                <span>Sarah M</span>
                <span>New York</span>
              </div>
            </div>

            <div className="flex">
              <img src={Quote} alt="" />
              <img src={Quote} alt="" />
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-3xl">
          <p>
            "Rehaabit has revolutionized my plumbing business. The steady stream
            of clients and easy-to-use scheduling tools have boosted my income
            and reduced my stress. It's a game-changer for any home service
            professional."
          </p>

          <div className="flex w-full items-center justify-between my-4">
            <div className="flex items-center w-full gap-4">
              <img src={png1} alt="" />
              <div className="flex flex-col">
                <span>Sarah M</span>
                <span>New York</span>
              </div>
            </div>

            <div className="flex">
              <img src={Quote} alt="" />
              <img src={Quote} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full gap-2">
        <div className="border border-purple-500 bg-purple-500 rounded-full p-1"></div>
        <div className="border border-purple-500 rounded-full p-1"></div>
        <div className="border border-purple-500 rounded-full p-1"></div>
      </div>
    </div>
  );
};

export default OurExperiences;
