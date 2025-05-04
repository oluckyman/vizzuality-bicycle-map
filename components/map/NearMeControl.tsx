"use client";

import { useState, useEffect } from "react";
import { Locate } from "lucide-react";
import { useMap } from "react-map-gl/mapbox";
import { Button } from "@/components/ui/button";

export function NearMeControl() {
  const { current: map } = useMap();
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsSupported(!!navigator.geolocation);
  }, []);

  const handleClick = () => {
    if (!navigator.geolocation || !map) return;

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.flyTo({ center: [longitude, latitude], zoom: 12, speed: 1.5, essential: true });
        setIsLoading(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 5_000, maximumAge: 60_000 },
    );
  };
  return (
    isSupported && (
      <div className="absolute top-3 left-3 z-10">
        <Button className="shadow-md" onClick={handleClick}>
          <Locate className={isLoading ? "animate-pulse" : ""} />
          Near me
        </Button>
      </div>
    )
  );
}
