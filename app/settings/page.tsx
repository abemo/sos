import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { getData } from "@/components/get-data"


export default async function DemoPage() {
  const resources = await getData()
  /// Current type mismatch between Payment and resources
  // TODO: Finish integration


  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
