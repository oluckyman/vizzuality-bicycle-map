import { useQueryState } from "nuqs";
import { useMemo } from "react";
import type { Network } from "@/types";

export default function useFilteredNetworks(allNetworks: Network[]) {
  const [country] = useQueryState("country");
  const [search] = useQueryState("search");

  const filteredNetworks = useMemo(() => {
    let networks = allNetworks;
    if (country) {
      networks = networks.filter((network) => network.location.country === country);
    }
    if (search) {
      const searchTerm = search.toLowerCase();
      networks = networks.filter(
        (network) =>
          network.name.toLowerCase().includes(searchTerm) ||
          network.company.some((co) => co.toLowerCase().includes(searchTerm)),
      );
    }
    return networks;
  }, [allNetworks, country, search]);

  return filteredNetworks;
}
