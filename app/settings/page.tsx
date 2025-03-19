import { DataTableDemo } from "@/components/data-table-demo";
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { getData } from "@/components/get-data"

type Resource = {
  id: string;
  name: string;
  category: "housing" | "food" | "supplies" | "mental_health";
  latitude: number;
  longitude: number;
  active_start: string;
  active_end: string;
  description: string;
  web_url: string;
};


export default async function DemoPage() {
  const resources = await getData()
  /// Current type mismatch between Payment and resources
  // TODO: Finish integration


  return (
    <div className="container mx-auto py-10">
      {/* <DataTable columns={columns} data={data} /> */}
      <DataTableDemo />
    </div>
  )
}
