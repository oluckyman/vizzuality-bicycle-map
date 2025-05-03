import React from "react";
import { SearchIcon } from "lucide-react";

type SearchBarProps = {
  search: string;
  country: string;
  countries: { code: string; name: string }[];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function SearchBar({ search, country, countries, onSearchChange, onCountryChange }: SearchBarProps) {
  return (
    <div className="flex mt-4 gap-2">
      <label className="flex text-secondary-foreground flex-grow items-center h-12 gap-2 px-4 py-2 rounded-full border [&:has(:focus-visible)]:ring ring-border">
        <SearchIcon />
        <input
          type="search"
          placeholder="Search network"
          onChange={onSearchChange}
          value={search}
          className="border flex-1 text-sm border-none outline-none"
        />
      </label>
      <select value={country} onChange={onCountryChange} className="w-[114px]">
        <option value="">Country</option>
        {countries.map(({ code, name }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
