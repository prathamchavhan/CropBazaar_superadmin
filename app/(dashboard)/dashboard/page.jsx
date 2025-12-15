"use client";
export const dynamic = "force-dynamic";


import RoleTabs from "./_components/RoleTabs";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden space-y-6">
      <RoleTabs />
    </div>
  );
}
