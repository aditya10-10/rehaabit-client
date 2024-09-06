import { Link } from "react-router-dom";
import LogoDark from "../../assets/partner/LOGO_Dark.svg";
import Facebook from "../../assets/partner/facebook.svg";
import Instagram from "../../assets/partner/instagram.svg";
import Linkedin from "../../assets/partner/linkedin.svg";
import Twitter from "../../assets/partner/tweeter.svg";
import AppStore from "../../assets/partner/AppStore.svg";
import PlayStore from "../../assets/partner/playstore.svg";
import JoinRehaabitFamily from "./JoinRehaabitFamily";

const FooterColumn = ({ title, items, links }) => {
  return (
    <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full max-md:text-center">
      <nav className="flex relative flex-col grow text-sm leading-6 text-black-500 whitespace-nowrap max-md:mt-10">
        <h3 className="font-bold text-lg text-white">{title}</h3>
        {items.map((item, index) => (
          <Link
            to={links[index]}
            key={index}
            className="mt-4 text-white underline"
          >
            {!item.includes("/") ? item : <img src={item} alt="icon" />}
          </Link>
        ))}
      </nav>
    </div>
  );
};

const Footer = ({ JoinRehaabitFamilyText }) => {
  const footerData = [
    {
      title: "Company",
      items: ["About", "Careers", "Help", "Contact Us"],
      links: ["/about", "/careers", "/help", "/contact-us"],
    },
    {
      title: "For Partners",
      items: ["Privacy Policy", "Terms & Conditions", "Blog"],
      links: [
        "/partner/terms-and-conditions",
        "/partner/privacy-policy",
        "/blogs",
      ],
    },
    {
      title: "For Customers",
      items: ["Book a service"],
      links: ["https://rehaabit.com"],
    },
    {
      title: "Download App",
      items: [AppStore, PlayStore],
      links: [],
    },
    {
      title: "Contact Us",
      items: ["Call us", "+918928041978", "Email us", "support@rehaabit.com"],
      links: [],
    },
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
    <div className="relative flex items-center justify-center w-full bg-[#151613] h-[651px]">
      <JoinRehaabitFamily JoinRehaabitFamilyText={JoinRehaabitFamilyText} />

      <footer className="absolute bottom-0 right-0 left-0 flex flex-col justify-center mt-10">
        <section className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-14 w-full min-h-[250px] stroke-[74px] stroke-violet-500 max-md:px-5 max-md:max-w-full">
          <div className="relative flex-wrap gap-y-14 justify-between content-start w-full max-w-[1200px] max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-4/12 max-md:ml-0 max-md:w-full max-md:justify-center">
                <div className="flex relative flex-col grow pb-5 text-emerald-800 max-md:max-w-full">
                  <div className="flex gap-2 items-center max-md:justify-center">
                    <img
                      src={LogoDark}
                      alt="Rehaabit"
                      className="aspect-auto object-cover"
                    />
                  </div>
                  <div className="flex mt-6 text-lg leading-7 max-md:max-w-full max-md:justify-center">
                    <div className="flex gap-2 mt-1">
                      {socialMediaLinks.map((link) => {
                        const { id, icon, to } = link;

                        return (
                          <Link key={id} to={to} target="_blank">
                            <img src={icon} alt="icon" className="" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col ml-5 p-1 w-8/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-wrap grow w-full justify-evenly max-md:max-w-full">
                  <div className="flex gap-10 w-full pl-16 ml-11 max-md:pl-0 max-md:ml-0 max-md:flex-row">
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
            <div className="flex items-center flex-col mt-10 px-4">
              <span className="block text-center text-gray-600 dark:text-gray-400">
                © 2023-<span id="currentYear">2024</span>{" "}
                <span className="text-emerald-800">Rehaabit</span> is a
                registered trademark. All Rights Reserved.
              </span>
            </div>
          </div>
        </section>

        {/* <div className="flex items-center flex-col mt-10 px-4">
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
      </div> */}
      </footer>
    </div>
  );
};

export default Footer;
