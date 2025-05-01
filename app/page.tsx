import { MainLayout } from "@/components/layout/MainLayout";
import NetworksMap from "@/components/map/NetworksMap";
import NetworksSidebar from "@/components/sidebar/NetworksSidebar";
import type { Network } from "@/types";

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
  console.log(networks);

  return <MainLayout sidebar={<NetworksSidebar networks={networks} />} map={<NetworksMap networks={networks} />} />;
}
