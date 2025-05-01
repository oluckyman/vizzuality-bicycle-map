interface NetworkLocation {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Network {
  id: string;
  name: string;
  company: string[];
  location: NetworkLocation;
}

export interface Station {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  free_bikes: number;
  empty_slots: number;
}

export interface NetworkDetails {
  id: string;
  name: string;
  company: string[];
  location: NetworkLocation;
  stations: Station[];
}
