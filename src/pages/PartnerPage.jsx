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

const PartnerPage = () => {
  return (
    <div className="flex w-screen min-h-screen flex-col mb-10 bg-white overflow-x-hidden">
      {/* <Navbar /> */}
      <Hero />
      <WhyChooseRehaabit />
      <Benefits />
      <OurPartnerBenefits />
      <FAQ />
      <OurExperiences />
      <Footer />
    </div>
  );
};

export default PartnerPage;
