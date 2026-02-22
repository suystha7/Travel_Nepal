"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(searchParams.get("search") || "");
  const [expanded, setExpanded] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.length >= 3) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.push(`/category?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (newValue === "") {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");
      router.push(`/category?${params.toString()}`);
    }
  };

  const handleButtonClick = () => {
    if (!expanded && window.innerWidth < 640) {
      setExpanded(true);
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }
    handleSearch();
  };

  const handleBlur = () => {
    if (window.innerWidth < 640) {
      setExpanded(false);
    }
  };

  return (
    <div>
      <div
        className="flex items-center space-x-6 py-1 mx-2 lg:hidden"
        onMouseEnter={() => window.innerWidth >= 640 && setExpanded(true)}
        onMouseLeave={() => window.innerWidth >= 640 && setExpanded(false)}
      >
        <div
          className={`flex items-center bg-primary-50 rounded-full overflow-hidden transition-all duration-200 ${
            expanded ? "w-56 px-2" : "w-10 px-0"
          }`}
        >
          <button
            onClick={handleButtonClick}
            className="flex justify-center items-center rounded-full w-10 h-10 cursor-pointer"
          >
            <IoSearchOutline size={20} className="text-grey-700 m-2" />
          </button>
          {(expanded ||
            typeof window === "undefined" ||
            window.innerWidth >= 640) && (
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for products..."
              className="bg-transparent px-4 outline-none w-full text-grey-400 transition-all duration-200"
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
            />
          )}
        </div>
      </div>

      <div className="hidden lg:flex items-center space-x-6 py-1 mx-2">
        <div className="flex items-center bg-primary-50 rounded-full overflow-hidden w-72 px-2 transition-all duration-200">
          <button
            onClick={handleButtonClick}
            className="flex justify-center items-center rounded-full w-10 h-10 cursor-pointer"
          >
            <IoSearchOutline size={20} className="text-grey-700 m-2" />
          </button>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products..."
            className="bg-transparent px-4 outline-none w-full text-grey-400 transition-all duration-200"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
