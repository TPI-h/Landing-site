import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Terms & Conditions
        </h1>
        <div className="flex justify-center mb-6">
          <Link
            to="/"
            className="text-sm text-blue-600 hover:underline flex items-center gap-1">
            ← Back to Home
          </Link>
        </div>


        {/* Restrictions */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Restrictions</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Unmarried couples are not allowed</li>
            <li>Guests below 18 years of age are not allowed at the property</li>
            <li>
              Passport, Aadhar, Driving License and Govt. ID are accepted as ID
              proof(s)
            </li>
            <li>Pets are not allowed</li>
          </ul>
        </div>

        {/* ID Proof Related */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">ID Proof Related</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Local ids are allowed</li>
            <li>
              Passport, Aadhar, Driving License and Govt. ID are accepted as ID
              proof(s)
            </li>
          </ul>
        </div>

        {/* Food Arrangement */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Food Arrangement</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Outside food is not allowed</li>
            <li>Non veg food is allowed</li>
            <li>Food delivery service is not available at the property</li>
          </ul>
        </div>

        {/* Smoking / Alcohol Consumption Rules */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">
            Smoking / Alcohol Consumption Rules
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>There are no restrictions on alcohol consumption</li>
            <li>Smoking within the premises is not allowed</li>
          </ul>
        </div>

        {/* Pet(s) Related */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Pet(s) Related</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Pets are not allowed</li>
            <li>No pets are living on the property</li>
          </ul>
        </div>

        {/* Property Accessibility */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Property Accessibility</h2>
          <p>
            This property is not accessible to guests who use a wheelchair.
            Please make arrangements accordingly
          </p>
        </div>

        {/* Other Rules */}
        <div className="border border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Other Rules</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>No outside foods are allowed</li>
            <li>
              Guests are requested not to invite outside visitors in the room
              during their stay
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Terms;
