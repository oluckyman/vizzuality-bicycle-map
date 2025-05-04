import Link from "next/link";
import { BriefcaseBusiness, MapPin, ArrowRight, type LucideProps, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, getCountryName } from "@/lib/utils";
import type { Network } from "@/types";

interface DetailsIconProps extends LucideProps {
  Icon: LucideIcon;
}

function DetailsIcon({ Icon, className, ...props }: DetailsIconProps) {
  return (
    <div className="bg-torea-bay-50 text-grenadier-400 w-6 h-6 shrink-0 flex items-center justify-center rounded-sm">
      <Icon className={cn("", className)} size={16} strokeWidth={1} absoluteStrokeWidth {...props} />
    </div>
  );
}

interface DetailsProps extends LucideProps {
  Icon: LucideIcon;
}

function Details({ Icon, className, ...props }: DetailsProps) {
  return (
    <div className="flex items-center mr-6">
      <DetailsIcon Icon={Icon} className="" />
      <div className="ml-2 text-sm grow leading-7 truncate text-nowrap text-muted-foreground">{props.children}</div>
    </div>
  );
}

interface NetworkListItemProps {
  network: Network;
}

export function NetworkListItem({ network }: NetworkListItemProps) {
  const companies = network.company.join(", ");
  const overflowThreshold = 50; // string length for companies to show +N company badge

  console.log("Render NetworkListItem");
  return (
    <li className="group border-b py-4 pr-4 pl-6 hover:bg-accent transition-colors duration-250">
      <Link href={`/network/${network.id}`} className="flex flex-col gap-1">
        <p className="text-xl font-bold text-secondary-foreground">{network.name}</p>
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2 min-w-0 grow">
            <Details Icon={MapPin}>
              {network.location.city}, {getCountryName(network.location.country)}
            </Details>
            <Details Icon={BriefcaseBusiness}>
              <div className="flex min-w-0 gap-2 justify-between items-center">
                <span className="truncate" title={companies}>
                  {companies}
                </span>
                {companies.length > overflowThreshold && network.company.length > 1 && (
                  <span className="text-grenadier-400 leading-3.5 text-sm border border-grenadier-400 rounded-xs px-1.5 py-1 h-[22px]">
                    +{network.company.length}
                  </span>
                )}
              </div>
            </Details>
          </div>
          <Button variant={"secondary"} className="text-grenadier-500 w-26 gap-1 justify-end px-2.5 group-hover:px-4">
            <span className="overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-250">Details</span>
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </Link>
    </li>
  );
}
