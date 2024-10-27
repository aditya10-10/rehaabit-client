import { Helmet } from "react-helmet-async";
import {
  Benefits,
  FAQ,
  Footer,
  Hero,
  Navbar,
  OurExperiences,
  OurPartnerBenefits,
  WhyChooseRehaabit,
} from "../components/Partner";
import React, { useEffect } from "react";

const PartnerPage = () => {
  const HeroSectionText = {
    text1: "Transform Your Expertise into Income!",
    text2:
      "Join Rehaabit Today – Where Home Service Pros Connect with Clients Effortlessly.",
  };

  const WhyChooseText = {
    text1:
      "Rehaabit connects you with a steady stream of clients, offering flexible work schedules and seamless business management, all while boosting your earnings and reputation.",
    text2: "Boost Your Earnings",
    text3:
      "Maximize your income by reaching more clients without the hassle of marketing and customer acquisition.",
    text4: "Flexible Work Schedule",
    text5:
      "Work on your own terms. Choose the jobs that fit your schedule and expertise, giving you full control over your work-life balance.",
    text6: "Expand Your Client Base",
    text7:
      "Tap into a vast network of clients actively seeking professional home services, ensuring a steady flow of work.",
  };

  const BenefitsText = {
    text1: "We Offer You Success in Every Home You Serve.",
    text2:
      "If your goal is mastering your craft, growing your business, or reaching more clients, Rehaabit is the platform for you!",
    text3: "Expert Network",
    text4: "Job Flexibility",
    text5: "Skill Growth",
    text6: "Reliable Earnings",
  };

  const OurBenefitsText = {
    text1: "Our Partner Benefits",
    text2: "Secure Payments",
    text3: "Customer Connections",
    text4: "Professional Tools",
    text5: "Flexible Scheduling",
  };

  const JoinRehaabitFamilyText = {
    text1:
      "Plumbing jobs or electrical work can boost your income. Professional connections stimulate business growth that may advance your career.",
  };

  const faqs = [
    {
      id: 1,
      question: "How do I get started on the Rehaabit Platform?",
      answer:
        "Getting started is easy! Simply sign up, create your professional profile, and start browsing job opportunities. You can showcase your skills, set your availability, and connect with clients looking for your expertise.",
    },
    {
      id: 2,
      question: "How does Rehaabit Platform help me find clients?",
      answer:
        "Our platform matches your skills and availability with homeowners' needs. We promote your services, handle booking logistics, and provide tools to manage your projects efficiently, helping you focus on what you do best.",
    },
    {
      id: 3,
      question: "What types of home services can I offer on the platform?",
      answer:
        "We welcome a wide range of professionals, including plumbers, electricians, carpenters, painters, landscapers, cleaners, and more. If you provide a home-related service, there's likely a place for you on our platform.",
    },
    {
      id: 4,
      question: "How does payment work?",
      answer:
        "We ensure secure and timely payments for all completed jobs. Clients pay through our platform, and we transfer the funds to you, minus a small service fee. This system provides financial protection and peace of mind for both you and your clients.",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex w-screen min-h-screen font-lato flex-col bg-white overflow-x-hidden">
      <Helmet>
        <title>
          Become a Rehaabit Partner and Grow Your Home Service Business
        </title>
        <meta
          name="description"
          content="Partner with Rehaabit to grow your home service business. Join our trusted network, collaborate on quality services, and unlock new opportunities to expand your reach."
        />
        <meta
          name="keywords"
          content="Rehaabit partners, home service company, partnership with Rehaabit, home service professionals, business growth, Rehaabit network membership, service provider partnerships, collaboration with Rehaabit, home services cooperation."
        />
      </Helmet>
      <Navbar />
      <Hero HeroSectionText={HeroSectionText} />
      <WhyChooseRehaabit WhyChooseText={WhyChooseText} />
      <Benefits BenefitsText={BenefitsText} />
      <OurPartnerBenefits OurBenefitsText={OurBenefitsText} />
      <FAQ faqs={faqs} />
      <OurExperiences />
      <Footer JoinRehaabitFamilyText={JoinRehaabitFamilyText} />
    </div>
  );
};

export default PartnerPage;
