import { Link } from "react-router-dom";
import LogoDark from "../../assets/bglogodarkfont.svg";
import Facebook from "../../assets/partner/facebook.svg";
import Instagram from "../../assets/partner/instagram.svg";
import Linkedin from "../../assets/partner/linkedin.svg";
import Twitter from "../../assets/partner/tweeter.svg";
import AppStore from "../../assets/partner/AppStore.svg";
import PlayStore from "../../assets/partner/playstore.svg";

const FooterColumn = ({ title, items, links }) => {
  return (
    <div className="flex flex-col max-md:w-full max-md:text-center">
      <nav className="flex flex-col grow text-sm leading-6 text-black-500 whitespace-nowrap">
        <h3 className="font-bold text-lg text-black">{title}</h3>
        {items.map((item, index) => (
          <Link
            to={links[index]}
            key={index}
            className="mt-4 text-black underline max-md:flex max-md:justify-center max-md:items-center"
          >
            {!item.includes("/") ? (
              item
            ) : (
              <img src={item} alt="icon" className="" />
            )}
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
      items: [
        "About Us",
        "Terms & Conditions",
        "Privacy Policy",
        "Cancellation & Refund Policy",
        "Careers",
      ],
      links: [
        "/about-us",
        "/terms-and-conditions",
        "/privacy-policy",
        "/cancellation-and-refund-policy",
        "/careers",
      ],
    },
    {
      title: "For Customers",
      items: ["Contact Us", "Help Center", "Blogs"],
      links: ["/contact-us", "/help", "/library"],
    },
    {
      title: "For Partners",
      items: ["Register as a professional"],
      links: ["/partner"],
    },
    {
      title: "Download App", // App section
      items: [AppStore, PlayStore],
      links: [],
    },
    // {
    //   title: "Contact Us",
    //   items: ["Call us", "+918928041978", "Email us", "support@rehaabit.com"],
    //   links: [],
    // },
  ];

  const socialMediaLinks = [
    {
      id: 1,
      icon: Facebook,
      to: "https://www.facebook.com/rehaabit/",
    },
    {
      id: 2,
      icon: Twitter,
      to: "https://x.com/rehaabit",
    },
    {
      id: 3,
      icon: Instagram,
      to: "https://www.instagram.com/rehaabit/",
    },
    {
      id: 4,
      icon: Linkedin,
      to: "https://www.linkedin.com/company/rehaabit/",
    },
  ];

  return (
    <footer className="flex flex-col justify-center bg-white mt-10">
      <section className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-14 w-full min-h-[250px] stroke-[74px] stroke-violet-500 max-md:px-5 max-md:min-h-[150px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ef94769906f1f4c74b9fbaf58bc492a76b31756974778471429e8ec7a22e1ea6?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
          alt="Background pattern"
          className="object-cover absolute inset-0 w-full h-full opacity-70"
        />
        <div className="relative flex-wrap gap-y-14 justify-between content-start w-full max-w-[1200px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            {/* Company logo and social links */}
            <div className="flex flex-col w-4/12 max-md:w-full max-md:justify-center max-md:items-center">
              <div className="flex relative flex-col grow pb-5 text-emerald-800">
                <div className="flex gap-2 items-center justify-start max-md:justify-center">
                  <img
                    src={LogoDark}
                    alt="Rehaabit Logo for light background"
                    className="aspect-auto object-cover max-md:w-2/3"
                  />
                </div>
                <div className="flex mt-6 text-lg leading-7 max-md:justify-center">
                  <div className="flex gap-2 mt-1">
                    {socialMediaLinks.map((link) => {
                      const { id, icon, to } = link;

                      return (
                        <Link key={id} to={to} target="_blank">
                          <img
                            src={icon}
                            alt="icon"
                            className="w-6 h-6 max-md:w-5 max-md:h-5"
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer columns */}
            <div className="flex flex-wrap justify-between gap-0 w-full max-w-7xl max-md:flex-col max-md:items-center max-md:w-full">
              {footerData.map((column, index) => (
                <div
                  key={index}
                  className="flex flex-col w-3/12 max-md:w-full max-md:text-center"
                >
                  <FooterColumn
                    title={column.title}
                    items={column.items}
                    links={column.links}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Copyright Section */}
          <div className="flex items-center flex-col mt-10 px-4 max-md:mt-5">
            <span className="block text-center text-gray-600 dark:text-gray-400 text-sm max-md:text-xs">
              © 2023-<span id="currentYear">2024</span>{" "}
              <span className="text-emerald-800">Rehaabit</span> is a registered
              trademark. All Rights Reserved.
            </span>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
