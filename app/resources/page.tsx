"use client"


import { columns } from "@/components/columns"
import { DataTable } from "@/components/data-table"
import { getData } from "@/components/get-data"
import { LocationPopup } from "@/components/location-popup"
import { useEffect, useState } from "react"


export default function Page() {
  // make a resource type
  const [resources, setResources] = useState<any[] | null>(null)


  useEffect(() => {
    console.log('running useEffect')
    void (async () => {
      if (!resources) {
        const data = await getData({ table: "resources_short" })
        setResources(data)
      }
    })()
  } , [])
  
  /// need to change styling to work with mobile instead of disappearing
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <LocationPopup />
      <DataTable data={resources ?? []} columns={columns} />
    </div>
  )
}
