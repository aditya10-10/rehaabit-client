import svg1 from "../../assets/partner/svg-637557500_4658.svg";
import svg2 from "../../assets/partner/svg-1996763786_1517.svg";
import svg3 from "../../assets/partner/svg1742727197_3467.svg";

const WhyChooseRehaabit = ({ WhyChooseText }) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 lg:px-20 py-12 lg:py-20">
      {/* Heading Section */}
      <div className="flex flex-col items-center justify-center w-full lg:w-[40%] mb-12">
        <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl capitalize mb-4 text-center">
          Why choose rehaabit?
        </h2>
        <span className="text-base lg:text-lg text-gray-500 text-center mt-4">
          {WhyChooseText.text1}
        </span>
      </div>

      {/* SVG and Text Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 w-full lg:w-[80%]">
        <div className="border border-purple-100 p-6 rounded-3xl text-center">
          <img
            src={svg1}
            alt="SVG 1"
            className="mx-auto h-24 w-24 object-contain"
          />

          <h3 className="text-xl lg:text-2xl font-semibold capitalize my-4">
            {WhyChooseText.text2}
          </h3>

          <span className="text-sm lg:text-base text-gray-500">
            {WhyChooseText.text3}
          </span>
        </div>

        <div className="border border-purple-100 p-6 rounded-3xl text-center">
          <img
            src={svg2}
            alt="SVG 2"
            className="mx-auto h-24 w-24 object-contain"
          />

          <h3 className="text-xl lg:text-2xl font-semibold capitalize my-4">
            {WhyChooseText.text4}
          </h3>

          <span className="text-sm lg:text-base text-gray-500">
            {WhyChooseText.text5}
          </span>
        </div>

        <div className="border border-purple-100 p-6 rounded-3xl text-center">
          <img
            src={svg3}
            alt="SVG 3"
            className="mx-auto h-24 w-24 object-contain"
          />

          <h3 className="text-xl lg:text-2xl font-semibold capitalize my-4">
            {WhyChooseText.text6}
          </h3>

          <span className="text-sm lg:text-base text-gray-500">
            {WhyChooseText.text7}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseRehaabit;
