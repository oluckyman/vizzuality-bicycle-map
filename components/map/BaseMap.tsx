import Map, { NavigationControl, MapProps, MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { LngLatBoundsLike } from "mapbox-gl";
import { NearMeControl } from "./NearMeControl";

export interface BaseMapProps extends MapProps {
  initialBounds?: LngLatBoundsLike;
  onClick?: () => void;
  ref?: React.Ref<MapRef>;
}

export function BaseMap({ initialBounds, children, ...rest }: BaseMapProps) {
  const padding = 100;
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/light-v11"
      projection={{ name: "mercator" }}
      initialViewState={
        initialBounds
          ? {
              bounds: initialBounds,
              fitBoundsOptions: { padding },
            }
          : undefined
      }
      {...rest}
    >
      <NearMeControl />
      <NavigationControl position="top-right" showCompass={false} />
      {children}
    </Map>
  );
}
