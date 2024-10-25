import { useEffect } from "react";
import {
  Benefits,
  FAQ,
  Footer,
  Hero,
  OpenPositions,
  OurPartnerBenefits,
  ResumeSubmissionForm,
  WhyChooseRehaabit,
} from "../components/Partner";
import { Helmet } from "react-helmet-async";
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
      question: "Submit Your Resume",
      answer:
        "The first step to kickstart your career journey is submitting your resume. Make sure your resume is up-to-date and highlights your skills, experience, and achievements. Submitting a strong resume helps you make a great first impression and showcase why you're the right fit for the role. Our system allows you to upload your resume directly to our platform for faster and more efficient processing.",
    },
    {
      id: 2,
      question: "Submit Application",
      answer:
        "Once your resume is ready, the next step is to submit your application for the job role you're interested in. You'll be asked to fill out essential details about your background, experience, and why you're interested in the position. Be sure to tailor your application to the job description to increase your chances of standing out. This step is crucial to letting the employer know more about your professional journey and aspirations.",
    },
    {
      id: 3,
      question: "Application Review",
      answer:
        "After submitting your application, our recruitment team will carefully review your profile and resume. During this phase, they will assess your skills, qualifications, and experiences against the job requirements. If everything matches, you'll be shortlisted for the next steps. This review process ensures that the right candidate is matched with the right opportunity.",
    },
    {
      id: 4,
      question: "Interview",
      answer:
        "If your application is shortlisted, you’ll be invited for an interview. Interviews can be held virtually or in-person, depending on the position. This is your opportunity to speak directly with hiring managers, answer questions about your qualifications, and learn more about the role. Prepare thoroughly by researching the company, reviewing common interview questions, and practicing your responses.",
    },
    {
      id: 5,
      question: "Offer",
      answer:
        "Congratulations! If your interview goes well, you’ll receive a job offer from the company. The offer will include details such as your role, salary, benefits, and start date. Be sure to review everything carefully before accepting. If you have any questions or need clarification, don't hesitate to ask. This is an exciting step toward joining the team!",
    },
    {
      id: 6,
      question: "Pre-Onboarding",
      answer:
        "Before your official start date, there may be a pre-onboarding phase where you complete necessary paperwork, such as background checks, and set up any accounts or tools you’ll need for your role. This step ensures that everything is in place for a smooth transition on your first day. It’s also a great time to familiarize yourself with the company’s culture and values.",
    },
    {
      id: 7,
      question: "Hired",
      answer:
        "Welcome aboard! You've successfully completed the hiring process and are now an official part of the team. On your first day, you’ll go through the onboarding process where you’ll meet your colleagues, get acquainted with the work environment, and learn more about your role. This is the start of an exciting new chapter in your career!",
    },
  ];

  return (
    <div className="flex w-screen min-h-screen font-lato flex-col bg-white overflow-x-hidden">
      <Helmet>
        <title>
          Rehaabit Careers: Join Our Team of Developers, Designers, and
          Creatives
        </title>
        <meta
          name="description"
          content="Rehaabit is hiring developers, UI/UX designers, content writers, and more. Join our innovative team. Explore open positions and apply now!"
        />
        <meta
          name="keywords"
          content="Rehaabit careers, tech jobs at Rehaabit, developer jobs, UI/UX designer careers, content writer jobs, creative jobs at Rehaabit, join the Rehaabit team, career opportunities in tech, job openings for developers, design and content roles at Rehaabit."
        />
      </Helmet>

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
