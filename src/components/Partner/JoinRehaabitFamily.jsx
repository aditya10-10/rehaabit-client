import Hero from "../../assets/partner/Hero.svg";
import { useLocation, useNavigate } from "react-router-dom";
import carrers from "../../assets/carrers/carrers.svg";
import HeroImage from "../../assets/partner/Hero.svg";

const JoinRehaabitFamily = ({ JoinRehaabitFamilyText }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="absolute w-full z-40 -top-40 flex items-center justify-center">
      <div className="flex rounded-3xl h-[368px] w-[1144px] bg-[#8937FF]">
        <div className="flex flex-col gap-10 p-10">
          <h1 className="text-white font-bold text-4xl capitalize">
            join the rehaabit family
          </h1>

          <p className="text-lg text-white">{JoinRehaabitFamilyText.text1}</p>

          <div>
            <button
              className="bg-white capitalize rounded-lg py-2 px-6"
              onClick={() => navigate("/partner-form/personal-information")}
            >
              Join Now
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute top-0 right-40 z-0">
            <div className="h-20 w-60 bg-[#974dff] rounded-br-full rounded-tl-full"></div>
            <div className="h-20 w-60 bg-[#974dff] rounded-br-full rounded-tl-full mt-[-10px]"></div>
            <div className="h-20 w-60 bg-[#974dff] rounded-br-full rounded-tl-full mt-[-10px]"></div>
          </div>

          <div className="relative z-10">
            <img src={pathname==='/partner'?HeroImage:carrers} alt="hero" className={`relative z-10 w-[113rem] ${pathname==='/partner'?'':'-top-20'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRehaabitFamily;
