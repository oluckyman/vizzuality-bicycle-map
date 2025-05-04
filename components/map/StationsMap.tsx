"use client";

import { useCallback, useMemo, useState } from "react";
import Map, { Marker, NavigationControl, Popup, MarkerProps, MarkerEvent } from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Station } from "@/types";

interface StationMarkerProps extends Omit<MarkerProps, "longitude" | "latitude" | "onClick"> {
  station: Station;
  onClick: (station: Station) => void;
}

function StationMarker({ station, onClick, ...rest }: StationMarkerProps) {
  const handleClick = useCallback(
    (e: MarkerEvent<MouseEvent>) => {
      e.originalEvent.stopPropagation();
      onClick(station);
    },
    [onClick, station],
  );

  return (
    <Marker
      longitude={station.longitude}
      latitude={station.latitude}
      onClick={handleClick}
      className="size-3 cursor-pointer shadow-md hover:shadow-lg rounded-full bg-grenadier-400 hover:border border-accent-foreground hover:z-1"
      {...rest}
    >
      <div />
    </Marker>
  );
}

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
        <StationMarker key={station.id} station={station} onClick={setSelectedStation} />
      ))}
      {selectedStation && (
        <Popup
          longitude={selectedStation.longitude}
          latitude={selectedStation.latitude}
          closeButton={false}
          anchor="bottom"
          onClose={() => setSelectedStation(null)}
        >
          <div className="p-1.5 font-[var(--font-poppins)]">
            <h3 className="text-secondary-foreground font-medium text-base mb-2">{selectedStation.name}</h3>
            <div className="flex justify-between font-light text-xs">
              Free bikes <span className="font-medium">{selectedStation.free_bikes}</span>
            </div>
            <div className="flex justify-between font-light text-xs">
              Empty slots <span className="font-medium">{selectedStation.empty_slots}</span>
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );
}
