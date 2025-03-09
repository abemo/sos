import { createClient } from "@/utils/supabase/server";
import ResourceList from "./resource-list";

export default async function ResourcesPage() {
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
    return <p>Failed to load resources.</p>;
  }

  return <ResourceList initialResources={resources} />;
}

