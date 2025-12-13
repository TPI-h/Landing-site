const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        Thendral Park Inn is committed to protecting the privacy and confidentiality
        of your personal information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>Contact details such as name, email, phone number, and address</li>
        <li>Payment information</li>
        <li>Stay preferences and special requests</li>
        <li>Website usage data like IP address and browser type</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>To process reservations</li>
        <li>To communicate with guests</li>
        <li>To improve services</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h2>
      <p>
        Email: <b>thendralparkinn@gmail.com</b><br />
        Phone: <b>+91 82480 43002</b>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
