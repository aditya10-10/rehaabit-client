import svg1 from "../../assets/partner/svg-637557500_4658.svg";
import svg2 from "../../assets/partner/svg-1996763786_1517.svg";
import svg3 from "../../assets/partner/svg1742727197_3467.svg";

const WhyChooseRehaabit = () => {
  return (
    <div className="flex flex-col items-center justify-center px-20 py-20 h-[713px]">
      <div className="flex flex-col items-center justify-center w-[40%]">
        <h1 className="font-bold text-3xl capitalize">Why choose rehaabit?</h1>
        <span className="text-xl text-gray-500 text-center">
          Rehaabit connects you with a steady stream of clients, offering
          flexible work schedules and seamless business management, all while
          boosting your earnings and reputation.
        </span>
      </div>

      <div className="grid grid-cols-3 gap-10 mt-20 px-20">
        <div className="border border-purple-100 p-6 rounded-3xl">
          <img src={svg1} alt="SVG" />

          <h1 className="text-2xl font-[500] capitalize my-4">Boost Your earnings</h1>

          <span className="text-lg text-gray-500">
            Maximize your income by reaching more clients without the hassle of
            marketing and customer acquisition.
          </span>
        </div>

        <div className="border border-purple-100 p-6 rounded-3xl">
          <img src={svg2} alt="SVG" />

          <h1 className="text-2xl font-[500] capitalize my-4">Flexible Work schedule</h1>

          <span className="text-lg text-gray-500">
            Work on your own terms. Choose the jobs that fit your schedule and
            expertise, giving you full control over your work-life balance.
          </span>
        </div>

        <div className="border border-purple-100 p-6 rounded-3xl">
          <img src={svg3} alt="SVG" />

          <h1 className="text-2xl font-[500] capitalize my-4">expand your client base</h1>

          <span className="text-lg text-gray-500">
            Tap into a vast network of clients actively seeking professional
            home services, ensuring a steady flow of work.
          </span>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseRehaabit;
