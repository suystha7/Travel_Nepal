import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { IOrganizationData } from "../interface/IOrganizationInterface";

interface GetInTouchProps {
  organization: IOrganizationData;
}

const GetInTouch = ({ organization }: GetInTouchProps) => {
  const contactDetails = [
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Our Headquarters",
      // value: organization?.address,
      value: "43 Langer Circuit,North Lakes,4509 QLD,Australia",
      color: "bg-primary-50 text-primary-400",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Call Support",
      // value: organization?.phone,
      value: "+61 0432 678 258",
      color: "bg-secondary-50 text-secondary-600",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email Inquiry",
      // value: organization?.email,
      value: "ananta@travelnepal.com.au",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="py-20 px-4 max-w-2xl">
      <div className="relative mb-16">
        <h2 className="text-5xl font-black text-slate-900 mb-4">
          REACH <span className="text-primary-500">OUT.</span>
        </h2>
        <div className="flex items-center gap-4">
          <div className="h-[2px] w-12 bg-primary-500" />
          <p className="text-slate-500 font-medium tracking-tight">
            Our team typically responds within 24 hours.
          </p>
        </div>
      </div>

      <div className="space-y-4 cursor-pointer">
        {contactDetails.map((item, index) => (
          <div
            key={index}
            className="group flex items-center gap-6 p-6 rounded-3xl border border-slate-100 bg-white hover:bg-slate-50 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
          >
            <div
              className={`flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 transition-transform duration-500 group-hover:scale-110 ${item.color}`}
            >
              {item.icon}
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
                {item.label}
              </span>
              <p className="text-lg font-bold text-slate-800 tracking-tight">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetInTouch;
