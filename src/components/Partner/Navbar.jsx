import Logo from "../../assets/LOGO.svg";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-16 w-full max-md:px-5 max-md:flex-wrap max-md:max-w-full gap-2 max-sm:gap-0 max-sm:pb-4">
      <img
        loading="lazy"
        src={Logo}
        alt="Company logo"
        className="h-20 max-md:h-16 cursor-pointer"
      />

      <div className="flex gap-5 items-center"></div>
    </header>
  );
};

export default Navbar;
