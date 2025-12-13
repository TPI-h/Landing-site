import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Privacy Policy
        </h1>
        <div className="flex justify-center mb-6">
          <Link
            to="/"
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            ← Back to Home
          </Link>
        </div>


        {/* Intro */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <p>
            Thendral Park Inn is committed to protecting the privacy and
            confidentiality of your personal information. This Privacy Policy
            explains how we collect, use, and safeguard your information when
            you visit our website, make reservations, or use our services.
          </p>
        </div>

        {/* 1. Information We Collect */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">
            1. Information We Collect
          </h2>
          <p className="mb-3">
            When you make a reservation or use our services, we may collect the
            following types of personal information:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Contact information such as name, email address, phone number,
              and postal address.
            </li>
            <li>Payment information such as credit card details.</li>
            <li>Stay preferences and special requests.</li>
            <li>
              Information about your use of our website, including IP address,
              browser type, and device identifier.
            </li>
            <li>Other information you provide to us voluntarily.</li>
          </ul>
        </div>

        {/* 2. How We Use Your Information */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">
            2. How We Use Your Information:
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>To process and confirm your reservations.</li>
            <li>
              To communicate with you regarding your reservations, inquiries,
              or requests.
            </li>
            <li>
              To personalize your experience and provide tailored services.
            </li>
            <li>
              To improve our website, services, and customer satisfaction.
            </li>
            <li>
              To comply with legal obligations and prevent fraud.
            </li>
          </ul>
        </div>

        {/* 3. Information Sharing */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">
            3. Information Sharing:
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              With our trusted service providers who assist us in operating our
              hotel and providing services to you.
            </li>
            <li>
              With business partners or affiliates for marketing or promotional
              purposes.
            </li>
            <li>
              When required by law or to protect our rights, property, or safety,
              or that of others.
            </li>
            <li>
              With your consent or as otherwise disclosed at the time of data
              collection.
            </li>
          </ul>
        </div>

        {/* 4. Data Security */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">
            4. Data Security:
          </h2>
          <p>
            We take appropriate measures to protect your personal information
            against unauthorized access, disclosure, alteration, or destruction.
            However, no data transmission over the internet or electronic
            storage method is 100% secure, and we cannot guarantee absolute
            security.
          </p>
        </div>

        {/* 5. Your Choices */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">
            5. Your Choices:
          </h2>
          <p className="mb-3">
            You have certain rights regarding your personal information,
            including the right to:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Access, update, or correct your personal information.</li>
            <li>
              Object to or restrict the processing of your personal information.
            </li>
            <li>
              Request deletion of your personal information, subject to
              applicable legal requirements.
            </li>
            <li>
              Opt-out of receiving marketing communications from us.
            </li>
            <li>
              Lodge a complaint with a supervisory authority if you believe your
              rights have been violated.
            </li>
          </ul>
        </div>

        {/* 6. Children’s Privacy */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">
            6. Children’s Privacy:
          </h2>
          <p>
            Our services are not directed to individuals under the age of 18. If
            you are a parent or guardian and believe your child has provided us
            with personal information, please contact us, and we will take
            appropriate steps to remove such information from our records.
          </p>
        </div>

        {/* 7. Changes to this Privacy Policy */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">
            7. Changes to this Privacy Policy:
          </h2>
          <p>
            We reserve the right to update or modify this Privacy Policy at any
            time. Any changes will be effective immediately upon posting the
            updated Privacy Policy on our website.
          </p>
        </div>

        {/* 8. Contact Us */}
        <div className="border border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">
            8. Contact Us:
          </h2>
          <p>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or our handling of your personal information, please
            contact us at <b>thendralparkinn@gmail.com</b> or call us at{" "}
            <b>+91 82480 43002</b>.
          </p>
          <p className="mt-4">
            By using our website or services, you consent to the collection,
            use, and sharing of your personal information as described in this
            Privacy Policy.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
