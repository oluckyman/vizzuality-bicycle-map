import { memo } from "react";
import type { Network } from "@/types";
import { NetworkListItem } from "./NetworkListItem";

interface NetworkListProps {
  networks: Network[];
}

const NetworkList = memo(function NetworkList({ networks }: NetworkListProps) {
  return (
    <ul className="mb-4">
      {networks.map((network) => (
        <NetworkListItem key={network.id} network={network} />
      ))}
    </ul>
  );
});

export { NetworkList };
