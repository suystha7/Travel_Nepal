import Title from "@/core/common/Title";
import React from "react";

const FindUsOnMap = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="">
        <div className="flex flex-col md:flex-row  justify-center items-end gap-6 mb-2">
          <div className="">
            <Title
              underline={false}
              primaryText="Find us"
              highlightText="on the Map"
            />
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 h-[500px]">
          <iframe
            title="Battisputali, Kathmandu - Find Us"
            className="w-full h-full grayscale-[0.2] contrast-[1.1] transition-all duration-700 group-hover:grayscale-0"
            loading="lazy"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.8951287946334!2d153.01266077552333!3d-27.21242577646978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b93e54d51123435%3A0x1dbde01a256617d!2s43%20Langer%20Cct%2C%20North%20Lakes%20QLD%204509%2C%20Australia!5e1!3m2!1sen!2snp!4v1767778683205!5m2!1sen!2snp"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default FindUsOnMap;
