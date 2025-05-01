"use client";

import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Station } from "@/types";

export default function StationsMap({ stations }: { stations: Station[] }) {
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
      {stations.map((station) => (
        <Marker key={station.id} longitude={station.longitude} latitude={station.latitude}>
          🔴
        </Marker>
      ))}
    </Map>
  );
}
