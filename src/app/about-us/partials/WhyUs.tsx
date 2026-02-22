import React from "react";
import { Compass, ShieldCheck, Zap, HeartHandshake } from "lucide-react";
import RichText from "@/utils/richText";

interface WhyUsItem {
  ordering: number;
  title: string;
  description: string;
}

export interface IAboutUsWhyUS {
  heading: string;
  sub_heading: string;
  listItems: WhyUsItem[];
}

const WhyUs = ({ whyUsData }: { whyUsData: IAboutUsWhyUS }) => {
  const iconMap: Record<string, React.ReactNode> = {
    "01": <Compass className="w-5 h-5" />,
    "02": <Zap className="w-5 h-5" />,
    "03": <HeartHandshake className="w-5 h-5" />,
    "04": <ShieldCheck className="w-5 h-5" />,
  };

  const colorMap: Record<string, { border: string; text: string }> = {
    "01": { border: "border-primary-200", text: "text-primary-600" },
    "02": { border: "border-blue-200", text: "text-blue-600" },
    "03": { border: "border-rose-200", text: "text-rose-600" },
    "04": { border: "border-amber-200", text: "text-amber-600" },
  };

  const words = whyUsData?.heading?.split(" ") || [];

  return (
    <section className="pt-20 px-6 bg-white" id="why-us">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight leading-[1.1]">
              {words[0]}{" "}
              <span className="italic text-primary-500">
                {words[1]} {words[2]}
              </span>
              {words.length > 3 && (
                <>
                  <br />
                  <span className="italic text-secondary-500">
                    {words.slice(3).join(" ")}
                  </span>
                </>
              )}
            </h2>
          </div>

          <div className="md:w-1/2">
            <RichText
              content={whyUsData?.sub_heading}
              className="text-gray-500 leading-relaxed italic border-l-2 border-primary-500 pl-6"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-200">
          {whyUsData?.listItems?.map((item) => {
            const idString = String(item?.ordering).padStart(2, "0");
            const colors = colorMap[idString] || colorMap["01"];

            return (
              <div
                key={item.ordering}
                className="group bg-white p-10 transition-all duration-500 hover:bg-gray-50 flex flex-col h-full cursor-pointer"
              >
                <div className="flex justify-between items-start mb-12">
                  <span className="text-base font-bold tracking-widest text-gray-300 group-hover:text-gray-900 transition-colors">
                    {idString}
                  </span>
                  <div
                    className={`p-3 rounded-full border ${colors.border} ${colors.text}`}
                  >
                    {iconMap[idString] || <Compass className="w-5 h-5" />}
                  </div>
                </div>

                <div className="grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-700 ease-in-out" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
