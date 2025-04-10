"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

import { Badge } from "@/components/ui/badge"

import { categories, locations } from "@/app/data/data"
import { Resource } from "@/app/data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"

// Helper function to calculate distance between two coordinates using the Haversine formula
function calculateDistance(
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

// Component to display distance based on user location and resource location
const DistanceCell = ({ row }: { row: any }) => {
  const userCoordinates = useMemo(() => {
    // Try to get coordinates from localStorage or other state management
    // This assumes you're storing the user coordinates somewhere accessible
    try {
      const storedCoords = localStorage.getItem('userCoordinates');
      if (storedCoords) {
        return JSON.parse(storedCoords);
      }
    } catch (e) {
      console.error("Failed to get user coordinates:", e);
    }
    return null;
  }, []);
  
  const resourceLat = row.original.latitude || row.getValue("latitude");
  const resourceLng = row.original.longitude || row.getValue("longitude");
  
  if (!userCoordinates || !resourceLat || !resourceLng) {
    return <div className="w-[80px]">--</div>;
  }
  
  const distance = calculateDistance(
    userCoordinates.latitude, 
    userCoordinates.longitude, 
    resourceLat, 
    resourceLng
  );
  
  return <div className="w-[80px]">{distance} km</div>;
};

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
    filterFn: (row, id, value) => {
      if (!value || value.length === 0) return true;
      const rowValue = row.getValue(id);
      return value.includes(rowValue);
    },
  },
  {
    accessorKey: "distance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Distance" />
    ),
    cell: DistanceCell,
    // Custom sorting function to sort by calculated distance
    sortingFn: (rowA, rowB) => {
      const userCoordinates = (() => {
        try {
          const storedCoords = localStorage.getItem('userCoordinates');
          if (storedCoords) {
            return JSON.parse(storedCoords);
          }
        } catch (e) {
          console.error("Failed to get user coordinates:", e);
        }
        return null;
      })();
      
      if (!userCoordinates) return 0;
      
      const latA = rowA.original.latitude;
      const lngA = rowA.original.longitude;
      const latB = rowB.original.latitude;
      const lngB = rowB.original.longitude;
      
      if (!latA || !lngA || !latB || !lngB) return 0;
      
      const distanceA = calculateDistance(
        userCoordinates.latitude, 
        userCoordinates.longitude, 
        latA, 
        lngA
      );
      
      const distanceB = calculateDistance(
        userCoordinates.latitude, 
        userCoordinates.longitude, 
        latB, 
        lngB
      );
      
      return distanceA - distanceB;
    }
  },
  // Keep the original latitude/longitude columns if needed
  // Or you can hide them by default
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
]