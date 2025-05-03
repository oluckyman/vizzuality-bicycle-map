"use client";

import Link from "next/link";
import Map, { Marker, NavigationControl, MapRef } from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import useFilteredNetworks from "@/hooks/useFilteredNetworks";
import type { Network } from "@/types";

function getBoundingBox(points: { longitude: number; latitude: number }[]) {
  if (!points.length) return undefined;
  const bounds = new mapboxgl.LngLatBounds();
  for (const { latitude, longitude } of points) {
    bounds.extend([longitude, latitude]);
  }
  return bounds;
}

export default function NetworksMap({ networks }: { networks: Network[] }) {
  const filteredNetworks = useFilteredNetworks(networks);
  const bounds = useMemo(() => getBoundingBox(filteredNetworks.map((n) => n.location)), [filteredNetworks]);
  const boundsPadding = 100;
  const mapRef = useRef<MapRef>(null);
  useEffect(() => {
    if (mapRef.current && bounds) {
      mapRef.current.fitBounds(bounds, {
        padding: boundsPadding,
        animate: true,
        essential: true,
        duration: 2000,
      });
    }
  }, [bounds]);
  console.log("NetwrokMap render", filteredNetworks.length, networks.length);
  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        bounds,
        fitBoundsOptions: { padding: boundsPadding },
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
