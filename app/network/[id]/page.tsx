import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import StationsMap from "@/components/map/StationsMap";
import { getNetworkDetails } from "@/lib/api";

export default async function NetworkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const network = await getNetworkDetails(id);
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
