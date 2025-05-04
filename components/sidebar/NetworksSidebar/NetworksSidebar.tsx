"use client";

import Link from "next/link";
import { useCallback, useMemo } from "react";
import { Bike } from "lucide-react";
import { useQueryState } from "nuqs";
import countries from "@/data/countries.json";
import useFilteredNetworks from "@/hooks/useFilteredNetworks";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Network } from "@/types";
import { SearchInput } from "./SearchInput";
import { CountrySelector } from "./CountrySelector";
import { NetworkList } from "./NetworkList";

export default function NetworksSidebar({ networks }: { networks: Network[] }) {
  const availableCountries = useMemo(() => {
    const countriesWithNetwork = new Set(networks.map((n) => n.location.country));
    return countries.data.filter((c) => countriesWithNetwork.has(c.code));
  }, [networks]);
  const filteredNetworks = useFilteredNetworks(networks);

  const [countryCode, setCountryCode] = useQueryState("country", { defaultValue: "", history: "replace" });
  const [search, setSearch] = useQueryState("search", { defaultValue: "", history: "replace" });

  console.log("Render NetworksSidebar", networks.length, { countryCode, search, filteredNetworks });
  return (
    <ScrollArea className="h-full flex flex-col bg-secondary">
      <div className="p-10">
        <Link href="/" className="flex gap-2 text-xl font-semibold text-grenadier-400">
          <Bike />
          CycleMap
        </Link>
        <h1 className="mt-6 mb-4 font-semibold leading-10 text-3xl text-secondary-foreground">
          Discover bike networks
        </h1>
        <p className="text-muted-foreground text-sm">
          Lorem ipsum dolor sit amet consectetur. A volutpat adipiscing placerat turpis magna sem tempor amet faucibus.
          Arcu praesent viverra pellentesque nisi quam in rhoncus.
        </p>
        <div className="flex mt-4.5 mb-4 gap-2 items-center">
          <SearchInput value={search} onChange={setSearch} />
          <CountrySelector selectedCode={countryCode} countries={availableCountries} onSelect={setCountryCode} />
        </div>
        <NetworkList networks={filteredNetworks} />
      </div>
    </ScrollArea>
  );
}
