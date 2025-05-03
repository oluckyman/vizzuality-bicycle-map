import React, { useCallback, useState } from "react";
import { SearchIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

type SearchBarProps = {
  search: string;
  country: string;
  countries: { code: string; name: string }[];
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCountrySelect: (countryCode: string) => void;
};

export function SearchBar({ search, country, countries, onSearch, onCountrySelect }: SearchBarProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handleCountrySelect = useCallback(
    (code: string) => {
      onCountrySelect(code);
      setIsPopoverOpen(false);
    },
    [onCountrySelect, setIsPopoverOpen],
  );
  return (
    <div className="flex mt-4.5 gap-2 items-center">
      <label className="relative flex text-secondary-foreground flex-grow items-center">
        <SearchIcon strokeWidth={1} className="absolute ml-4" />
        <Input
          type="search"
          placeholder="Search network"
          onChange={onSearch}
          value={search}
          className="pl-12 h-12 flex-1 text-sm  outline-none"
        />
      </label>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className="w-[114px] h-12 cursor-pointer data-[state=open]:ring data-[state=open]:ring-offset-1"
          >
            <MapPin strokeWidth={1} />
            Country
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="max-w-52 p-0">
          <Command>
            <CommandInput placeholder="Search country" />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandList className="max-h-44">
              {countries.map(({ code, name }) => (
                <CommandItem
                  key={code}
                  value={code}
                  keywords={[name]}
                  className="text-nowrap"
                  onSelect={handleCountrySelect}
                >
                  {name}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
