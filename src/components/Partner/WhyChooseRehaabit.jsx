import svg1 from "../../assets/partner/svg-637557500_4658.svg";
import svg2 from "../../assets/partner/svg-1996763786_1517.svg";
import svg3 from "../../assets/partner/svg1742727197_3467.svg";

const WhyChooseRehaabit = ({ WhyChooseText }) => {
  return (
    <div className="flex flex-col items-center justify-center px-20 py-20 h-[713px]">
      <div className="flex flex-col items-center justify-center w-[40%]">
        <h1 className="font-bold text-3xl capitalize mb-4">
          Why choose rehaabit?
        </h1>
        <span className="text-l text-gray-500 text-center mt-4">
          {WhyChooseText.text1}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-10 mt-20 px-20">
        <div className="border border-purple-100 p-6 rounded-3xl">
          <img src={svg1} alt="SVG" />

          <h1 className="text-2xl font-[500] capitalize my-4">
            {WhyChooseText.text2}
          </h1>

          <span className="text-sm text-gray-500">{WhyChooseText.text3}</span>
        </div>

        <div className="border border-purple-100 p-6 rounded-3xl">
          <img src={svg2} alt="SVG" />

          <h1 className="text-2xl font-[500] capitalize my-4">
            {WhyChooseText.text4}
          </h1>

          <span className="text-sm text-gray-500">{WhyChooseText.text5}</span>
        </div>

        <div className="border border-purple-100 p-6 rounded-3xl">
          <img src={svg3} alt="SVG" />

          <h1 className="text-2xl font-[500] capitalize my-4">
            {WhyChooseText.text6}
          </h1>

          <span className="text-sm text-gray-500">{WhyChooseText.text7}</span>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseRehaabit;
