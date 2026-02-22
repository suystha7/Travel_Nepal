"use client";
import { useState, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import useSearch from "@/utils/useSearch";
import { IoSearchOutline } from "react-icons/io5";

interface ISearchBoxProps {
  placeholder?: string;
  className?: string;
}

const SearchBox = ({ placeholder = "Search", className }: ISearchBoxProps) => {
  const { search, handleSearch } = useSearch();
  const [inputValue, setInputValue] = useState(search);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length === 0 || value.length >= 2) {
      handleSearch(value);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className={cn(
          "block w-full border border-gray-300 rounded-xl px-4 md:px-6 pr-10 py-2 text-secondary-text font-normal text-sm focus:outline-none",
          className
        )}
      />
      <IoSearchOutline className="pointer-events-none absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-secondary-text h-5 w-5" />
    </div>
  );
};

export default SearchBox;
