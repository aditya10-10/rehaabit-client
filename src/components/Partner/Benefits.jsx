import { MdArrowOutward } from "react-icons/md";

const Benefits = ({ BenefitsText }) => {
  return (
    <div
      className="flex flex-col p-20 h-fit"
      style={{
        backgroundImage: `
        linear-gradient(to right, rgba(253, 96, 55, 0.12),rgba(117, 45, 220, 0.06),rgba(255, 255, 255, 0.06),rgba(117, 45, 220, 0.06),rgba(253, 96, 55, 0.06))`,
      }}
    >
      <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-start">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold w-full lg:w-[30%] text-center lg:text-left mb-4 lg:mb-0">
          {BenefitsText.text1}
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-gray-800 w-full lg:w-[40%] text-center lg:text-left">
          {BenefitsText.text2}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row gap-4 items-center justify-center">
        {/* {div1} */}
        <div className="lg:mt-0 mt-8 w-auto ml-5">
          <img
            src="https://res.cloudinary.com/duizbchmz/image/upload/v1732437113/6x6WjgFVmDgU0TTEAt1Z39AOE_vwn0z5.webp"
            alt="Smiling woman with glasses working on a laptop with colleagues, representing expert guidance and support"
          />
          <div className="flex items-center w-full gap-20 py-4">
            <h3 className="text-xl md:text-2xl font-[500] capitalize">
              {BenefitsText.text3}
            </h3>
            <span className="bg-orange-500 rounded-full p-1 text-white">
              <MdArrowOutward size={20} />
            </span>
          </div>
        </div>

        {/* {div2} */}
        <div className="lg:mt-64 mt-8 ml-5">
          <img
            src="https://res.cloudinary.com/duizbchmz/image/upload/v1732437114/7RK4uNLdlULQ5W0ozQvljqeaw_njvrfc.webp"
            alt="Sticky note with 'Flexible Schedule' written on it, illustrating flexible work options"
          />
          <div className="flex items-center w-full gap-20 py-4">
            <h3 className="text-xl md:text-2xl font-[500] capitalize">
              {BenefitsText.text4}
            </h3>
            <span className="bg-orange-500 rounded-full p-1 text-white">
              <MdArrowOutward size={20} />
            </span>
          </div>
        </div>

        {/* {div3} */}
        <div className="lg:mt-44 mt-8 ml-5">
          <img
            src="https://res.cloudinary.com/duizbchmz/image/upload/v1732437116/sNkB7IB6mi9wAYmmOmDEpVRQ_kvyovl.webp"
            alt="Diagram with 'Skill' in the center surrounded by terms like experience, training, and knowledge, highlighting skill enhancement opportunities"
          />
          <div className="flex items-center w-full gap-20  py-4">
            <h3 className="text-xl md:text-2xl font-[500] capitalize">
              {BenefitsText.text5}
            </h3>
            <span className="bg-orange-500 rounded-full p-1 text-white">
              <MdArrowOutward size={20} />
            </span>
          </div>
        </div>

        {/* {div4} */}
        <div className="lg:mt-10 mt-8 ml-5">
          <img
            src="https://res.cloudinary.com/duizbchmz/image/upload/v1732437115/gGRPNWntCuxJyX5rQbpX5dERMTM_bta72q.webp"
            alt="Close-up of hands stacked on top of each other, symbolizing steady career growth and team support."
          />
          <div className="flex items-center w-full gap-20 py-4">
            <h3 className="text-xl md:text-2xl font-[500] capitalize">
              {BenefitsText.text6}
            </h3>
            <span className="bg-orange-500 rounded-full p-1 text-white">
              <MdArrowOutward size={20} />
            </span>
          </div>
        </div>
      </div>
      {/* <div className="bg-zinc-600 w-full h-[200px]"></div> */}
    </div>
  );
};

export default Benefits;
