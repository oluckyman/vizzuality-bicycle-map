export interface Network {
  id: string;
  name: string;
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
}
