import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns"
import Link from "next/link";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  const currentUserId = user?.id ?? null
  console.log('currentUserId', currentUserId)

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
  // fetch the saved resources from the all_resources table using the allId column from savedResources
  let allResourceIds = undefined;
  if (savedResources) {
  let allResourceIds = savedResources.map((resource: any) => JSON.parse(resource).allId);
  console.log('allResourceIds', allResourceIds);
  const { data: allResources, error: fetchAllResourcesError } = await supabase
      .from("all_resources")
      .select("*")
      .in("id", allResourceIds);
  if (fetchAllResourcesError) {
    console.error("Error fetching all resources:", fetchAllResourcesError.message);
  }
  console.log('allResources', allResources)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome back, {user.user_metadata.full_name}!</h1>
      <p className="text-gray-600 mb-4">Here are your saved resources:</p>
      {!savedResources && <p className="text-gray-600 mb-4">No saved resources found.</p>}
      {savedResources && <DataTable data={savedResources ?? []} columns={columns}/>}
      <p className="text-gray-600 mb-4">Here are your recommended resources:</p>
      <ul className="list-disc mb-4">
        <li className="mb-2">Recommended Resource 1</li>
        <li className="mb-2">Recommended Resource 2</li>
        <li className="mb-2">Recommended Resource 3</li>
      </ul>
      <p className="text-gray-600 mb-4">
        No recommendations available, update your profile to get recommendations
      </p>
    </div>
  );
}
