export function MainLayout({ sidebar, map }: { sidebar: React.ReactNode; map: React.ReactNode }) {
  return (
    <main className="w-screen h-screen overflow-hidden flex">
      <div className="w-[30cqw] min-w-xs max-w-lg h-full bg-blue-200 flex flex-col">{sidebar}</div>
      <div className="flex-1 h-full bg-gray-200">{map}</div>
    </main>
  );
}
