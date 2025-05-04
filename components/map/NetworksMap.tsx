"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { Marker, MapRef } from "react-map-gl/mapbox";
import useFilteredNetworks from "@/hooks/useFilteredNetworks";
import { getBoundingBox } from "@/lib/utils";
import { BaseMap } from "./BaseMap";
import type { Network } from "@/types";

export default function NetworksMap({ networks }: { networks: Network[] }) {
  const filteredNetworks = useFilteredNetworks(networks);
  const bounds = useMemo(() => getBoundingBox(filteredNetworks.map((n) => n.location)), [filteredNetworks]);
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (mapRef.current && bounds) {
      mapRef.current.fitBounds(bounds, {
        animate: true,
        essential: true,
        duration: 2000,
      });
    }
  }, [bounds]);

  console.log("Render NetworksMap", networks.length, { filteredNetworks });

  return (
    <BaseMap ref={mapRef} initialBounds={bounds}>
      {filteredNetworks.map((network) => (
        <Marker key={network.id} longitude={network.location.longitude} latitude={network.location.latitude}>
          <Link href={`/network/${network.id}`} title={`${network.name}, ${network.location.city}`} prefetch={false}>
            <div className="w-2 h-2 rounded-full border border-grenadier-400 bg-grenadier-400/60" />
          </Link>
        </Marker>
      ))}
    </BaseMap>
  );
}
