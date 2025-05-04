"use client";

import Link from "next/link";
import { useCallback, useMemo } from "react";
import { Bike } from "lucide-react";
import { parseAsIndex, useQueryState } from "nuqs";
import countries from "@/data/countries.json";
import useFilteredNetworks from "@/hooks/useFilteredNetworks";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Network } from "@/types";
import { SearchInput } from "./SearchInput";
import { CountrySelector } from "./CountrySelector";
import { NetworkList } from "./NetworkList";
import { PaginationControl } from "./PaginationControl";

// Pagination settings
const ITEMS_PER_PAGE = 10;

export default function NetworksSidebar({ networks }: { networks: Network[] }) {
  const availableCountries = useMemo(() => {
    const countriesWithNetwork = new Set(networks.map((n) => n.location.country));
    return countries.data.filter((c) => countriesWithNetwork.has(c.code));
  }, [networks]);

  const filteredNetworks = useFilteredNetworks(networks);

  const [countryCode, setCountryCode] = useQueryState("country", { defaultValue: "", history: "replace" });
  const [search, setSearch] = useQueryState("search", { defaultValue: "", history: "replace" });
  const [page, setPage] = useQueryState("page", parseAsIndex.withDefault(0).withOptions({ history: "replace" }));

  const totalPages = Math.ceil(filteredNetworks.length / ITEMS_PER_PAGE);
  const pageIndex = Math.max(0, Math.min(page, totalPages - 1));

  const handleSearchChange = useCallback(
    (value: string | null) => {
      setSearch(value);
      setPage(0);
    },
    [setSearch, setPage],
  );

  const handleCountryChange = useCallback(
    (code: string | null) => {
      setCountryCode(code);
      setPage(0);
    },
    [setCountryCode, setPage],
  );

  const paginatedNetworks = useMemo(() => {
    const from = pageIndex * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE;
    return filteredNetworks.slice(from, to);
  }, [filteredNetworks, pageIndex]);

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
          <SearchInput value={search} onChange={handleSearchChange} />
          <CountrySelector selectedCode={countryCode} countries={availableCountries} onSelect={handleCountryChange} />
        </div>
        <NetworkList networks={paginatedNetworks} />
        <PaginationControl pageIndex={pageIndex} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </ScrollArea>
  );
}
