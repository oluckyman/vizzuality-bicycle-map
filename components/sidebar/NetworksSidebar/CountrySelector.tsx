import React, { useCallback, useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn, getCountryName } from "@/lib/utils";

interface CountrySelectorProps {
  selectedCode: string;
  countries: { code: string; name: string }[];
  onSelect: (countryCode: string | null) => void;
}

export function CountrySelector({ selectedCode, countries, onSelect }: CountrySelectorProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleCountrySelect = useCallback(
    (code: string) => {
      onSelect(selectedCode === code ? null : code);
      setIsPopoverOpen(false);
    },
    [onSelect, setIsPopoverOpen, selectedCode],
  );

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size="lg"
          className="max-w-36 h-12 data-[state=open]:ring data-[state=open]:ring-offset-1"
        >
          <MapPin strokeWidth={1} />
          <span className="truncate">{selectedCode ? getCountryName(selectedCode) : "Country"}</span>
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
                className={cn("text-nowrap", { "font-semibold": selectedCode === code })}
                onSelect={handleCountrySelect}
              >
                {name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
