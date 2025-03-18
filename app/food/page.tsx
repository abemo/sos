import { createClient } from "@/utils/supabase/server";
import ResourceList from "@/components/resource-list";
import { getData } from "@/components/get-data";

export default async function Page() {
  const resources = await getData();

  return <ResourceList initialResources={resources} />;
}

