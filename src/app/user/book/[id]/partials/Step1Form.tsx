import React from "react";

const ageGroup = [
  { label: "Adult (18+)", value: "adult", price: 6000 },
  {
    label: "Child (5-17)",
    value: "child",
    price: 2000,
    description: ["With valid ID", "Only in combination with: Adult (18+)"],
  },
  {
    label: "Infant (0-4)",
    value: "infant",
    price: "Free",
    description: ["Only in combination with: Adult (18+)"],
  },
  {
    label: "Room",
    value: "room",
    price: 15000,
    description: ["Only in combination with: Adult (18+)"],
  },
];

const Step1Form = () => {
  return (
    <div className="">
      <h2 className="typography-sub-h2-medium text-grey-800">
        Booking Details
      </h2>

      <p className="typography-extra-large-body py-5">Select Your Tickets</p>
      <div className="typography-mid-body font-light bg-grey-50 text-grey-600 px-5 py-3 rounded-xl">
        <ul className="list-disc list-inside space-y-2">
          <li>Free for kids under 6 and disabled visitors (74%+) </li>
          <li>
            Pregnant women, families with strollers, and visitors on crutches
            can buy priority tickets at the venue
          </li>
        </ul>
      </div>
      {ageGroup.map(({ label, value, price, description }) => (
        <div key={value} className="flex flex-row justify-between my-8">
          <div className="typography-extra-large-body">
            <p className=" text-grey-700 mb-3">{label}</p>
            {description && (
              <ul className="typography-mid-body font-light text-grey-400 list-disc list-inside space-y-1">
                {description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            )}
            <p className="text-yellow-500">NRP {price}</p>
          </div>

          {/* <div>increment /decrement button</div> */}
        </div>
      ))}
    </div>
    // </div>
  );
};

export default Step1Form;
