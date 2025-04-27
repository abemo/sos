"use client";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { getData, getFavoriteResources, getUser, getUserFavorites } from "@/components/get-data";



export default function ProtectedPage() {
  const [resources, setResources] = useState<any[] | null>(null)
  const [userFavorites, setUserFavorites] = useState<any[] | null>(null)

  
  // make a resource type
  useEffect(() => {
    void (async () => {
      if (!userFavorites) {
        const favorites = await getUserFavorites()
        console.log('favorites', favorites)
        setUserFavorites(favorites)
      }

    })()
  } , [])

  useEffect(() => {
    void (async () => {
      if (!userFavorites) {
        return
      }
      if (!resources) {
        const data = await getFavoriteResources(userFavorites)
        setResources(data)
      }
    })()
  } , [userFavorites])

/* 
  // fetch the saved resources from the all_resources table using the allId column from savedResources
  const allResourceIds = savedResources.map((resource: any) => JSON.parse(resource).allId);
  console.log('allResourceIds', allResourceIds);
  const { data: allResources, error: fetchAllResourcesError } = await supabase
      .from("all_resources")
      .select("*")
      .in("id", allResourceIds);
  if (fetchAllResourcesError) {
    console.error("Error fetching all resources:", fetchAllResourcesError.message);
  }
  
  console.log('allResources', allResources) */
  

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable data={resources ?? []} columns={columns} />

    </div>
  );
}
