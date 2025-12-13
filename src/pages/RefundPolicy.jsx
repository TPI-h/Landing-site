const RefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Refund & Cancellation Policy</h1>

      <ul className="list-disc ml-6 space-y-2">
        <li>Free cancellation up to 24 hours before check-in</li>
        <li>No cancellation allowed within 24 hours of check-in</li>
        <li>No-show will be charged fully</li>
        <li>Refunds processed within 10 business days</li>
      </ul>

      <p className="mt-4">
        For cancellations, email us at <b>thendralparkinn@gmail.com</b>
      </p>
    </div>
  );
};

export default RefundPolicy;
