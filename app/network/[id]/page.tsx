import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import StationsMap from "@/components/map/StationsMap";
import { NetworkDetails } from "@/types";

interface NetworkDetailsResponse {
  network: NetworkDetails;
}

async function getNetwork(id: string): Promise<NetworkDetails> {
  const res = await fetch(`http://api.citybik.es/v2/networks/${id}`);
  const network: NetworkDetailsResponse = await res.json();
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
      map={<StationsMap stations={network.stations} />}
    />
  );
}
