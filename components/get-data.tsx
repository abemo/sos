import { createClient } from "@/utils/supabase/client";

export async function getData() {
  const supabase = createClient();  // Await the client creation

  // Get current timestamp
  const now = new Date().toISOString();

  // Fetch only active resources
  const { data: resources, error } = await supabase
    .from("resources_short")
    .select("*")
/*     .gte("active_end", now)  // active_end ≥ now 
    .lte("active_start", now); // active_start ≤ now  FOR NOW JUST GETTING EVERYTHING I THINK */

  console.log(resources);
  if (error) {
    console.error("Error fetching resources:", error);
    throw new Error("Failed to load resources");
  }

  return resources;
}