export interface Network {
  id: string;
  name: string;
  location: {
    city: string;
    latitude: number;
    longitude: number;
  };
}
