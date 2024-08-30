import {
  Benefits,
  FAQ,
  Footer,
  Hero,
  OurExperiences,
  OurPartnerBenefits,
  WhyChooseRehaabit,
} from "../components/Partner";

const PartnerPage = () => {
  const HeroSectionText = {
    text1: "Transform Your Expertise into Income!",
    text2: "Join Rehaabit Today – Where Home Service Pros Connect with Clients Effortlessly.",
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
      question: "How do I get started on the Rehaabit Platform?",
      answer:
        "Getting started is easy! Simply sign up, create your professional profile, and start browsing job opportunities. You can showcase your skills, set your availability, and connect with clients looking for your expertise.",
    },
    {
      id: 3,
      question: "How do I get started on the Rehaabit Platform?",
      answer:
        "Getting started is easy! Simply sign up, create your professional profile, and start browsing job opportunities. You can showcase your skills, set your availability, and connect with clients looking for your expertise.",
    },
    {
      id: 4,
      question: "How do I get started on the Rehaabit Platform?",
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
      <OurExperiences />
      <Footer JoinRehaabitFamilyText={JoinRehaabitFamilyText} />
    </div>
  );
};

export default PartnerPage;
