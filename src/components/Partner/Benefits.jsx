import png1 from "../../assets/partner/6x6WjgFVmDgU0TTEAt1Z39AOE.png.svg";
import png2 from "../../assets/partner/7RK4uNLdlULQ5W0ozQvljqeaw.png.svg";
import png3 from "../../assets/partner/sNkB7IB6mi9wAYmmOmDEpVRQ.png.svg";
import png4 from "../../assets/partner/gGRPNWntCuxJyX5rQbpX5dERMTM.png.svg";
import { MdArrowOutward } from "react-icons/md";

const Benefits = () => {
  return (
    <div
      className="flex flex-col p-20"
      style={{
        backgroundImage: `
        linear-gradient(to right, rgba(253, 96, 55, 0.12),rgba(117, 45, 220, 0.06),rgba(255, 255, 255, 0.06),rgba(117, 45, 220, 0.06),rgba(253, 96, 55, 0.06))`,
      }}
    >
      <div className="w-full flex justify-between">
        <h1 className="text-4xl font-bold w-[30%]">
          We Offer You Success in Every Home You Serve.
        </h1>
        <span className="text-lg text-gray-800 w-[40%]">
          If your goal is mastering your craft, growing your business, or
          reaching more clients, Rehaabit is the platform for you!
        </span>
      </div>

      <div className="flex gap-10 items-center justify-center">
        <div>
          <img src={png1} alt="Expert Network png" />

          <div className="flex items-center w-full justify-between py-4">
            <span className="text-2xl font-[500] capitalize">
              Expert network
            </span>
            <span className="bg-orange-500 rounded-full p-1 text-white">
              <MdArrowOutward size={20} />
            </span>
          </div>
        </div>

        <div className="mt-64">
          <img src={png2} alt="job flexibility png" />

          <div className="flex items-center w-full justify-between py-4">
            <span className="text-2xl font-[500] capitalize">
              job flexibility
            </span>
            <span className="bg-orange-500 rounded-full p-1 text-white">
              <MdArrowOutward size={20} />
            </span>
          </div>
        </div>

        <div className="mt-44">
          <img src={png3} alt="skill growth png" />

          <div className="flex items-center w-full justify-between py-4">
            <span className="text-2xl font-[500] capitalize">skill growth</span>
            <span className="bg-orange-500 rounded-full p-1 text-white">
              <MdArrowOutward size={20} />
            </span>
          </div>
        </div>

        <div className="mt-10">
          <img src={png4} alt="reliable earnings png" />

          <div className="flex items-center w-full justify-between py-4">
            <span className="text-2xl font-[500] capitalize">
              reliable earnings
            </span>
            <span className="bg-orange-500 rounded-full p-1 text-white">
              <MdArrowOutward size={20} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
