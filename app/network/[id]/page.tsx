import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import StationsMap from "@/components/map/StationsMap";
import { getNetworkDetails } from "@/lib/api";
import StationsSidebar from "@/components/sidebar/StationsSidebar";

export default async function NetworkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const network = await getNetworkDetails(id);
  return (
    <MainLayout sidebar={<StationsSidebar network={network} />} map={<StationsMap stations={network.stations} />} />
  );
}
