import { createClient } from "@/utils/supabase/client";

export async function getResource(slug: string) {
  const supabase = createClient();  // Await the client creation

  const { data: resource, error } = await supabase
    .from ("all_resources")
    .select("*")
    .eq("id", slug);

  if (error) {
    console.error("Error fetching resource:", error);
    throw new Error("Failed to load resource");
  }

  return resource; // Return the fetched resource
}

export async function getData({
  table,
  query = "*",
}: { table?: string; query?: string } = {}) {
  if (!table) {
    throw new Error("Table name is required to fetch data.");
  } 

  const supabase = createClient();  // Await the client creation

  // Get current timestamp
  const now = new Date().toISOString();

  // Fetch only active resources
  const { data: resources, error } = await supabase
    .from(table)
    .select(query);
  /* .gte("active_end", now)  // active_end ≥ now 
     .lte("active_start", now); // active_start ≤ now  FOR NOW JUST GETTING EVERYTHING I THINK */

  console.log(resources);
  if (error) {
    console.error("Error fetching resources:", error);
    throw new Error("Failed to load resources");
  }

  return resources; 
}
