import Link from "next/link";
import { MapPin, BriefcaseBusiness, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCountryName } from "@/lib/utils";
import type { NetworkDetails } from "@/types";

export default function StationsSidebar({ network }: { network: NetworkDetails }) {
  const networkImage = "/hero-background.png"; // e.g. `network.imageUrl`
  return (
    <div className="h-full flex flex-col bg-primary text-primary-foreground">
      {/* --- Hero Section --- */}
      <div
        className="flex flex-col gap-10 px-10 py-8 bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(to top, var(--primary), transparent), url('${networkImage}')` }}
      >
        <Button asChild size="icon" variant={"secondary"} className="text-grenadier-500">
          <Link href="/">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-bold">{network.name}</p>
          <div>
            <div className="flex gap-2">
              <MapPin size={16} className="shrink-0 h-6" />
              {network.location.city}, {getCountryName(network.location.country)}
            </div>
            <div className="flex gap-2">
              <BriefcaseBusiness size={16} className="shrink-0 h-6" />
              {network.company.join(", ")}
            </div>
          </div>
        </div>
      </div>

      {/* --- Stations --- */}
      <div className="px-10">
        <p>All {network.stations.length} stations</p>
      </div>
      <hr className="mb-50" />
    </div>
  );
}
