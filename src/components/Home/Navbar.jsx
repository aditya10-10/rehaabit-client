import React from 'react';

const Navbar = ({ onLoginClick }) => {
  return (
    <header className="flex justify-center items-center px-16 py-2.5 w-full max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between items-center w-full max-w-[1221px] max-md:flex-wrap max-md:max-w-full">
        <img loading="lazy" src="https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041451/Demo/LOGO_1_fibezy.png" alt="Company logo" className="shrink-0 self-stretch aspect-[0.69] w-[47px]" />
        <nav className="flex gap-5 justify-center self-stretch my-auto text-sm text-black max-md:flex-wrap">
          <a href="#">Dummy text</a>
          <a href="#">Dummy text</a>
          <a href="#">Dummy text</a>
          <a href="#">Dummy text</a>
        </nav>
        <div className="flex gap-5 justify-center self-stretch my-auto">
          <button onClick={onLoginClick} className="flex gap-5 justify-center items-center py-1.5 pr-3 pl-3 my-auto text-base text-white whitespace-nowrap bg-red-400 rounded-[30px]">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/547777ca01f505c41e073cc20252f7a0100f7367d9fdd6b781cf18d04e24f65d?apiKey=14bc5a83475145d8890ac8c4aa074f6f&" alt="" className="shrink-0 w-5 aspect-square" />
            <span>Login</span>
          </button>
          <button className="flex justify-center items-center p-1 bg-emerald-500 h-[50px] rounded-[100px] w-[50px]">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/af9ee481dcd948d3726304bd37dc9045a176a58743d1fb7a35197718a1a55193?apiKey=14bc5a83475145d8890ac8c4aa074f6f&" alt="" className="aspect-[1.05] fill-white w-[21px]" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
