"use client";
import React, { useState, useRef, useEffect } from "react";
import { useContactForm } from "../hooks/useContactForm";
import { ChevronRight, ChevronDown } from "lucide-react";
import { SERVICE_CHOICES } from "../schema/contactFormValidation";

const SendUsMessage = () => {
  const { formik, isLoading } = useContactForm();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const textInputFields = [
    { id: "name", label: "Full Name", type: "text" },
    { id: "email", label: "Email Address", type: "email" },
    { id: "phone", label: "Phone Number", type: "text" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    formik.setFieldValue("service", value);
    setIsOpen(false);
  };

  const selectedLabel = SERVICE_CHOICES.find(
    (s) => s.value === formik.values.service
  )?.label;

  return (
    <section className="py-10">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h2 className="text-5xl font-black text-secondary-500 mb-4">
            LET&apos;S <span className="text-primary-500">TALK.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-md">
            Tell us about your travel plans and let&apos;s craft something
            extraordinary together.
          </p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12"
        >
          {textInputFields.map((field) => (
            <div
              key={field.id}
              className="relative group border-b-2 border-gray-200 focus-within:border-primary-500 transition-all duration-300"
            >
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={
                  formik.values[field.id as keyof typeof formik.values] || ""
                }
                className="peer w-full bg-transparent pt-6 pb-2 text-gray-900 outline-none placeholder-transparent transition-all"
              />
              <label
                htmlFor={field.id}
                className="absolute left-0 top-6 text-gray-400 font-medium transition-all duration-300 pointer-events-none 
                peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary-500 peer-focus:font-bold
                peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary-500"
              >
                {field.label}
              </label>
            </div>
          ))}

          <div
            className="relative group border-b-2 border-gray-200 transition-all duration-300"
            ref={dropdownRef}
          >
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-transparent pt-6 pb-2 text-gray-900 cursor-pointer min-h-16 flex items-center justify-between"
            >
              <span
                className={selectedLabel ? "text-gray-900" : "text-transparent"}
              >
                {selectedLabel || "Placeholder"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </div>

            <label
              className={`absolute left-0 transition-all duration-300 pointer-events-none font-medium
              ${formik.values.service || isOpen ? "top-0 text-xs text-primary-500 font-bold" : "top-6 text-gray-400"}`}
            >
              Select Service
            </label>

            {isOpen && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 shadow-2xl z-50 max-h-60 overflow-y-auto rounded-sm py-1">
                {SERVICE_CHOICES.map((choice) => (
                  <div
                    key={choice.value}
                    onClick={() => handleSelect(choice.value)}
                    className={`px-4 py-2.5 text-sm cursor-pointer transition-colors
                      ${
                        formik.values.service === choice.value
                          ? "bg-primary-500 text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {choice.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-full relative group border-b-2 border-gray-200 focus-within:border-primary-500 transition-all duration-300">
            <textarea
              id="message"
              name="message"
              placeholder=" "
              rows={1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message || ""}
              className="peer w-full bg-transparent pt-6 pb-2 text-gray-900 outline-none placeholder-transparent transition-all resize-none"
            />
            <label
              htmlFor="message"
              className="absolute left-0 top-6 text-gray-400 font-medium transition-all duration-300 pointer-events-none 
              peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary-500 peer-focus:font-bold
              peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary-500"
            >
              Tell us everything about your plan...
            </label>
          </div>

          <div className="col-span-full">
            <button
              type="submit"
              disabled={isLoading}
              className="group flex items-center gap-6 outline-none"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary-500 text-white group-hover:bg-primary-500 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-gray-200">
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-primary-500 transition-colors">
                  Ready to go?
                </span>
                <span className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                  {isLoading ? "Sending..." : "Send Request"}
                </span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SendUsMessage;
