"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import countries from "@/data/countries.json";
import type { Network } from "@/types";

export default function NetworksSidebar({ networks }: { networks: Network[] }) {
  const [currentCountry, setCurrentCountry] = useQueryState("country", { defaultValue: "", history: "replace" });

  const filteredNetworks = useMemo(() => {
    if (!currentCountry) {
      return networks;
    }
    return networks.filter((network) => network.location.country === currentCountry);
  }, [networks, currentCountry]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    setCurrentCountry(country || null);
  };

  return (
    <>
      <h1 className="p-4 font-bold">Discover bike networks</h1>
      <select value={currentCountry} onChange={handleCountryChange}>
        <option value="">Country</option>
        {countries.data.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      <ul className="flex-1 overflow-y-auto mb-4">
        {filteredNetworks.map((network) => (
          <li key={network.id}>
            <Link href={`/network/${network.id}`}>
              {network.name} ({network.location.city})
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
