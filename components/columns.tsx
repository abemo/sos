"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "./data-table-column-header"
import { categories } from "@/app/data/data"
import { Resource } from "@/app/data/schema"
import { Star } from "lucide-react"
import toggleFavoriteButton from "@/components/toggle-favorite-button"
import ToggleFavoriteButton from "@/components/toggle-favorite-button"
import Link from "next/link"

// Haversine formula: distance in miles
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3963.1906
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c * 10) / 10
}

// Hook: read user coords only once
function useUserCoordinates(): { latitude: number; longitude: number } | null {
  return useMemo(() => {
    try {
      const json = localStorage.getItem("userCoordinates")
      return json ? JSON.parse(json) : null
    } catch {
      return null
    }
  }, [])
}

/**
 * Returns column definitions for Resource table,
 * calculating distances internally on each row
 */
export function useResourceColumns(): ColumnDef<Resource>[] {
  const userCoordinates = useUserCoordinates()

  return useMemo<ColumnDef<Resource>[]>(
    () => [
      {
        accessorKey: "favorite",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="" />
        ),
        cell: ({ row }) => (
          <div className="w-[12px]">{<ToggleFavoriteButton slug={row.original.slug} mode={"icon"}/>}</div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
          <Link href={`/resources/${row.original.slug}`}>
            <div className="w-[120px]">{row.getValue("name")}</div>
          </Link>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "description",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => {
          const cat = categories.find(
            (c) => c.value === row.original.category
          )
          return (
            <Link href={`/resources/${row.original.slug}`}>
              <div className="flex space-x-2">
                {cat && <Badge variant="outline">{cat.label}</Badge>}
                <span className="max-w-[500px] truncate font-medium">
                  {row.getValue("description")}
                </span>
              </div>
            </Link>
          )
        },
      },
      {
        accessorKey: "category",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ row }) => {
          const cat = categories.find(
            (c) => c.value === row.getValue("category")
          )
          return <div>{cat?.label}</div>
        },
        filterFn: (row, id, value) => {
          if (!value || value.length === 0) return true
          return value.includes(row.getValue(id))
        },
      },
      {
        // Calculate distance once via accessorFn
        id: "distance",
        accessorFn: (row) => {
          if (
            !userCoordinates ||
            row.latitude == null ||
            row.longitude == null
          ) {
            return undefined
          }
          return calculateDistance(
            userCoordinates.latitude,
            userCoordinates.longitude,
            row.latitude,
            row.longitude
          )
        },
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Distance" />
        ),
        cell: ({ getValue }) => {
          const d = getValue() as number | undefined
          return <div className="w-[80px]">{d != null ? `${d} mi` : "--"}</div>
        },
        enableSorting: true,
        sortingFn: "basic",
        sortUndefined: "last",
      },
      {
        accessorKey: "latitude",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Latitude" />
        ),
        cell: ({ row }) => <div>{row.getValue("latitude")}</div>,
        enableHiding: true,
      },
      {
        accessorKey: "longitude",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Longitude" />
        ),
        cell: ({ row }) => <div>{row.getValue("longitude")}</div>,
        enableHiding: true,
      },
    ],
    [userCoordinates]
  )
}
