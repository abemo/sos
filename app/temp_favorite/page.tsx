"use client"

import { columns } from "@/components/columns"
import { DataTable } from "@/components/data-table"
import { getData, getFavoriteResources } from "@/components/get-data"
import { LocationPopup } from "@/components/location-popup"
import { useEffect, useState } from "react"
import { useSidebar } from "@/components/ui/sidebar"

// 
const tempFavorites = ["food-inn-of-the-7th-ray", "food-tatsu-ramen", "housing-pasadena-civic-auditorium"]


export default function Page() {
  const { toggleSidebar, open } = useSidebar()

  useEffect(() => {
    if (!open) {
      toggleSidebar()
    }
  }, [])


  // make a resource type
  const [favoriteResources, setfavoriteResources] = useState<any[] | null>(null)

  // get favorite list from users table. 

  useEffect(() => {
    /// get my favorite list....
    void (async () => {
      if (!favoriteResources) {
        const data = await getFavoriteResources(tempFavorites)
        setfavoriteResources(data)
      }
    })()
  } , [])
  
  /// need to change styling to work with mobile instead of disappearing
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <LocationPopup />
      <DataTable data={favoriteResources ?? []} columns={columns} />
    </div>
  )
}
