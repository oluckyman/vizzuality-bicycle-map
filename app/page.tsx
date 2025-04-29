import Image from "next/image";

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
    <main className="w-screen h-screen overflow-hidden flex">
      <div className="w-[30cqw] min-w-xs max-w-lg h-full bg-blue-200 flex flex-col">
        <h1 className="p-4 font-bold">Discover bike networks</h1>
        <ul className="flex-1 overflow-y-auto mb-4">
          {networks.map((network) => (
            <li key={network.id}>
              {network.name} ({network.location.city})
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 h-full bg-gray-200">Map</div>
    </main>
  );
}
