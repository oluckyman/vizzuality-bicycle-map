import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import mapboxgl from "mapbox-gl"
import countries from "@/data/countries.json"

const countryNames = new Map(countries.data.map(({ code, name }) => [code, name]))

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCountryName(countryCode: string): string {
  return countryNames.get(countryCode) || countryCode
}

/**
 * Creates a bounding box from an array of points with longitude and latitude
 * @param points Array of objects with longitude and latitude properties
 * @returns A mapboxgl.LngLatBounds object or undefined if the array is empty
 */
export function getBoundingBox(points: { longitude: number; latitude: number }[]) {
  if (!points.length) return undefined;
  const bounds = new mapboxgl.LngLatBounds();
  for (const { latitude, longitude } of points) {
    bounds.extend([longitude, latitude]);
  }
  return bounds;
}
