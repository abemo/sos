import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "@/components/columns"
import { DataTable } from "@/components/data-table"
import { resourceSchema } from "@/app/data/schema"
import { getData } from "@/components/get-data"

export const metadata: Metadata = {
  title: "Resource Finder",
  description: "A resource table built using Tanstack Table.",
}

export default async function Page() {
  const resources = await getData()

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <DataTable data={resources} columns={columns} />
      </div>
    </>
  )
}
