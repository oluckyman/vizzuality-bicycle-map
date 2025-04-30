import { MainLayout } from "@/components/layout/main-layout";
import Link from "next/link";

interface Station {
  id: string;
  name: string;
  empty_slots: number;
  free_bikes: number;
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface Network {
  id: string;
  name: string;
  stations: Station[];
  company: string[];
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
}

interface NetworkResponse {
  network: Network;
}

async function getNetwork(id: string): Promise<Network> {
  const res = await fetch(`http://api.citybik.es/v2/networks/${id}`);
  const network: NetworkResponse = await res.json();
  return network.network;
}

export default async function NetworkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const network = await getNetwork(id);
  return (
    <MainLayout
      sidebar={
        <>
          <div>
            <Link href="/">← Back</Link>
          </div>
          <h1>{network.name}</h1>
          <ul>
            {network.stations.map((station) => (
              <li key={station.id}>
                <h2>{station.name}</h2>
              </li>
            ))}
          </ul>
        </>
      }
      map={"Stations Map"}
    />
  );
}
