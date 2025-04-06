"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"

import { categories, locations } from "@/app/data/data"
// for now we are gonna uses statuses in the location column
import { Resource } from "@/app/data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"


export const columns: ColumnDef<Resource>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("name")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const category = categories.find((category) => category.value === row.original.category)

      return (
        <div className="flex space-x-2">
          {category && <Badge variant="outline">{category.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("description")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = categories.find(
        (category) => category.value === row.getValue("category")
      )

      return <div>{category?.label}</div>
    },
    // Add OR filter function for category
    filterFn: (row, id, value) => {
      // If no filters selected, show all rows
      if (!value || value.length === 0) return true;
      
      // Get the row's category value
      const rowValue = row.getValue(id);
      
      // Return true if the row's category matches any selected filter values
      return value.includes(rowValue);
    },
  },
  {
    accessorKey: "Distance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Distance" />
    ),
    
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("Distance")}</div>,
  },
]