import { createClient } from "@/utils/supabase/client";
import { parse, v4, validate } from 'uuid';

export async function getResourceDetails(slug: string) {
  const supabase = createClient();  // Await the client creation

  // parse first word from slug
  // example slug
  // housing-mariners-village-apartment-homes
  const category = slug.split("-")[0]; // Get the first word from the slug
  // validate category\ (todo)
  const table = category + "_duplicate"

  const { data: resource, error } = await supabase
    .from(table)
    .select("*")
    .eq("slug", slug)
    .single(); // Use .single() to get a single object instead of an array
    
  if (error) {
    console.error("Error fetching resource details:", error);
    throw new Error("Failed to load resource details");
  }

  return resource; // Return the fetched resource details
}


export async function getResource(slug: string) {
  const supabase = createClient();  // Await the client creation


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

export async function getUserFavorites() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("User not found, redirecting to sign-in page.");
    //return redirect("/sign-in");
  } 
    const currentUserId = user?.id ?? null

  // fetch this user's saved resources
  const { data: profile, error: fetchError } = await supabase
      .from("profiles")
      .select("saved_resources")
      .eq("id", currentUserId)
      .single();
  if (fetchError) {
    console.error("Error fetching profile:", fetchError.message);
    return <div>Error fetching profile!</div>;
  }
  const savedResources = profile?.saved_resources;
  console.log('savedResources', savedResources)

  return savedResources; // Return the fetched saved resources
}

export async function getRecommended() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("User not found, redirecting to sign-in page.");
    //return redirect("/sign-in");
  } 
  const currentUserId = user?.id ?? null
  if (!currentUserId || !validate(currentUserId)) {
    console.error("Invalid UUID format for user ID:", currentUserId);
    return <div>Error: Invalid UUID format!</div>;
  }

  // fetch this user's saved resources
  const { data: recommendations, error: fetchError } = await supabase.rpc("resources_recomendation", {
    profile_id: currentUserId,
  });
  if (fetchError) {
    console.error("Error fetching:", fetchError.message);
    return <div>Error fetching recommendations!</div>;
  }

  return recommendations;
}

// returns true if the resource is a favorite and false if not (after the toggle)
export async function toggleFavorite(slug: string, isFavorite: boolean) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("User not found, redirecting to sign-in page.");
    //return redirect("/sign-in");
  } 
    const currentUserId = user?.id ?? null

  // fetch this user's saved resources
  const { data: profile, error: fetchError } = await supabase
      .from("profiles")
      .select("saved_resources")
      .eq("id", currentUserId)
      .single();
  if (fetchError) {
    console.error("Error fetching profile:", fetchError.message);
    return false;
  }
  const savedResources = profile?.saved_resources ?? [];

  if (savedResources.includes(slug)) {
    console.log("Resource already saved, removing from saved resources.");
    // remove from saved resources
    const { error: removeError } = await supabase
      .from("profiles")
      .update({ saved_resources: savedResources.filter((s: string) => s !== slug) })
      .eq("id", currentUserId);

    if (!removeError) {
      console.log("Resource removed from saved resources.");
      // Set isFavorite to false if the resource was successfully removed
      isFavorite = false;
    }

  } else {
    console.log("Resource not saved, adding to saved resources.");
    // add to saved resources
    const { error: addError } = await supabase
      .from("profiles")
      .update({ saved_resources: [...savedResources, slug] })
      .eq("id", currentUserId);

    if (!addError) {
      console.log("Resource added to saved resources.");
      // Set isFavorite to true if the resource was successfully added
      isFavorite = true;
    }
  }

  // return 


  return isFavorite; // Return the fetched saved resources
}

export async function getUserProfileInfo() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("User not found, redirecting to sign-in page.");
    //return redirect("/sign-in");
  } 
  const currentUserId = user?.id ?? null
  if (!currentUserId) {
    console.error("User ID not found, redirecting to sign-in page.");
    return <div>Error: User ID not found!</div>;
  }
  // fetch this user's saved resources
  const { data: profile, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", currentUserId)
      .single();
  if (fetchError) {
    console.error("Error fetching profile:", fetchError.message);
    return <div>Error fetching profile!</div>;
  }
  const selected_categories = profile?.selected_categories;
  const user_latitude = profile?.user_latitude;
  const user_longitude = profile?.user_longitude;

  return {
    selected_categories,
    user_latitude,
    user_longitude,}
}