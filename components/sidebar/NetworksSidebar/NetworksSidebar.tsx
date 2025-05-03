"use client";

import Link from "next/link";
import { useCallback, useMemo } from "react";
import { Bike } from "lucide-react";
import { useQueryState } from "nuqs";
import countries from "@/data/countries.json";
import useFilteredNetworks from "@/hooks/useFilteredNetworks";
import type { Network } from "@/types";
import { SearchBar } from "./SearchBar";

const countryNames = new Map(countries.data.map(({ code, name }) => [code, name]));

export default function NetworksSidebar({ networks }: { networks: Network[] }) {
  const availableCountries = useMemo(() => {
    const countriesWithNetwork = new Set(networks.map((n) => n.location.country));
    return countries.data.filter((c) => countriesWithNetwork.has(c.code));
  }, [networks]);
  const filteredNetworks = useFilteredNetworks(networks);

  const [countryCode, setCountryCode] = useQueryState("country", { defaultValue: "", history: "replace" });
  const [search, setSearch] = useQueryState("search", { defaultValue: "", history: "replace" });

  const handleCountryChange = useCallback((code: string) => setCountryCode(code || null), [setCountryCode]);
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value || null),
    [setSearch],
  );

  return (
    <div className="p-10 bg-secondary">
      <Link href="/" className="flex gap-2 text-xl font-semibold text-grenadier-400">
        <Bike />
        CycleMap
      </Link>
      <h1 className="mt-6 mb-4 font-semibold leading-10 text-3xl text-secondary-foreground">Discover bike networks</h1>
      <p className="text-muted-foreground text-sm">
        Lorem ipsum dolor sit amet consectetur. A volutpat adipiscing placerat turpis magna sem tempor amet faucibus.
        Arcu praesent viverra pellentesque nisi quam in rhoncus.
      </p>
      <SearchBar
        search={search}
        country={countryCode ? { code: countryCode, name: countryNames.get(countryCode) || countryCode } : null}
        countries={availableCountries}
        onSearch={handleSearchChange}
        onCountrySelect={handleCountryChange}
      />
      <hr className="mt-10" />
      <ul className="flex-1 overflow-y-auto mb-4">
        {filteredNetworks.map((network) => (
          <li key={network.id} className="mb-4">
            <Link href={`/network/${network.id}`}>
              <div>
                {network.name} ({network.location.city})
              </div>
              <div>
                📍 {network.location.city}, {countryNames.get(network.location.country) || network.location.country}
              </div>
              <i>Co: {network.company.join(", ")}</i>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
