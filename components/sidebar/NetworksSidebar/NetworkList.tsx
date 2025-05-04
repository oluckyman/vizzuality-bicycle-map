import { memo } from "react";
import type { Network } from "@/types";
import { NetworkListItem } from "./NetworkListItem";

interface NetworkListProps {
  networks: Network[];
}

const NetworkList = memo(function NetworkList({ networks }: NetworkListProps) {
  console.log("Render NetworkList", networks.length);
  return (
    <ul className="overflow-y-auto mb-4 [scrollbar-gutter:stable]">
      {networks.map((network) => (
        <NetworkListItem key={network.id} network={network} />
      ))}
    </ul>
  );
});

export { NetworkList };
