"use client";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { getData, getFavoriteResources, getUser } from "@/components/get-data";


export default function ProtectedPage() {
  const [resources, setResources] = useState<any[] | null>(null)
  const { toggleSidebar, open } = useSidebar()

  const tempFavorites = ["food-inn-of-the-7th-ray", "food-tatsu-ramen", "housing-pasadena-civic-auditorium"]  

  // make a resource type

  useEffect(() => {
    void (async () => {
      if (!resources) {
        const data = await getFavoriteResources(tempFavorites)
        setResources(data)
      }
    })()
  } , [])
  

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable data={resources ?? []} columns={columns} />
    </div>
  );
}
