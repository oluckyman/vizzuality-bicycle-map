"use client";

import { useCallback, useMemo, useState } from "react";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Station } from "@/types";

function getBoundingBox(points: { longitude: number; latitude: number }[]) {
  if (!points.length) return undefined;
  const bounds = new mapboxgl.LngLatBounds();
  for (const { latitude, longitude } of points) {
    bounds.extend([longitude, latitude]);
  }
  return bounds;
}

export default function StationsMap({ stations }: { stations: Station[] }) {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const handleMapClick = useCallback(() => setSelectedStation(null), []);

  const bounds = useMemo(() => getBoundingBox(stations), [stations]);

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        bounds,
        fitBoundsOptions: { padding: 100 },
      }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      projection={{ name: "mercator" }}
      onClick={handleMapClick}
    >
      <NavigationControl position="top-right" showCompass={false} />
      {stations.map((station) => (
        <Marker
          key={station.id}
          longitude={station.longitude}
          latitude={station.latitude}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setSelectedStation(station);
          }}
          style={{ cursor: "pointer" }}
        >
          🔴
        </Marker>
      ))}
      {selectedStation && (
        <Popup
          longitude={selectedStation.longitude}
          latitude={selectedStation.latitude}
          closeButton={false}
          anchor="bottom"
          onClose={() => setSelectedStation(null)}
        >
          <h3>{selectedStation.name}</h3>
          <p>Free bikes: {selectedStation.free_bikes}</p>
          <p>Empty slots: {selectedStation.empty_slots}</p>
        </Popup>
      )}
    </Map>
  );
}
