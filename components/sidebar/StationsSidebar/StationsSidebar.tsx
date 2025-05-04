import Link from "next/link";
import { MapPin, BriefcaseBusiness, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCountryName } from "@/lib/utils";
import type { NetworkDetails } from "@/types";

export default function StationsSidebar({ network }: { network: NetworkDetails }) {
  const networkImage = "/hero-background.png"; // e.g. `network.imageUrl`
  return (
    <ScrollArea className="h-full flex flex-col bg-primary text-primary-foreground">
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
          <h1 className="text-3xl font-bold">{network.name}</h1>
          <div>
            <div className="flex gap-2">
              <MapPin size={16} className="shrink-0 h-6" />
              <span className="text-accent">
                {network.location.city}, {getCountryName(network.location.country)}
              </span>
            </div>
            <div className="flex gap-2">
              <BriefcaseBusiness size={16} className="shrink-0 h-6" />
              <span className="text-accent">{network.company.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Stations --- */}
      <div className="px-10 pb-20">
        <div className="mb-3">All {network.stations.length} stations</div>
        <Table className="table-fixed">
          <TableHeader className="h-5">
            <TableRow className="hover:bg-transparent">
              <TableHead>Station name</TableHead>
              <TableHead className="w-25">Free bikes</TableHead>
              <TableHead className="w-29">Empty slots</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-base">
            {network.stations.map((station) => (
              <TableRow key={station.id} className="border-dashed group">
                <TableCell className="truncate group-hover:pl-4 transition-all duration-250">{station.name}</TableCell>
                <TableCell className="font-bold text-center">{station.free_bikes}</TableCell>
                <TableCell className="font-bold text-center">{station.empty_slots}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
}
