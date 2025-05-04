import React from "react";
import { SearchIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value: string;
  onChange: (nextValue: string | null) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const debouncedOnChange = useDebouncedCallback((nextValue: string | null) => {
    if (nextValue === null || nextValue.length >= 2) {
      onChange(nextValue);
    }
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => debouncedOnChange(e.target.value || null);

  return (
    <label className="relative flex text-secondary-foreground flex-grow items-center">
      <SearchIcon strokeWidth={1} className="absolute ml-4" />
      <Input
        type="search"
        placeholder="Search network"
        onChange={handleChange}
        defaultValue={value}
        className="pl-12 h-12 flex-1 text-sm outline-none"
      />
    </label>
  );
}
