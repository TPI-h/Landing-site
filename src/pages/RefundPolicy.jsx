const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-8">
        
        <h1 className="text-3xl font-bold text-center mb-8">
          Refund & Cancellation Policy
        </h1>

        {/* Cancellation */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">1. Cancellation:</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Cancellation is permitted up to 24 hours before the scheduled
              check-in time without incurring any charges.
            </li>
            <li>
              No cancellation is allowed within 24 hours of the check-in time.
              In such cases, the full booking amount will be charged.
            </li>
            <li>
              Mail us at <b>thendralparkinn@gmail.com</b> to initiate the
              cancellation and refund process.
            </li>
          </ul>
        </div>

        {/* Modification */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">2. Modification:</h2>
          <p className="ml-1">
            Modifications to the booking can be made up to 24 hours before the
            scheduled check-in time, subject to availability and any applicable
            rate differences.
          </p>
        </div>

        {/* No Show */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">3. No – Show:</h2>
          <p className="ml-1">
            If a guest fails to check in on the scheduled arrival date without
            prior cancellation, the full booking amount will be charged as a
            no-show fee.
          </p>
        </div>

        {/* Early Departure */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">4. Early Departure:</h2>
          <p className="ml-1">
            In the event of early departure after check-in, the remaining unused
            nights may be subject to a penalty charge equivalent to one night's
            stay.
          </p>
        </div>

        {/* Refunds */}
        <div className="border border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">5. Refunds:</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Refunds for cancellations made within the allowable time frame
              will be processed within 10 business days, depending on the
              payment method and banking processes.
            </li>
            <li>
              Refunds will be issued to the original payment method used during
              booking.
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default RefundPolicy;
