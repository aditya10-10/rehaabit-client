import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const PartnerTermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Helmet>
        <title>
          Rehaabit Partner Terms & Conditions - Guidelines for Our Partnership{" "}
        </title>
        <meta
          name="description"
          content="Understand the guidelines, responsibilities, and expectations for a successful partnership with us in delivering home services."
        />
        <meta
          name="keywords"
          content="Rehaabit partner terms, partner guidelines, partnership terms, Rehaabit partnership agreement, partner responsibilities, terms of service for partners, partnership policies"
        />
      </Helmet>
      <div className="p-6 max-w-5xl bg-white shadow-md rounded-md my-10">
        <h1
          className="text-3xl font-bold mb-4 text-center"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          TERMS AND CONDITIONS FOR PARTNERS OF REHAABIT
        </h1>

        <section className="mb-6">
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            1. Introduction
          </h2>
          <p style={{ fontFamily: "Roboto, sans-serif" }}>
            Welcome to Rehaabit. These Terms and Conditions ("Terms") govern the
            relationship between Rehaabit ("Company", "we", "us", or "our") and
            our partners ("Partner", "you", or "your") regarding the use of our
            platform and services ("Services"). By engaging with us, you agree
            to these Terms.
          </p>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">2. Definitions</h2>
          <p>
            "Platform" refers to Rehaabit's website, mobile applications, and
            any other digital properties we use to deliver our Services.
          </p>
          <p className="mt-2">
            "Services" refers to the home services provided through our
            Platform, including but not limited to, repairs, maintenance, and
            other professional services.
          </p>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">
            3. Registration and Account
          </h2>
          <h3 className="text-xl font-medium mb-1">a. Account Creation</h3>
          <p>
            To utilize our Services, you must create an account on our Platform.
            You agree to:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Provide accurate, current, and complete information during the
              registration process.
            </li>
            <li>
              Maintain and promptly update your information to keep it accurate
              and complete.
            </li>
          </ul>
          <h3 className="text-xl font-medium mt-4 mb-1">b. Account Security</h3>
          <p>
            You are responsible for safeguarding your account credentials and
            for all activities that occur under your account. Notify us
            immediately of any unauthorized use or breach of security.
          </p>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">
            4. Partner Obligations
          </h2>
          <h3 className="text-xl font-medium mb-1">a. Service Quality</h3>
          <p>You agree to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Provide high-quality services that meet the standards set by
              Rehaabit.
            </li>
            <li>
              Maintain professionalism and adhere to any guidelines or protocols
              provided by us.
            </li>
          </ul>
          <h3 className="text-xl font-medium mt-4 mb-1">b. Compliance</h3>
          <p>You agree to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Comply with all applicable laws, regulations, and Rehaabit's
              policies.
            </li>
            <li>
              Ensure that all required licenses and certifications are
              up-to-date and valid.
            </li>
          </ul>
          <h3 className="text-xl font-medium mt-4 mb-1">c. Performance</h3>
          <p>You agree to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Deliver services in a timely manner as per the schedule agreed
              upon with customers.
            </li>
            <li>
              Address any customer feedback or complaints promptly and
              professionally.
            </li>
          </ul>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">5. Payment and Fees</h2>
          <h3 className="text-xl font-medium mb-1">a. Payment Terms</h3>
          <p>
            Payments for services will be processed in accordance with the terms
            outlined in our agreement with you. Rehaabit will:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Pay you the agreed-upon amount for services rendered, less any
              applicable fees or deductions.
            </li>
            <li>
              Provide you with invoices or statements detailing the payment
              amounts.
            </li>
          </ul>
          <h3 className="text-xl font-medium mt-4 mb-1">b. Taxes</h3>
          <p>You are responsible for:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Any taxes, duties, or other financial obligations related to the
              services provided, including but not limited to income tax and
              VAT.
            </li>
            <li>Keeping accurate records of all financial transactions.</li>
          </ul>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">
            6. Intellectual Property
          </h2>
          <h3 className="text-xl font-medium mb-1">a. Ownership</h3>
          <p>
            All intellectual property rights in the Platform, including
            trademarks, logos, and content, are owned by Rehaabit. You do not
            acquire any rights to these materials except for:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              The limited right to use them as necessary to provide the
              Services.
            </li>
            <li>Any promotional materials provided by Rehaabit.</li>
          </ul>
          <h3 className="text-xl font-medium mt-4 mb-1">
            b. Use of Trademarks
          </h3>
          <p>
            You may use Rehaabit's trademarks only as permitted by us and in
            accordance with our guidelines. You agree to:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Use trademarks solely for promoting your services in connection
              with Rehaabit.
            </li>
            <li>
              Cease use of trademarks upon termination of your partnership.
            </li>
          </ul>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">7. Confidentiality</h2>
          <h3 className="text-xl font-medium mb-1">a. Definition</h3>
          <p>
            Confidential information includes all non-public information
            disclosed to you by Rehaabit, whether oral, written, or electronic.
          </p>
          <h3 className="text-xl font-medium mt-4 mb-1">b. Obligations</h3>
          <p>You agree to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Keep confidential information private and not disclose it to third
              parties without prior written consent.
            </li>
            <li>
              Use confidential information solely for the purpose of providing
              Services.
            </li>
          </ul>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">8. Termination</h2>
          <h3 className="text-xl font-medium mb-1">a. Termination by You</h3>
          <p>You may terminate your partnership with Rehaabit by:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Providing written notice as specified in our agreement.</li>
            <li>
              Ensuring all outstanding obligations and deliverables are
              completed.
            </li>
          </ul>
          <h3 className="text-xl font-medium mt-4 mb-1">
            b. Termination by Us
          </h3>
          <p>
            We may terminate or suspend your account and access to the Platform
            at any time if:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              You breach these Terms or fail to meet the quality standards set
              by Rehaabit.
            </li>
            <li>
              There is a change in our business operations or services that
              necessitates termination.
            </li>
          </ul>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">
            9. Limitation of Liability
          </h2>
          <h3 className="text-xl font-medium mb-1">a. Disclaimer</h3>
          <p>
            To the fullest extent permitted by law, Rehaabit is not liable for:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Any indirect, incidental, special, or consequential damages
              arising from your use of our Platform or Services.
            </li>
            <li>Loss of profits, data, or other intangible losses.</li>
          </ul>
          <h3 className="text-xl font-medium mt-4 mb-1">b. Limitation</h3>
          <p>
            Our liability for direct damages is limited to the amount paid by
            you for the Services in question.
          </p>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">10. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Rehaabit, its
            affiliates, and their respective officers, directors, employees, and
            agents from any claims, liabilities, damages, losses, or expenses
            arising from:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Your breach of these Terms.</li>
            <li>Your provision of Services.</li>
          </ul>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">11. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the
            laws of India. Any disputes arising under these Terms shall be
            resolved in the courts of India.
          </p>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">12. Modifications</h2>
          <h3 className="text-xl font-medium mb-1">a. Updates</h3>
          <p>
            Rehaabit may update these Terms from time to time. We will notify
            you of any significant changes through the Platform or other means,
            such as email.
          </p>
          <h3 className="text-xl font-medium mt-4 mb-1">b. Acceptance</h3>
          <p>
            By continuing to use the Services after such updates, you consent to
            the changes made to these Terms.
          </p>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">
            13. Contact Information
          </h2>
          <p>
            For any questions or concerns regarding these Terms, please contact
            us at:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Email:{" "}
              <a
                href="mailto:support@rehaabit.com"
                className="text-blue-500 underline"
              >
                support@rehaabit.com
              </a>
            </li>
            {/* <li>Phone: [Your Contact Phone Number]</li>
            <li>Address: [Your Company Address]</li> */}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PartnerTermsAndConditions;
