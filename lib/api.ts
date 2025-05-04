import { notFound } from "next/navigation";
import type { Network, NetworkDetails } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_CITYBIKE_API_URL;

async function fetchApi<T>(path: string) {
  const url = `${API_URL}${path}`;
  const res = await fetch(url);

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error(`Status: ${res.status} for URL ${url}`);
  }
  return res.json() as Promise<T>;
}

interface NetworksResponse {
  networks: Network[];
}
export async function getNetworks(): Promise<Network[]> {
  const res = await fetchApi<NetworksResponse>(`${API_URL}/networks`);
  return res.networks;
}

interface NetworkDetailsResponse {
  network: NetworkDetails;
}
export async function getNetworkDetails(id: string): Promise<NetworkDetails> {
  const res = await fetchApi<NetworkDetailsResponse>(`${API_URL}/networks/${id}`);
  return res.network;
}
