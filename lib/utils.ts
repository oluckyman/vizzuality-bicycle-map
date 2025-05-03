import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import countries from "@/data/countries.json"

const countryNames = new Map(countries.data.map(({ code, name }) => [code, name]))

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCountryName(countryCode: string): string {
  return countryNames.get(countryCode) || countryCode
}
