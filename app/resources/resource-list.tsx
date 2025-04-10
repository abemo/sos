"use client";

import { useState, useEffect } from "react";
import { getDistance } from "@/utils/distance";

type Resource = {
  id: string;
  name: string;
  category: "housing" | "food" | "supplies" | "mental_health" | "donate" | "volunteer";
  latitude: number;
  longitude: number;
  active_start: string;
  active_end: string;
  description: string;
  web_url: string;
};

export default function ResourceList({ initialResources }: { readonly initialResources: readonly Resource[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState(15); // Default max distance to 15 miles
  const [userCoordinates, setUserCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if (!userCoordinates) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserCoordinates({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error fetching geolocation:", error);
            setUserCoordinates(null);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }
  }, [userCoordinates]);

  // Filter resources based on search, categories, and distance
  const filteredResources = initialResources.filter((res) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(res.category);
    const matchesSearch = res.name.toLowerCase().includes(search.toLowerCase()) || res.description.toLowerCase().includes(search.toLowerCase());

    let withinDistance = true;
    if (userCoordinates) {
      const distance = getDistance(userCoordinates.latitude, userCoordinates.longitude, res.latitude, res.longitude);
      withinDistance = distance <= maxDistance; // Check if the resource is within the max distance
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
        {["housing", "food", "supplies", "mental_health", "donate", "volunteer"].map((cat) => (
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

      {/* Distance Filter */}
      <div className="mb-4">
        <div className="mt-4">
          <label className="block text-sm font-semibold">Set Max Distance (miles): {maxDistance} miles</label>
          {userCoordinates && (
            <label className="block text-sm font-semibold">Current lat: {userCoordinates.latitude} current long: {userCoordinates.longitude}</label>
          )}
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

      {/* Resource List */}
      <ul className="space-y-4">
        {filteredResources.length > 0 ? (
          filteredResources.map((res) => (
            <li key={res.id} className="p-4 border rounded">
              <h2 className="text-lg font-semibold">{res.name}</h2>
              <p className="text-sm">{res.description}</p>
              <a href={res.web_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">More Info</a>
            </li>
          ))
        ) : (
          <p>No resources found.</p>
        )}
      </ul>
    </div>
  );
}
