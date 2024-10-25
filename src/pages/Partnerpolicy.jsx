import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const PartnerPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Helmet>
        <title>
          Rehaabit Partner Privacy Policy - How We Protect Partner Data{" "}
        </title>
        <meta
          name="description"
          content="Learn how Rehaabit protects and uses your business data as a partner. Our Partner Privacy Policy ensures your information is secure while collaborating with us."
        />
        <meta
          name="keywords"
          content="Rehaabit partner privacy policy, partner data protection, business data privacy, how we use partner data, Rehaabit data security for partners, privacy practices for partners"
        />
      </Helmet>
      <div className="p-6 max-w-5xl bg-white shadow-md rounded-md my-10">
        <h1
          className="text-3xl font-bold mb-4 text-center"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          PRIVACY POLICY FOR PARTNERS OF REHAABIT
        </h1>

        <section className="mb-6">
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            1. Introduction
          </h2>
          <p style={{ fontFamily: "Roboto, sans-serif" }}>
            Welcome to Rehaabit's privacy policy ("Privacy Policy" or "Policy").
            This Policy outlines Rehaabit's practices regarding the collection,
            storage, usage, processing, and disclosure of personal data shared
            by our partners ("Partners", "you" or "your") when engaging with
            Rehaabit's services and platforms ("Services").
          </p>
          <p className="mt-2" style={{ fontFamily: "Roboto, sans-serif" }}>
            At Rehaabit, we are committed to protecting your personal data and
            respecting your privacy. This Policy explains how we collect, use,
            and safeguard personal data.
          </p>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">2. Key Information</h2>

          <h3 className="text-xl font-medium mb-1">a. About Us</h3>
          <p>
            Rehaabit is dedicated to providing high-quality home services. If
            you have any questions regarding this Policy or how we handle your
            personal data, please contact us at privacy@rehaabit.com.
          </p>

          <h3 className="text-xl font-medium mt-4 mb-1">
            b. Scope of This Policy
          </h3>
          <p>
            This Policy applies to partners who engage with our Platform and
            Services. By using our Platform or Services, you agree to the terms
            of this Policy and consent to the data processing activities
            described.
          </p>

          <h3 className="text-xl font-medium mt-4 mb-1">
            c. Changes to This Policy
          </h3>
          <p>
            We may update this Policy periodically. We encourage you to review
            it regularly. Changes will be effective upon posting on our Platform
            or via other communication methods.
          </p>

          <h3 className="text-xl font-medium mt-4 mb-1">
            d. Third-Party Links
          </h3>
          <p>
            Our Platform may contain links to third-party websites or services.
            We do not control these third-party services and are not responsible
            for their privacy practices. Please review their privacy policies
            before sharing any personal data.
          </p>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">3. Data We Collect</h2>

          <h3 className="text-xl font-medium mb-1">
            a. Types of Data Collected
          </h3>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Contact Information: Email addresses, phone numbers, and
              addresses.
            </li>
            <li>
              Identity Data: Name, gender, date of birth, and government-issued
              identifiers (e.g., Aadhaar, PAN).
            </li>
            <li>
              Business Information: Description of services, business address,
              and related documentation.
            </li>
            <li>
              Technical Data: IP address, device ID, browser type, and usage
              data.
            </li>
            <li>Transactional Data: Details of transactions and payments.</li>
            <li>
              Other Data: Any additional information you provide directly or
              indirectly.
            </li>
          </ul>

          <h3 className="text-xl font-medium mt-4 mb-1">
            b. Consequences of Data Refusal
          </h3>
          <p>
            If you do not provide necessary personal data, we may not be able to
            perform our contractual obligations or provide the Services
            effectively.
          </p>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">
            4. How We Collect Data
          </h2>
          <p>We collect data through:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Direct Interactions: Information you provide when engaging with us
              or using our Platform.
            </li>
            <li>
              Automated Technologies: Data collected via cookies and similar
              technologies.
            </li>
            <li>
              Third Parties: Data received from external sources and partners.
            </li>
          </ul>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">
            5. Use of Personal Data
          </h2>
          <p>We use your personal data for:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Service Provision: To deliver and manage our Services.</li>
            <li>Account Management: To create and maintain your account.</li>
            <li>
              Performance Monitoring: To assess and enhance service quality.
            </li>
            <li>
              Communication: To provide updates, notifications, and marketing
              information.
            </li>
            <li>Compliance: To fulfill legal and regulatory requirements.</li>
          </ul>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">6. Data Sharing</h2>
          <p>We may share your personal data with:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Internal Entities: Within Rehaabit and its affiliates.</li>
            <li>
              External Partners: Service providers, business partners, and
              regulatory bodies.
            </li>
            <li>
              Legal Requirements: As required by law or regulatory authorities.
            </li>
          </ul>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">7. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your data from
            unauthorized access and breaches.
          </p>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">
            8. Data Access and Updates
          </h2>
          <p>
            You have the right to access, correct, or delete your personal data.
            To request access or updates, please contact us at
            privacy@rehaabit.com.
          </p>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">9. Data Transfers</h2>
          <p>
            Your personal data may be transferred to and stored in countries
            other than your location. By providing your data, you consent to
            these transfers.
          </p>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">10. Data Retention</h2>
          <p>
            We retain your personal data for as long as necessary to fulfill the
            purposes for which it was collected or as required by law.
          </p>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">11. Account Deletion</h2>
          <p>
            You can request account deletion by contacting us at
            privacy@rehaabit.com. Please note that data related to transactions
            may be retained as required by law.
          </p>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">
            12. Business Transitions
          </h2>
          <p>
            In the event of a business transition (e.g., merger or acquisition),
            your personal data may be transferred as part of the assets.
          </p>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">
            13. Updates to This Policy
          </h2>
          <p>
            We will notify you of any changes to this Policy via the Platform or
            other means. Continued use of our Services after such changes
            signifies your acceptance of the updated Policy.
          </p>
        </section>

        <section className="mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
          <h2 className="text-2xl font-semibold mb-2">14. Contact Us</h2>
          <p>
            For any questions or concerns about this Policy or our data
            practices, please contact us at{" "}
            <a
              href="mailto:privacy@rehaabit.com"
              className="text-blue-500 underline"
            >
              privacy@rehaabit.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default PartnerPolicy;
