"use client";

import { useState, useEffect } from "react";
import { getCoordinatesFromZip } from "@/utils/geocode";
import { getDistance } from "@/utils/distance";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
  distance: number;
};

export default function ResourceList({ initialResources }: { initialResources: Resource[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [zipCode, setZipCode] = useState("");
  const [maxDistance, setMaxDistance] = useState(15);  // Default max distance to 15 miles
  const [userCoordinates, setUserCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if (zipCode) {
      getCoordinatesFromZip(zipCode)
        .then((coords) => setUserCoordinates(coords))
        .catch((error) => {
          console.error("Error fetching coordinates:", error);
          setUserCoordinates(null);
        });
    }
  }, [zipCode]);

  // Filter resources based on search, categories, and distance
  const filteredResources = initialResources.filter((res) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(res.category);
    const matchesSearch = res.name.toLowerCase().includes(search.toLowerCase()) || res.description.toLowerCase().includes(search.toLowerCase());

    let withinDistance = true;
    if (userCoordinates) {
      const distance = getDistance(userCoordinates.latitude, userCoordinates.longitude, res.latitude, res.longitude);
      withinDistance = distance <= maxDistance;  // Check if the resource is within the max distance
    }

    return matchesCategory && matchesSearch && withinDistance;
  });

  // Handle category checkbox change
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((cat) => cat !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Disaster Resources</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search resources..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {/* Category Filter */}
      <div className="flex gap-4 mb-4">
        {["housing", "food", "supplies", "mental_health"].map((cat) => (
          <label key={cat} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => handleCategoryChange(cat)}
              className="form-checkbox"
            />
            <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
          </label>
        ))}
      </div>

      {/* Zip Code and Distance Filter */}
      <div className="mb-4">
        <label className="block text-sm font-semibold">Enter your Zip Code:</label>
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Zip Code"
          className="w-32 p-2 border rounded mt-2"
        />

        <div className="mt-4">
          <label className="block text-sm font-semibold">Set Max Distance (miles): {maxDistance} miles</label>
          <input
            type="range"
            min="1"
            max="100"
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-full mt-2"
          />
          <input
            type="number"
            min="1"
            max="100"
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-20 mt-2"
          />
        </div>
      </div>

      {/* Resource List as Table */}
      {filteredResources.length > 0 ? (
        <Table>
          <TableCaption>Available Disaster Resources</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResources.map((res) => (
              <TableRow key={res.id}>
                <TableCell className="font-medium">{res.name}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded text-xs bg-gray-100">
                    {res.category.charAt(0).toUpperCase() + res.category.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="max-w-md truncate">{res.description}</TableCell>
                <TableCell className="text-right">
                  <a href={res.web_url} target="_blank" className="text-blue-500 underline">More Info</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No resources found.</p>
      )}
    </div>
  );
}