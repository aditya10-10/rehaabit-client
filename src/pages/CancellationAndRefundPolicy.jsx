import { useEffect } from "react";
import Footer from "../components/Home/Footer";
import { Helmet } from "react-helmet-async";

const CancellationRefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Rehaabit Cancellation & Refund Policy - Easy and Transparent{" "}
        </title>
        <meta
          name="description"
          content="Understand Rehaabit's cancellation and refund policy. We believe in transparency and strive to make your experience seamless, even when plans change."
        />
        <meta
          name="keywords"
          content="Rehaabit cancellation policy, refund policy, service cancellation, refund guidelines, change of service, Rehaabit refund process, policy on cancellations"
        />
      </Helmet>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="p-6 max-w-5xl bg-white shadow-md rounded-md my-10">
          <h1
            className="text-3xl font-bold mb-4 text-center"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            CANCELLATION AND REFUND POLICY
          </h1>

          {/* Section 1: Introduction */}
          <section
            className="mb-6"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            <p>
              Welcome to Rehaabit's Cancellation and Refund Policy. This policy
              outlines the conditions under which a customer can cancel their
              order or request a refund for services booked through our
              platform. Please read the following carefully to understand our
              policies.
            </p>
          </section>

          {/* Section 2: Cancellation Policy */}
          <section
            className="mb-6"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            <h2 className="text-2xl font-semibold mb-2">
              1. CANCELLATION POLICY
            </h2>

            <h3 className="text-xl font-medium mb-1">
              1.1 Customer Cancellations
            </h3>
            <p>
              Customers may cancel their order or booking at any time before the
              service is rendered. The cancellation fees are as follows:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>
                <strong>More than 3 hours before the service:</strong> No
                cancellation fee.
              </li>
              <li>
                <strong>Within 3 hours of the service:</strong> A cancellation
                fee of up to ₹50 may apply. No fee if a professional is not
                assigned.
              </li>
            </ul>
            <p className="mt-2">
              The cancellation fee goes directly to the professional. Their time
              is reserved for the service, and they cannot accept another job
              for the reserved time.
            </p>

            <h3 className="text-xl font-medium mt-4 mb-1">
              1.2 Service Provider Cancellations
            </h3>
            <p>
              If a service provider cancels the order, the customer will be
              notified and offered the option to reschedule the service with
              another available service provider or receive a full refund.
            </p>
          </section>

          {/* Section 3: Refund Policy */}
          <section
            className="mb-6"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            <h2 className="text-2xl font-semibold mb-2">2. REFUND POLICY</h2>

            <h3 className="text-xl font-medium mb-1">
              2.1 Eligibility for Refunds
            </h3>
            <p>
              Refunds are only available for services that have been canceled by
              the customer or service provider in accordance with the
              Cancellation Policy. Refunds will not be provided for services
              that have already been rendered.
            </p>

            <h3 className="text-xl font-medium mt-4 mb-1">
              2.2 Refund Process
            </h3>
            <p>
              Once a cancellation is confirmed, refunds will be processed within
              7-10 business days. The refund will be credited back to the
              original mode of payment.
            </p>
          </section>

          {/* Section 4: Exceptions and Conditions */}
          <section
            className="mb-6"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            <h2 className="text-2xl font-semibold mb-2">
              3. EXCEPTIONS AND CONDITIONS
            </h2>
            <p>
              Rehaabit reserves the right to refuse refunds or issue partial
              refunds if the cancellation does not meet the criteria outlined in
              this policy or if there is any fraudulent or suspicious activity.
            </p>
            <p className="mt-2">
              Services booked during promotional events or special offers may
              have different cancellation and refund policies. Please refer to
              the terms and conditions of the promotion for more details.
            </p>
          </section>

          {/* Section 5: Changes to the Policy */}
          <section
            className="mb-6"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            <h2 className="text-2xl font-semibold mb-2">
              4. CHANGES TO THIS POLICY
            </h2>
            <p>
              Rehaabit reserves the right to modify or update this Cancellation
              and Refund Policy at any time without prior notice. Any changes
              will be effective immediately upon posting on the Platform. Please
              review this policy periodically for updates.
            </p>
          </section>

          {/* Section 6: Contact Information */}
          <section
            className="mb-6"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            <h2 className="text-2xl font-semibold mb-2">5. CONTACT US</h2>
            <p>
              If you have any questions or concerns regarding this Cancellation
              and Refund Policy, please contact us at{" "}
              <a
                href="mailto:support@rehaabit.com"
                className="text-blue-500 underline"
              >
                support@rehaabit.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CancellationRefundPolicy;
