"use client";

import { useCallback, useState } from "react";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Station } from "@/types";

export default function StationsMap({ stations }: { stations: Station[] }) {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const handleMapClick = useCallback(() => setSelectedStation(null), []);
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        zoom: 1,
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
