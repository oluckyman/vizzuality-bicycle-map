import { useQueryState } from "nuqs";
import { useMemo } from "react";
import type { Network } from "@/types";

export default function useFilteredNetworks(allNetworks: Network[]) {
  const [country] = useQueryState("country", { defaultValue: "" });
  const filteredNetworks = useMemo(() => {
    if (!country) {
      return allNetworks;
    }
    return allNetworks.filter((network) => network.location.country === country);
  }, [allNetworks, country]);
  return filteredNetworks;
}
