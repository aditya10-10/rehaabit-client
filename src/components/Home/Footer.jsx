import React from "react";
import logo from "../../assets/images/LOGO_1.png";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../assets/LOGO.svg";

const FooterColumn = ({ title, items, links }) => {
  return (
    <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full max-md:text-center">
      <nav className="flex relative flex-col grow text-sm leading-6 text-emerald-800 whitespace-nowrap max-md:mt-10">
        <h3>{title}</h3>
        {items.map((item, index) => (
          <Link to={links[index]} key={index} className="mt-4">
            {item}
          </Link>
        ))}
      </nav>
    </div>
  );
};

const Footer = () => {
  const footerData = [
    {
      title: "Company",
      items: ["About", "Careers", "Newsroom"],
      links: ["/about", "/careers", "/newsroom"],
    },
    {
      title: "Features",
      items: ["Quick", "Services", "Updates"],
      links: ["/quick", "/services", "/updates"],
    },
    {
      title: "Social",
      items: ["Twitter", "Instagram", "Threads"],
      links: [
        "https://twitter.com",
        "https://instagram.com",
        "https://threads.com",
      ],
    },
    {
      title: "Legal",
      items: ["Terms and Conditions", "Privacy and Policy"],
      links: ["/terms-and-conditions", "/privacy-policy"],
    },
  ];

  const socialMediaLinks = [
    {
      id: 1,
      icon: <FaFacebook />,
      to: "https://facebook.com",
    },
    {
      id: 2,
      icon: <FaGoogle />,
      to: "https://google.com",
    },
    {
      id: 3,
      icon: <FaTwitter />,
      to: "https://twitter.com",
    },
    {
      id: 4,
      icon: <FaYoutube />,
      to: "https://youtube.com",
    },
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
            <div className="flex flex-col w-4/12 max-md:ml-0 max-md:w-full max-md:justify-center">
              <div className="flex relative flex-col grow pb-5 text-emerald-800 max-md:max-w-full">
                <div className="flex gap-2 items-center max-md:justify-center">
                  <img
                    src={Logo}
                    alt="Rehaabit"
                    className="aspect-auto object-cover h-44"
                  />
                </div>
                <p className="flex mt-6 text-lg leading-7 max-md:max-w-full max-md:justify-center">
                  Home Solutions Simplified
                </p>
              </div>
            </div>

            <div className="flex flex-col ml-5 p-2 w-8/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-wrap grow w-full justify-evenly max-md:max-w-full">
                <div className="flex gap-5 w-full pl-16 ml-11 max-md:pl-0 max-md:ml-0 max-md:flex-row">
                  {footerData.map((column, index) => (
                    <FooterColumn
                      key={index}
                      title={column.title}
                      items={column.items}
                      links={column.links}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center flex-col mt-10 px-4">
        <span className="block text-center text-gray-600 dark:text-gray-400">
          © 2023-<span id="currentYear">2024</span>{" "}
          <span className="text-emerald-800">Rehaabit</span> is a registered
          trademark. All Rights Reserved.
        </span>

        <div className="flex gap-2 mt-1">
          {socialMediaLinks.map((link) => {
            const { id, icon, to } = link;

            return (
              <Link key={id} to={to} target="_blank">
                <span className="hover:text-[#0C7FDA]">{icon}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
