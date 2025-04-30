"use client";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

export default function NetworksMap({ networks }: { networks: any }) {
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
      {networks.map((network: any) => (
        <Marker key={network.id} longitude={network.location.longitude} latitude={network.location.latitude}>
          📍
        </Marker>
      ))}
    </Map>
  );
}
