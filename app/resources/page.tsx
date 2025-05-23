"use client"

import { useResourceColumns } from "@/components/columns"
import { DataTable } from "@/components/data-table"
import { getData } from "@/components/get-data"
import { LocationPopup } from "@/components/location-popup"
import { useEffect, useState } from "react"
import { useSidebar } from "@/components/ui/sidebar"


export default function Page() {
  const { toggleSidebar, open } = useSidebar()

  useEffect(() => {
    if (!open) {
      toggleSidebar()
    }
  }, [])

  // make a resource type
  let [resources, setResources] = useState<any[] | null>(null)

  useEffect(() => {
    void (async () => {
      if (!resources) {
        const data = await getData({ table: "all_resources" })
        setResources(data)
      }
    })()
  } , [])
  
  /// need to change styling to work with mobile instead of disappearing
  const columns = useResourceColumns()
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <LocationPopup />
      <DataTable data={resources ?? []} columns={columns} />
    </div>
  )
}
