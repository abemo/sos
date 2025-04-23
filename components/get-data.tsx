import { createClient } from "@/utils/supabase/client";

export async function getResource(slug: string) {
  const supabase = createClient();  // Await the client creation

  // parse first word from slug
  // example slug
  // housing-mariners-village-apartment-homes




  const { data: resource, error } = await supabase
    .from ("all_resources")
    .select("*")
    .eq("slug", slug);

  if (error) {
    console.error("Error fetching resource:", error);
    throw new Error("Failed to load resource");
  }

  return resource; // Return the fetched resource
}

export async function getFavoriteResources(favorite_list: string[]) {
  const supabase = createClient();  // Await the client creation
  console.log("favorite_list", favorite_list)

  const { data: resources, error } = await supabase
    .from("all_resources")
    .select("*")
    .in("slug", favorite_list); // Use the 'in' operator to filter by the list of IDs

  if (error) {
    console.error("Error fetching favorite resources:", error);
    throw new Error("Failed to load favorite resources");
  }

  console.log("resources", resources)
  return resources; // Return the fetched favorite resources
  
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

export async function getUser(favorite_list: string[]) {
  const supabase = createClient();  // Await the client creation
  console.log("favorite_list", favorite_list)

  const { data: resources, error } = await supabase
    .from("all_resources")
    .select("*")
    .in("id", favorite_list); // Use the 'in' operator to filter by the list of IDs

  if (error) {
    console.error("Error fetching favorite resources:", error);
    throw new Error("Failed to load favorite resources");
  }

  console.log("resources", resources)
  return resources; // Return the fetched favorite resources
  
}
