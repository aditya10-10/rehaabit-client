import { useEffect } from "react";
import {
  Benefits,
  FAQ,
  Footer,
  Hero,
  OpenPositions,
  OurExperiences,
  OurPartnerBenefits,
  ResumeSubmissionForm,
  WhyChooseRehaabit,
} from "../components/Partner";

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const HeroSectionText = {
    text1: "unlock your potential, build your future",
    text2: "Join Rehaabit Today - Where Careers Growth Meets Innovation",
  };

  const WhyChooseText = {
    text1:
      "Rehaabit connects you with a thriving network of industry leaders, offering flexible opportunities and seamless career management, all while boosting your professional growth and reputation.",
    text2: "Accelerate Your Careers",
    text3:
      "Maximize your potential by exploring new opportunities and advancing in your field with top-tier resources and support.",
    text4: "Work-Life Harmony",
    text5:
      "Enjoy the flexibility to design your own work schedule, allowing you to balance personal and professional life effortlessly.",
    text6: "Expand Your Network",
    text7:
      "Connect with a global network of professionals, opening doors to endless opportunities and collaborative ventures.",
  };

  const BenefitsText = {
    text1: "Empowering You to Succeed",
    text2:
      "Whether you’re aiming to sharpen your skills, expand your network, or seek new challenges, Rehaabit is the platform designed to elevate your career journey.",
    text3: "Expert Guidance",
    text4: "Flexibility at Its Best",
    text5: "Skill Enhancement",
    text6: "Steady Careers Growth",
  };

  const OurBenefitsText = {
    text1: "Our Careers Benefits",
    text2: "Reliable Earnings",
    text3: "Professional Development",
    text4: "Collaborative Community",
    text5: "Flexible Scheduling",
  };

  const JoinRehaabitFamilyText = {
    text1:
      "Ready to take your career to the next level? Join a community of professionals who are transforming their futures. Get started today!",
  };

  const faqs = [
    {
      id: 1,
      question: "Explore open jobs",
      answer:
        "Getting started is easy! Simply sign up, create your professional profile, and start browsing job opportunities. You can showcase your skills, set your availability, and connect with clients looking for your expertise.",
    },
    {
      id: 2,
      question: "submit application",
      answer:
        "Getting started is easy! Simply sign up, create your professional profile, and start browsing job opportunities. You can showcase your skills, set your availability, and connect with clients looking for your expertise.",
    },
    {
      id: 3,
      question: "application review",
      answer:
        "Getting started is easy! Simply sign up, create your professional profile, and start browsing job opportunities. You can showcase your skills, set your availability, and connect with clients looking for your expertise.",
    },
    {
      id: 4,
      question: "interview",
      answer:
        "Getting started is easy! Simply sign up, create your professional profile, and start browsing job opportunities. You can showcase your skills, set your availability, and connect with clients looking for your expertise.",
    },
    {
      id: 5,
      question: "offer",
      answer:
        "Getting started is easy! Simply sign up, create your professional profile, and start browsing job opportunities. You can showcase your skills, set your availability, and connect with clients looking for your expertise.",
    },
    {
      id: 6,
      question: "pre-onboard",
      answer:
        "Getting started is easy! Simply sign up, create your professional profile, and start browsing job opportunities. You can showcase your skills, set your availability, and connect with clients looking for your expertise.",
    },
    {
      id: 7,
      question: "hired",
      answer:
        "Getting started is easy! Simply sign up, create your professional profile, and start browsing job opportunities. You can showcase your skills, set your availability, and connect with clients looking for your expertise.",
    },
  ];

  return (
    <div className="flex w-screen min-h-screen font-lato flex-col bg-white overflow-x-hidden">
      <Hero HeroSectionText={HeroSectionText} />
      <WhyChooseRehaabit WhyChooseText={WhyChooseText} />
      <Benefits BenefitsText={BenefitsText} />
      <OurPartnerBenefits OurBenefitsText={OurBenefitsText} />
      <FAQ faqs={faqs} />
      <OpenPositions />
      <ResumeSubmissionForm />
      <Footer JoinRehaabitFamilyText={JoinRehaabitFamilyText} />
    </div>
  );
};

export default Careers;
