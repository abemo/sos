import { createClient } from "@/utils/supabase/server";

export async function getData() {
  const supabase = await createClient();  // Await the client creation

  // Get current timestamp
  const now = new Date().toISOString();

  // Fetch only active resources
  const { data: resources, error } = await supabase
    .from("fire_resources")
    .select("*")
    .gte("active_end", now)  // active_end ≥ now
    .lte("active_start", now); // active_start ≤ now

  if (error) {
    console.error("Error fetching resources:", error);
    throw new Error("Failed to load resources");
  }

  return resources;
}