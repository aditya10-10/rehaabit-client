import React from 'react';
import logo from '../../assets/images/LOGO_1.png';

const FooterColumn = ({ title, items }) => {
  return (
    <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
      <nav className="flex relative flex-col grow text-sm leading-6 text-emerald-800 whitespace-nowrap max-md:mt-10">
        <h3>{title}</h3>
        {items.map((item, index) => (
          <a href="#" key={index} className="mt-4">
            {item}
          </a>
        ))}
      </nav>
    </div>
  );
};

const Footer = () => {
  const footerData = [
    {
      title: 'Company',
      items: ['About', 'Careers', 'Newsroom']
    },
    {
      title: 'Features',
      items: ['Quick', 'Services', 'Updates']
    },
    {
      title: 'Social',
      items: ['Twitter', 'Instagram', 'Threads']
    },
    {
      title: 'Legal',
      items: ['Terms', 'Privacy']
    }
  ];
  
  return (
    <footer className="flex flex-col justify-center bg-white mt-10">
      <section className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-14 w-full min-h-[250px] stroke-[74px] stroke-violet-500 max-md:px-5 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ef94769906f1f4c74b9fbaf58bc492a76b31756974778471429e8ec7a22e1ea6?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
          alt=""
          className="object-cover absolute inset-0 size-full"
        />
        <div className="relative flex-wrap gap-y-14 justify-between content-start w-full max-w-[1200px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-4/12 max-md:ml-0 max-md:w-full">
              <div className="flex relative flex-col grow pb-5 text-emerald-800 max-md:max-w-full">
                <div className='flex gap-2 items-center'>
                  <img src="https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041451/Demo/LOGO_1_fibezy.png" alt='Rehaabit' className='aspect-auto object-cover'/>
                  <h1 className="justify-center items-start max-w-full text-4xl whitespace-nowrap leading-[64px] w-[201px] max-md:pl-5">
                    Rehaabit
                  </h1>
                </div>
                <p className="mt-6 text-lg leading-7 max-md:max-w-full">
                  Home Solutions Simplified
                </p>
              </div>
            </div>

            <div className="flex flex-col ml-5 p-2 w-8/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-wrap grow w-full justify-evenly max-md:max-w-full">
                <div className="flex gap-5 w-full pl-16 ml-11 max-md:flex-col max-md:gap-0">
                  {footerData.map((column, index) => (
                    <FooterColumn key={index} title={column.title} items={column.items} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
