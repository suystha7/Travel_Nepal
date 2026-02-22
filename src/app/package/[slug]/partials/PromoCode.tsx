import { IOrganizationData } from "@/app/contact-us/interface/IOrganizationInterface";
import { Headphones, Phone, TicketIcon, X, CheckCircle2 } from "lucide-react";
import React from "react";
import { FaWhatsapp } from "react-icons/fa6";

interface IProps {
  orgData?: IOrganizationData;
}

const PromoCode: React.FC<IProps> = ({ orgData }) => {
  return (
    <div className="space-y-6">
      {/* <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <TicketIcon size={18} className="text-primary-600" />
            Promo Code
          </h3>
        </div>

        <div className="p-4">
          <div className="bg-secondary-50 border border-secondary-100 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-secondary-700 uppercase tracking-widest">
                Active Offer
              </span>
              <button className="text-gray-600 hover:text-red-500 transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-secondary-600" />
              <p className="text-sm font-bold text-secondary-900">
                WINTERBLISS Applied!
              </p>
            </div>
            <p className="text-xs text-secondary-700 mt-1">
              You just saved{" "}
              <span className="font-bold underline text-secondary-800">
                NRS 789
              </span>{" "}
              on this booking.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">
              Available Offers
            </p>

            {[
              {
                code: "GOINDIA",
                desc: "Book online and get Flat 10% Discount",
              },
              { code: "GONOV", desc: "Exclusive Year-End Travel Sale" },
            ].map((offer) => (
              <button
                key={offer.code}
                className="w-full group text-left p-3 border border-gray-100 rounded-xl hover:border-primary-200 hover:bg-primary-50/30 transition-all"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded border border-primary-100">
                    {offer.code}
                  </span>
                  <span className="text-xs font-bold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    APPLY
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2 line-clamp-1">
                  {offer.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div> */}

      <div className="rounded-xl overflow-hidden border border-gray-200">
        <div className="px-5 py-4 flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">Need Assistance?</h3>
            <p className="text-gray-600 text-xs">
              Our experts are here to help
            </p>
          </div>
          <div className="bg-secondary-400 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase">
            10 AM - 07 PM
          </div>
        </div>

        <div className="px-4 pb-5 space-y-2">
          <a
            href={`tel:${orgData?.phone}`}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary-500 text-white">
              <Phone size={18} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-gray-600 font-medium uppercase">
                Call Support
              </p>
              <p className="text-sm font-bold">
                {orgData?.phone || "+977 1234567"}
              </p>
            </div>
          </a>

          <button
            type="button"
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-secondary-500 text-white">
              <Headphones size={18} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[10px] text-gray-600 font-medium uppercase text-left">
                Callback
              </p>
              <p className="text-sm font-bold text-left">Request a call</p>
            </div>
          </button>

          <a
            href={`https://wa.me/${orgData?.phone}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#25D366] text-white">
              <FaWhatsapp size={18} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-gray-600 font-medium uppercase text-left">
                WhatsApp
              </p>
              <p className="text-sm font-bold text-left">Chat with Expert</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PromoCode;
