const bookingData = [
  {
    id: 1,
    members: [
      { type: "adult", count: 2 },
      { type: "child", count: 1 },
    ],
    price: [
      {
        child: 1000,
        adult: 4000,
      },
    ],
  },
];
const shippingFee = 500;
const discount = 100;
const total = shippingFee - discount;

const PaymentSummarySection = () => {
  const formatPrice = (value: number) => `Rs.${value.toLocaleString("en-IN")}`;

  return (
    <div className="mt-8">
      <p className="typography-mid-body font-medium border-b pb-2 mb-3">
        Order Summary
      </p>
      <div>
        <div className="mb-3">
          {bookingData.map((item) => (
            <div key={item.id} className="flex flex-col space-y-2">
              {item.members.map((member) => {
                const priceObj = (item.price && item.price[0]) || {};
                const unit =
                  (priceObj as Record<string, number>)[member.type] ?? 0;
                const lineTotal = unit * member.count;
                return (
                  <div
                    key={member.type}
                    className="flex justify-between typography-mid-body font-light text-grey-400"
                  >
                    <span className="capitalize">
                      {member.type}:{" "}
                      <span className="font-medium text-primary-500">
                        {member.count}
                      </span>
                    </span>
                    <span className="font-medium text-primary-500 typography-paragraph-medium">
                      {formatPrice(lineTotal)}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {discount > 0 && (
          <div className="flex justify-between typography-mid-body font-light text-grey-400 mb-3">
            <span>Coupon Discount:</span>
            <span className="text-yellow-500 typography-large-body">
              -{formatPrice(discount)}
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-between typography-mid-body font-semibold text-grey-600 border-t pb-3">
        <span className="uppercase">Total:</span>
        <span className="font-medium text-yellow-500 typography-large-body">
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );
};

export default PaymentSummarySection;
