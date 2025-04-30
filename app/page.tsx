import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import NetworksMap from "@/components/map/NetworksMap";

interface Network {
  id: string;
  name: string;
  location: {
    city: string;
  };
}

interface NetworkResponse {
  networks: Network[];
}

async function fetchNetworks(): Promise<NetworkResponse> {
  const res = await fetch("http://api.citybik.es/v2/networks");
  return res.json();
}

export default async function Home() {
  let networks: Network[] = [];
  try {
    const response = await fetchNetworks();
    networks = response.networks;
  } catch (e) {
    console.error(e);
  }

  return (
    <MainLayout
      sidebar={
        <>
          <h1 className="p-4 font-bold">Discover bike networks</h1>
          <ul className="flex-1 overflow-y-auto mb-4">
            {networks.map((network) => (
              <li key={network.id}>
                <Link href={`/network/${network.id}`}>
                  {network.name} ({network.location.city})
                </Link>
              </li>
            ))}
          </ul>
        </>
      }
      map={<NetworksMap />}
    />
  );
}
