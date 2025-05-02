import { MainLayout } from "@/components/layout/MainLayout";
import NetworksMap from "@/components/map/NetworksMap";
import NetworksSidebar from "@/components/sidebar/NetworksSidebar";
import { getNetworks } from "@/lib/api";
import type { Network } from "@/types";

export default async function Home() {
  let networks: Network[];
  try {
    networks = await getNetworks();
  } catch (e) {
    // Rethrow any error, including 404 notFound from API,
    // because for the Home page notFound does not make sense and should be considered as a general error
    throw new Error(e instanceof Error ? e.message : String(e));
  }

  return <MainLayout sidebar={<NetworksSidebar networks={networks} />} map={<NetworksMap networks={networks} />} />;
}
