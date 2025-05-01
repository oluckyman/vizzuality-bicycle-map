"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import countries from "@/data/countries.json";
import useFilteredNetworks from "@/hooks/useFilteredNetworks";
import type { Network } from "@/types";

export default function NetworksSidebar({ networks }: { networks: Network[] }) {
  const filteredNetworks = useFilteredNetworks(networks);

  const [country, setCountry] = useQueryState("country", { defaultValue: "", history: "replace" });

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => setCountry(e.target.value || null);

  return (
    <>
      <h1 className="p-4 font-bold">Discover bike networks</h1>
      <div className="flex">
        <input type="search" placeholder="Search network" className="flex-1 mr-2" />
        <select value={country} onChange={handleCountryChange}>
          <option value="">Country</option>
          {countries.data.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <ul className="flex-1 overflow-y-auto mb-4">
        {filteredNetworks.map((network) => (
          <li key={network.id} className="mb-4">
            <Link href={`/network/${network.id}`}>
              <div>
                {network.name} ({network.location.city})
              </div>
              <i>Co: {network.company.join(", ")}</i>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
