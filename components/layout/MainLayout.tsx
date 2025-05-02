export function MainLayout({ sidebar, map }: { sidebar: React.ReactNode; map: React.ReactNode }) {
  return (
    <main className="w-screen h-screen overflow-hidden flex">
      <div className="w-[551px] h-full flex flex-col">{sidebar}</div>
      <div className="flex-1 h-full">{map}</div>
    </main>
  );
}
