import React from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value: string;
  onChange: (nextValue: string | null) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  // TODO: add debounce here
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value || null);
  return (
    <label className="relative flex text-secondary-foreground flex-grow items-center">
      <SearchIcon strokeWidth={1} className="absolute ml-4" />
      <Input
        type="search"
        placeholder="Search network"
        onChange={handleChange}
        value={value}
        className="pl-12 h-12 flex-1 text-sm outline-none"
      />
    </label>
  );
}
