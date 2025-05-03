"use client";

import Link from "next/link";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import useFilteredNetworks from "@/hooks/useFilteredNetworks";
import type { Network } from "@/types";

export default function NetworksMap({ networks }: { networks: Network[] }) {
  const filteredNetworks = useFilteredNetworks(networks);
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        zoom: 1,
      }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      projection={{ name: "mercator" }}
    >
      <NavigationControl position="top-right" showCompass={false} />
      {filteredNetworks.map((network) => (
        <Marker key={network.id} longitude={network.location.longitude} latitude={network.location.latitude}>
          <Link href={`/network/${network.id}`} title={`${network.name}, ${network.location.city}`}>
            <div className="w-2 h-2 rounded-full border border-grenadier-400 bg-grenadier-400/60" />
          </Link>
        </Marker>
      ))}
    </Map>
  );
}
