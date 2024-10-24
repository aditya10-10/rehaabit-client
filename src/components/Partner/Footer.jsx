import { Link } from "react-router-dom";
import LogoDark from "../../assets/partner/transparentlogofordark.svg";
import Facebook from "../../assets/partner/facebook.svg";
import Instagram from "../../assets/partner/instagram.svg";
import Linkedin from "../../assets/partner/linkedin.svg";
import Twitter from "../../assets/partner/tweeter.svg";
import AppStore from "../../assets/partner/AppStore.svg";
import PlayStore from "../../assets/partner/playstore.svg";
import JoinRehaabitFamily from "./JoinRehaabitFamily";

const FooterColumn = ({ title, items, links }) => {
  return (
    <div className="flex flex-col max-md:w-full max-md:text-center">
      <h3 className="font-bold text-lg text-white mb-4">{title}</h3>
      <nav className="flex flex-col grow text-sm leading-6 text-white">
        {items.map((item, index) => (
          <Link
            to={links[index]}
            key={index}
            className="mt-2 hover:underline max-md:flex max-md:justify-center"
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
      links: ["/about-us", "/careers", "/help", "/contact-us"],
    },
    {
      title: "For Partners",
      items: ["Terms & Conditions", "Privacy Policy", "Blog"],
      links: [
        "/partner/terms-and-conditions",
        "/partner/privacy-policy",
        "/coming-soon",
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
      links: ["/coming-soon", "/coming-soon"],
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
    <div className="relative flex flex-col items-center justify-center mt-40 w-full bg-black text-white">
      <JoinRehaabitFamily JoinRehaabitFamilyText={JoinRehaabitFamilyText} />

      <footer className="w-full flex flex-col items-center py-10">
        <section className="flex flex-col  max-sm:mt-[350px] md:flex-row lg:mt-[200px] sm:mt-[500px] xs:mt-[400px] justify-center md:justify-between items-center md:items-start px-7 py-14 w-full max-w-[1200px] space-y-10 md:space-y-0">
          {/* Logo and Social Links */}
          <div className="flex flex-col items-center md:items-start md:w-4/12 space-y-6">
            <img
              src={LogoDark}
              alt="Rehaabit"
              className="aspect-auto object-cover max-w-[200px]"
            />
            <div className="flex gap-4">
              {socialMediaLinks.map((link) => (
                <Link key={link.id} to={link.to} target="_blank">
                  <img src={link.icon} alt="social-icon" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap  justify-center md:justify-start w-full md:w-8/12 gap-10">
            {footerData.map((column, index) => (
              <FooterColumn
                key={index}
                title={column.title}
                items={column.items}
                links={column.links}
              />
            ))}
          </div>
        </section>

        {/* Copyright Section */}
        <div className="text-center text-gray-400 mt-6">
          © {new Date().getFullYear()}{" "}
          <span className="text-emerald-800">Rehaabit</span> is a registered
          trademark. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
